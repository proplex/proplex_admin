

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useUpdateCompany = () => {
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const updateCompany = async (id: string | number, data: any) => {
    setLoading(true);
    setError(null);
    setResponseData(null);
    try {
      const res = await api.put(`/v2/company/${id}`, data);
      setResponseData(res.data);
      toast.success('Company updated successfully!');
      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.error?.[0]?.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { updateCompany, loading, responseData, error };
};

export default useUpdateCompany;
