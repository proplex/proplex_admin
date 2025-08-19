

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface RiskFactor {
  assetId: string;
  name: string;
  description: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useRiskFactorApi = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createRiskFactor = async (data: RiskFactor) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/risk-factor/?assetId=${data.assetId}`,
        {
          name: data.name,
          description: data.description,
        }
      );
      setStatus('success');
      toast.success('Risk Factor created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Risk Factor failed');
      toast.error(err.response?.data?.message || 'Create Risk Factor failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateRiskFactor = async (id: string, data: Partial<RiskFactor>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/risk-factor/${id}`, {
        name: data.name,
        description: data.description,
      });
      toast.success('Risk Factor updated successfully');
      setStatus('success');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Risk Factor failed');
      toast.error(err.response?.data?.message || 'Update Risk Factor failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteRiskFactor = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/risk-factor/${id}`);
      setStatus('success');
      toast.success('Risk Factor deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Risk Factor failed');
      toast.error(err.response?.data?.message || 'Delete Risk Factor failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createRiskFactor,
    updateRiskFactor,
    deleteRiskFactor,
    status,
    error,
  };
};
