

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface IValuation {
  assetId: string;
  name: string;
  logoUrl: string;
  location: string;
  link: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useValuation = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createValuation = async (data: IValuation) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/due-diligence/valuation/?assetId=${data.assetId}`,
        {
          name: data.name,
          logoUrl: data.logoUrl,
          location: data.location,
          link: data.link,
        }
      );
      setStatus('success');
      toast.success('Valuation created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Valuation failed');
      toast.error(err.response?.data?.message || 'Create Valuation failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateValuation = async (id: string, data: Partial<IValuation>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(
        `/assets/real-estate/due-diligence/valuation/${id}`,
        {
          name: data.name,
          logoUrl: data.logoUrl,
          location: data.location,
          link: data.link,
        }
      );
      setStatus('success');
      toast.success('Valuation updated successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Valuation failed');
      toast.error(err.response?.data?.message || 'Update Valuation failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteValuation = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(
        `/assets/real-estate/due-diligence/valuation/${id}`
      );
      setStatus('success');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Valuation failed');
      toast.error(err.response?.data?.message || 'Delete Valuation failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createValuation,
    updateValuation,
    deleteValuation,
    status,
    error,
  };
};
