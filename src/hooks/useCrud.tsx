

import api from '@/lib/httpClient';
import { useState } from 'react';

const useCrud = (endpoint: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);

  const save = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (data.id) {
        res = await api.put(`/${endpoint}/${data.id}`, data);
      } else {
        res = await api.post(`/${endpoint}`, data);
      }
      setResponse(res.data);
      return res.data;
    } catch (err: any) {
      setError(err.response.data.message || 'An error occurred');
      return err.response.data.message || 'An error occurred';
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.delete(`/${endpoint}/${id}`);
      setResponse(res.data);
      return res.data;
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || 'An error occurred';
      setError(errorMessage);
      throw new Error(errorMessage); // Throw the error to propagate it
    } finally {
      setLoading(false);
    }
  };

  return {
    save, // Function to call the API (create or update)
    remove, // Function to call the API (delete)
    response, // API response data
    loading, // Loading state
    error, // Error state
  };
};

export default useCrud;
