

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface RiskDisclosures {
  assetId: string;
  name: string;
  description: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useRiskDisclosures = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createRiskDisclosure = async (data: RiskDisclosures) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/risk-disclosure/?assetId=${data.assetId}`,
        {
          name: data.name,
          description: data.description,
        }
      );
      setStatus('success');
      toast.success('Risk Disclosure created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Risk Disclosure failed');
      toast.error(err.response?.data?.message || 'Create Risk Disclosure failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateRiskDisclosure = async (
    id: string,
    data: Partial<RiskDisclosures>
  ) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/risk-disclosure/${id}`, {
        name: data.name,
        description: data.description,
      });
      setStatus('success');
      toast.success('Risk Disclosure updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Risk Disclosure failed');
      toast.error(err.response?.data?.message || 'Update Risk Disclosure failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteRiskDisclosure = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/risk-disclosure/${id}`);
      setStatus('success');
      toast.success('Risk Disclosure deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Risk Disclosure failed');
      toast.error(err.response?.data?.message || 'Delete Risk Disclosure failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createRiskDisclosure,
    updateRiskDisclosure,
    deleteRiskDisclosure,
    status,
    error,
  };
};
