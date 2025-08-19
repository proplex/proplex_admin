

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface IStructure {
  assetId: string;
  name: string;
  logoUrl: string;
  location: string;
  link: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useStructure = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createStructure = async (data: IStructure) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/due-diligence/structure/?assetId=${data.assetId}`,
        {
          name: data.name,
          logoUrl: data.logoUrl,
          location: data.location,
          link: data.link,
        }
      );
      setStatus('success');
      toast.success('Structure created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Structure failed');
      toast.error(err.response?.data?.message || 'Create Structure failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateStructure = async (id: string, data: Partial<IStructure>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(
        `/assets/real-estate/due-diligence/structure/${id}`,
        {
          name: data.name,
          logoUrl: data.logoUrl,
          location: data.location,
          link: data.link,
        }
      );
      setStatus('success');
      toast.success('Structure updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Structure failed');
      toast.error(err.response?.data?.message || 'Update Structure failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteStructure = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(
        `/assets/real-estate/due-diligence/structure/${id}`
      );
      setStatus('success');
      toast.success('Structure deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Structure failed');
      toast.error(err.response?.data?.message || 'Delete Structure failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createStructure,
    updateStructure,
    deleteStructure,
    status,
    error,
  };
};
