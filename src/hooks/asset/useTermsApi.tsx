

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface Terms {
  assetId: string;
  title: string;
  description: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useTermsApi = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createTerms = async (data: Terms) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/terms-and-conditions?assetId=${data.assetId}`,
        {
          title: data.title,
          description: data.description,
        }
      );
      setStatus('success');
      toast.success('Terms and Conditions created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || 'Create Terms and Conditions failed'
      );
      toast.error(
        err.response?.data?.message || 'Create Terms and Conditions failed'
      );
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateTerms = async (id: string, data: Partial<Terms>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/terms-and-conditions/${id}`, {
        title: data.title,
        description: data.description,
      });
      setStatus('success');
      toast.success('Terms and Conditions updated successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || 'Update Terms and Conditions failed'
      );
      toast.error(
        err.response?.data?.message || 'Update Terms and Conditions failed'
      );
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteTerms = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/terms-and-conditions/${id}`);
      setStatus('success');
      toast.success('Terms and Conditions deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || 'Delete Terms and Conditions failed'
      );
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createTerms,
    updateTerms,
    deleteTerms,
    status,
    error,
  };
};
