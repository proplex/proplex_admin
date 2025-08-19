

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useCreateCompany = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null);
  const createCompany = async (data: any) => {
    setLoading(true);
    setError(null); 
    setResponseData(null);
    try {
      const res = await api.post('/v2/company', data);
      if (res) {
        setResponseData(res.data);
        toast.success('Company created successfully!');
        navigate(`/edit-company/${res.data.data.id}`);
      } else {
        toast.error('Something went wrong');
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { createCompany, loading, responseData, error };
};

export default useCreateCompany;
