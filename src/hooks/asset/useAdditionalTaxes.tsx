

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface AdditionalTaxes {
  assetId: string;
  name: string;
  value: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useAdditionalTaxes = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createAdditionalTaxes = async (data: AdditionalTaxes) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/additional-tax/?assetId=${data.assetId}`,
        {
          name: data.name,
          value: data.value,
        }
      );
      setStatus('success');
      toast.success('Additional Taxes created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Additional Taxes failed');
      toast.error(err.response?.data?.message || 'Create Additional Taxes failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateAdditionalTaxes = async (
    id: string,
    data: Partial<AdditionalTaxes>
  ) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/additional-tax/${id}`, {
        name: data.name,
        value: data.value,
      });
      toast.success('Additional Taxes updated successfully');
      setStatus('success');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Additional Taxes failed');
      toast.error(err.response?.data?.message || 'Update Additional Taxes failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteAdditionalTaxes = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/additional-tax/${id}`);
      setStatus('success');
      toast.success('Additional Taxes deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Additional Taxes failed');
      toast.error(err.response?.data?.message || 'Delete Additional Taxes failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createAdditionalTaxes,
    updateAdditionalTaxes,
    deleteAdditionalTaxes,
    status,
    error,
  };
};
