

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';


export interface Feature {
  assetId?: string;
  name: string;
  description: string;
  image: string;
  status: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useFeature = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createFeature = async (data: Feature) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/features?assetId=${data?.assetId}`,
        {
          name: data.name,
          description: data.description,
          image: data.image,
          status: data.status,
        }
      );
      setStatus('success');
      toast.success('Feature created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Feature failed');
      toast.error(err.response?.data?.message || 'Create Feature failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateFeature = async (
    id: string,
    data: Partial<Omit<Feature, 'assetId ' > >
  ) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/features/${id}`, data);
      setStatus('success');
      toast.success('Feature updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Feature failed');
      toast.error(err.response?.data?.message || 'Update Feature failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteFeature = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/real-estate/features/${id}`);
      setStatus('success');
      toast.success('Feature deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Feature failed');
      toast.error(err.response?.data?.message || 'Delete Feature failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createFeature,
    updateFeature,
    deleteFeature,
    status,
    error,
  };
};
