import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSupabase } from './useSupabase';

const useUpdateAsset = () => {
  const { updateAsset: updateAssetSupabase } = useSupabase();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);
  
  const updateAsset = async (assetId: string, data: any) => {
    setLoading(true);
    setError(null); 
    setResponseData(null);
    try {
      const result = await updateAssetSupabase(assetId, data);
      if (result) {
        setResponseData(result.data);
        toast.success('Asset updated successfully!');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err: any) {
      const message = err.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { updateAsset, loading, responseData, error };
};

export default useUpdateAsset;