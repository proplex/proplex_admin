

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface Expenses {
  assetId: string;
  name: string;
  value: string;
  isPercentage?: boolean;
  status: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useExpenses = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createExpenses = async (data: Expenses) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/expense?assetId=${data.assetId}`,
        {
          name: data.name,
          value: data.value,
          isPercentage: data.isPercentage,
          status: data.status,
        }
      );
      setStatus('success');
      toast.success('Expense created successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Expense failed');
      toast.error(err.response?.data?.message || 'Create Expense failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateExpenses = async (id: string, data: Partial<Expenses>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/expense/${id}`, {
        name: data.name,
        value: data.value,
        isPercentage: data.isPercentage,
        status: data.status,
      });
      setStatus('success');
      toast.success('Expense updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Expense failed');
      toast.error(err.response?.data?.message || 'Update Expense failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteExpenses = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/real-estate/expense/${id}`);
      setStatus('success');
      toast.success('Expense deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Expense failed');
      toast.error(err.response?.data?.message || 'Delete Expense failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createExpenses,
    updateExpenses,
    deleteExpenses,
    status,
    error,
  };
};
