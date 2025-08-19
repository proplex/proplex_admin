

import api from '@/lib/httpClient';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Custom Hook
export const useGetCustomer = (id: Number) => {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/v2/admin/user/${id}`);
        setData(response.data.data);
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'An error occurred');
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  return { data, loading, error };
};
