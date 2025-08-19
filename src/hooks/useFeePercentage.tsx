

import { useState, useCallback, useEffect } from 'react';
import api from '@/lib/httpClient';
import toast from 'react-hot-toast';

export interface FeeData {
  uuid: string;
  id: number;
  name: string;
  value: number;
  type: number;
  status: boolean;
}

const useFeePercentage = () => {
  const [fee, setFee] = useState<FeeData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const fetchFees = useCallback(async () => {
    setStatus('fetching');
    setError(null);
    try {
      const { data } = await api.get<{ data: FeeData[] }>('/v2/fee-percentage');
      setFee(data.data);
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.response?.data?.error?.[0]?.message ||
        'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setStatus(null);
    }
  }, []);

  const createFee = async (
    newFee: Pick<FeeData, 'name' | 'value' | 'type'>
  ) => {
    setStatus('creating');
    setError(null);
    try {
      const { data } = await api.post<{ data: FeeData }>(
        '/v2/fee-percentage',
        newFee
      );
      setFee((prev) => [...prev, data.data]);
      toast.success('Fee created successfully');
      return data;
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.response?.data?.error?.[0]?.message ||
        'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setStatus(null);
    }
  };

  const updateFee = async (id: number, updatedFee: Partial<FeeData>) => {
    setStatus('updating');
    setError(null);
    try {
      const { data } = await api.put(`/v2/fee-percentage/${id}`, updatedFee);
      setFee((prev) =>
        prev.map((fee) => (fee.id === id ? { ...fee, ...updatedFee } : fee))
      );
      toast.success('Fee updated successfully');
      return data;
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.response?.data?.error?.[0]?.message ||
        'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setStatus(null);
    }
  };

  const deleteFee = async (id: number) => {
    setStatus('deleting');
    setError(null);
    try {
      const response = await api.delete(`/v2/fee-percentage/${id}`);
      setFee((prev) => prev.filter((fee) => fee.id !== id));
      toast.success('Fee deleted successfully');
      return response;
    } catch (err: unknown) {
      const errorMessage =
        (err as any)?.response?.data?.error?.[0]?.message ||
        'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setStatus(null);
    }
  };

  useEffect(() => {
    fetchFees();
  }, [fetchFees]);

  return { fee, status, error, fetchFees, createFee, updateFee, deleteFee };
};

export default useFeePercentage;
