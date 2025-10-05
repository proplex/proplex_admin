import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/httpClient'; // Import the httpClient instead of useSupabase
import { ProplexSDK } from '@/lib/proplex';
import { useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount } from "wagmi";
import { useEthersSigner } from './useEthersSigner';

const useCreateCompany = () => {
  const navigate = useNavigate();
  const { userInfo } = useWeb3AuthUser();
  const { isConnected } = useAccount();
  const ethersSigner = useEthersSigner();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);
  
  const createCompany = async (data: any) => {
    setLoading(true);
    setError(null); 
    setResponseData(null);
    
    try {
      // First, create the company via the API
      const result = await api.post('/companies', data);
      console.log('Company created in database:', result.data);
      
      if (!result.data) {
        throw new Error('Failed to create company in database');
      }
      
      setResponseData(result.data);
      toast.success('Company created successfully in database!');
      
      // Then, register the company on the blockchain if wallet is connected
      if (isConnected && ethersSigner) {
        try {
          // Create Proplex SDK instance with the ethers signer
          const proplexSDK = new ProplexSDK(ethersSigner);
          
          // Map incorporation type to company type for blockchain deployment
          const getCompanyType = (incorporationType: string) => {
            switch (incorporationType) {
              case 'llc': return 0; // LLC
              case 'private-limited': return 1; // Private Limited
              case 'dao-llc': return 2; // DAO LLC
              case 'corporation': return 3; // Corporation
              case 'public-entity': return 4; // Public Entity
              case 'partnership': return 5; // Partnership
              default: return 0; // Default to LLC
            }
          };
          
          // Get company data
          const companyName = data.name || 'Untitled Company';
          const jurisdiction = data.jurisdiction || 'Unknown';
          const companyType = getCompanyType(data.incorporation_type);
          console.log("blockchain deploycompany params is here:", companyName, jurisdiction, companyType);
          
          // Validate parameters before sending to blockchain
          const validation = ProplexSDK.validateCompanyParams(companyName, jurisdiction);
          if (!validation.valid) {
            throw new Error(validation.error);
          }
          
          if (companyType < 0 || companyType > 5) {
            throw new Error('Invalid company type');
          }
          
          // Check signer balance before deployment
          try {
            const balance = await proplexSDK.getSignerBalance();
            console.log('Signer balance:', balance, 'U2U');
            
            if (parseFloat(balance) < 0.01) {
              toast('Low balance detected. Transaction may fail due to insufficient funds.');
            }
          } catch (balanceError) {
            console.warn('Could not check signer balance:', balanceError);
          }
          
          // Deploy company on blockchain with improved error handling
          console.log('Attempting to deploy company to blockchain...');
          console.log("company deploy params is here:",companyType,companyName,jurisdiction);
          const deployResult = await proplexSDK.deployCompany(
            companyType,
            companyName,
            jurisdiction,
            {
              gasLimit: 5000000 // Set a reasonable default gas limit
            }
          );
          
          console.log('Company deployed on blockchain:', deployResult);
          toast.success('Company deployed on blockchain successfully!');
        } catch (blockchainError: any) {
          console.error('Blockchain deployment error:', blockchainError);
          
          // Provide more detailed error information
          let errorMessage = 'Blockchain deployment failed: ';
          if (blockchainError.code === 'UNPREDICTABLE_GAS_LIMIT') {
            errorMessage += 'Transaction may fail or require manual gas limit. ';
            errorMessage += 'Check contract parameters and ensure you have sufficient funds.';
          } else if (blockchainError.reason) {
            errorMessage += blockchainError.reason;
          } else if (blockchainError.message) {
            errorMessage += blockchainError.message;
          } else {
            errorMessage += 'Unknown error occurred';
          }
          
          // We don't throw here because we still want to navigate to the company page
          toast.error(errorMessage);
        }
      } else {
        toast.success('Company created in database. Connect wallet to register on blockchain.');
      }

      // Navigate to the edit company page if an ID is available
      if (result.data && result.data.id) {
        navigate(`/edit-company/${result.data.id}`);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createCompany, loading, responseData, error };
};

export default useCreateCompany;