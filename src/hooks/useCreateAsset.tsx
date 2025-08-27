import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from './useSupabase';
import { ProplexSDK } from '@/lib/proplex';
import { useMetaMask } from '@/providers/MetaMaskProvider';

const useCreateAsset = () => {
  const navigate = useNavigate();
  const { createAsset: createAssetSupabase } = useSupabase();
  const { provider, isConnected } = useMetaMask();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);
  
  const createAsset = async (data: any) => {
    setLoading(true);
    setError(null); 
    setResponseData(null);
    try {
      // First, create the asset in Supabase
      const result = await createAssetSupabase(data);
      if (!result) {
        throw new Error('Failed to create asset in database');
      }
      
      setResponseData(result.data);
      toast.success('Asset created successfully in database!');
      
      // Then, register the asset on the blockchain if MetaMask is connected
      if (isConnected && provider) {
        try {
          const proplexSDK = new ProplexSDK(provider);
          
          // Get the company ID from the asset data
          const companyId = data.company_id;
          if (!companyId) {
            throw new Error('Company ID is required to register asset on blockchain');
          }
          
          // Register asset on blockchain
          const assetName = data.name || 'Untitled Asset';
          const assetSymbol = data.symbol || 'ASSET';
          const metadataCID = data.metadataCID || 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn'; // Default CID
          const legalCID = data.legalCID || 'QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn'; // Default CID
          
          // Map asset category to asset type
          let assetType = 0; // Default to Commercial
          if (data.category === 'Residential') {
            assetType = 1;
          } else if (data.category === 'Holiday') {
            assetType = 2;
          } else if (data.category === 'Land') {
            assetType = 3;
          }
          
          const tx = await proplexSDK.registerProject(
            parseInt(companyId),
            assetName,
            assetSymbol,
            metadataCID,
            legalCID,
            assetType
          );
          
          // Wait for transaction to be mined
          await tx.wait();
          
          toast.success('Asset registered on blockchain successfully!');
        } catch (blockchainError: any) {
          console.error('Blockchain registration error:', blockchainError);
          // We don't throw here because we still want to navigate to the asset page
          toast.error(`Blockchain registration failed: ${blockchainError.message || 'Unknown error'}`);
        }
      } else {
        toast.success('Asset created in database. Connect MetaMask to register on blockchain.');
      }
      
      // Navigate to the edit asset page if an ID is available
      if (result.data && result.data.id) {
        navigate(`/edit-asset/${result.data.id}`);
      }
    } catch (err: any) {
      const message = err.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createAsset, loading, responseData, error };
};

export default useCreateAsset;