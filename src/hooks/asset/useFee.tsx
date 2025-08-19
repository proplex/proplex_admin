

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface IFee {
  assetId?: string;
  name: string;
  isPercentage: string;
  value: number;
  status?: boolean;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useFee = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createFee = async (data: IFee) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/fee-config?assetId=${data.assetId}`,
        {
          name: data.name,
          isPercentage: data.isPercentage,
          value: data.value,
          status: data.status,
          type: data.type,
        }
      );
      setStatus('success');
      toast.success('Fee created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Fee failed');
      toast.error(err.response?.data?.message || 'Create Fee failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateFee = async (
    id: string,
    data: Partial<Omit<IFee, 'assetId'>>
  ) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/fee-config/${id}`, {
        name: data.name,
        isPercentage: data.isPercentage,
        value: data.value,
        status: data.status,
        type: data.type,
      });
      setStatus('success');
      toast.success('Fee updated successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Fee failed');
      toast.error(err.response?.data?.message || 'Update Fee failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteFee = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/real-estate/fee-config/${id}`);
      setStatus('success');
      toast.success('Fee deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Fee failed');
      toast.error(err.response?.data?.message || 'Delete Fee failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createFee,
    updateFee,
    deleteFee,
    status,
    error,
  };
};
