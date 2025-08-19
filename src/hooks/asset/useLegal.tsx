

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface ILegal {
  assetId: string;
  name: string;
  logoUrl: string;
  location: string;
  link: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useLegal = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createLegal = async (data: ILegal) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/due-diligence/legal/?assetId=${data.assetId}`,
        {
          name: data.name,
          logoUrl: data.logoUrl,
          location: data.location,
          link: data.link,
        }
      );
      setStatus('success');
      toast.success('Legal created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Legal failed');
      toast.error(err.response?.data?.message || 'Create Legal failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateLegal = async (id: string, data: Partial<ILegal>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(
        `/assets/real-estate/due-diligence/legal/${id}`,
        {
          name: data.name,
          logoUrl: data.logoUrl,
          location: data.location,
          link: data.link,
        }
      );
      setStatus('success');
      toast.success('Legal updated successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Legal failed');
      toast.error(err.response?.data?.message || 'Update Legal failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteLegal = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(
        `/assets/real-estate/due-diligence/legal/${id}`
      );
      setStatus('success');
      toast.success('Legal deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Legal failed');
      toast.error(err.response?.data?.message || 'Delete Legal failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createLegal,
    updateLegal,
    deleteLegal,
    status,
    error,
  };
};
