import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from './useSupabase';
import { ProplexSDK } from '@/lib/proplex';
import { useMetaMask } from '@/providers/MetaMaskProvider';

const useCreateCompany = () => {
  const navigate = useNavigate();
  const { createCompany: createCompanySupabase } = useSupabase();
  const { provider, isConnected } = useMetaMask();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);
  
  const createCompany = async (data: any) => {
    setLoading(true);
    setError(null); 
    setResponseData(null);
    
    try {
      // First, create the company in Supabase
      const result = await createCompanySupabase(data);
      
      if (!result) {
        throw new Error('Failed to create company in database');
      }
      
      setResponseData(result.data);
      toast.success('Company created successfully in database!');
      
      // Then, register the company on the blockchain if MetaMask is connected
      if (isConnected && provider) {
        try {
          const proplexSDK = new ProplexSDK(provider);
          
          // Get the current user's address
          const signerAddress = await proplexSDK.getSignerAddress();
          
          // Register company on blockchain
          // For now, we'll use a default company type (LLC = 0)
          // In a real implementation, you would map the company type from the form data
          const companyType = 0; // LLC
          const companyName = data.name || 'Untitled Company';
          const jurisdiction = data.state || 'Unknown';
          
          const tx = await proplexSDK.registerCompany(
            signerAddress,
            companyName,
            jurisdiction,
            companyType
          );
          
          // Wait for transaction to be mined
          await tx.wait();
          
          toast.success('Company registered on blockchain successfully!');
        } catch (blockchainError: any) {
          console.error('Blockchain registration error:', blockchainError);
          // We don't throw here because we still want to navigate to the company page
          toast.error(`Blockchain registration failed: ${blockchainError.message || 'Unknown error'}`);
        }
      } else {
        toast.success('Company created in database. Connect MetaMask to register on blockchain.');
      }
      
      // Navigate to the edit company page if an ID is available
      if (result.data && result.data.id) {
        navigate(`/edit-company/${result.data.id}`);
      }
    } catch (err: any) {
      const message = err.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createCompany, loading, responseData, error };
};

export default useCreateCompany;