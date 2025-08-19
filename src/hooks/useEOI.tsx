

import { useState, useCallback, useEffect } from 'react';
import api from '@/lib/httpClient';
import toast from 'react-hot-toast';

const useEOI = () => {
  const [eois, setEOIS] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const fetchEois = useCallback(async () => {
    setStatus('fetching');
    setError(null);
    try {
      const { data } = await api.get('/v2/admin/eoi');
      setEOIS(data.data);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setStatus(null);
    }
  }, []);

  const createEoi = async (payload: any) => {
    setStatus('creating');
    setError(null);
    try {
      const response = await api.post('/v2/admin/eoi', payload);
      toast.success(response.data.message);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setStatus(null);
    }
  };

  useEffect(() => {
    fetchEois();
  }, [fetchEois]);

  return { eois, status, error, fetchEois, createEoi };
};

export default useEOI;
