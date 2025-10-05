import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '@/lib/httpClient';

const useUpdateCompany = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);
  
  const updateCompany = async (companyId: string, data: any) => {
    setLoading(true);
    setError(null); 
    setResponseData(null);
    try {
      const response = await api.put(`/v2/company/${companyId}`, data);
      if (response.data) {
        setResponseData(response.data);
        toast.success('Company updated successfully!');
      } else {
        toast.error('Something went wrong');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { updateCompany, loading, responseData, error };
};

export default useUpdateCompany;