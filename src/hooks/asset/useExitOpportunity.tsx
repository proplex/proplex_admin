

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface ExitOpportunity {
  assetId: string;
  name: string;
  description: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useExitOpportunity = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createExitOpportunity = async (data: ExitOpportunity) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/exit-opportunity/?assetId=${data.assetId}`,
        {
          name: data.name,
          description: data.description,
        }
      );
      setStatus('success');
      toast.success('Exit Opportunity created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Exit Opportunity failed');
      toast.error(
        err.response?.data?.message || 'Create Exit Opportunity failed'
      );
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateExitOpportunity = async (
    id: string,
    data: Partial<ExitOpportunity>
  ) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/exit-opportunity/${id}`, {
        name: data.name,
        description: data.description,
      });
      setStatus('success');
      toast.success('Exit Opportunity updated successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Exit Opportunity failed');
      toast.error(
        err.response?.data?.message || 'Update Exit Opportunity failed'
      );
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteExitOpportunity = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/exit-opportunity/${id}`);
      setStatus('success');
      toast.success('Exit Opportunity deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Exit Opportunity failed');
      toast.error(
        err.response?.data?.message || 'Delete Exit Opportunity failed'
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
    createExitOpportunity,
    updateExitOpportunity,
    deleteExitOpportunity,
    status,
    error,
  };
};
