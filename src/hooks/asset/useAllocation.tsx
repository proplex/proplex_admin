

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface IAllocation {
  assetId?: string;
  category: string;
  tokens: number;
  vestingType: string;
  vestingStartDate: string;
  vestingEndDate: string;
  cliffPeriod: number;
  description: string;
  isActive?: boolean;
  _id?: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useAllocation = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createAllocation = async (data: IAllocation) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/allocation-category?assetId=${data.assetId}`,
        {
          category: data.category,
          tokens: data.tokens,
          vestingType: data.vestingType,
          vestingStartDate: data.vestingStartDate,
          vestingEndDate: data.vestingEndDate,
          cliffPeriod: data.cliffPeriod,
          description: data.description,
          isActive: data.isActive,
        }
      );
      setStatus('success');
      toast.success('Allocation created successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Allocation failed');
      toast.error(err.response?.data?.message || 'Create Allocation failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateAllocation = async (
    id: string,
    data: Partial<Omit<IAllocation, 'assetId'>>
  ) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(
        `/assets/real-estate/allocation-category/${id}`,
        data
      );
      setStatus('success');
      toast.success('Allocation updated successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Allocation failed');
      toast.error(err.response?.data?.message || 'Update Allocation failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteAllocation = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(
        `/assets/real-estate/allocation-category/${id}`
      );
      setStatus('success');
      toast.success('Allocation deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Allocation failed');
      toast.error(err.response?.data?.message || 'Delete Allocation failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };
  return {
    createAllocation,
    updateAllocation,
    deleteAllocation,
    status,
    error,
  };
};
