

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface Amenity {
  assetId?: string;
  name: string;
  description: string;
  image: string;
  status?: boolean;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useAmenityApi = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createAmenity = async (data: Amenity) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/amenities?assetId=${data.assetId}`,
        {
          name: data.name,
          description: data.description,
          image: data.image,
          status: data.status,
        }
      );
      setStatus('success');
      toast.success('Amenity created successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Amenity failed');
      toast.error(err.response?.data?.message || 'Create Amenity failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateAmenity = async (id: string, data: Partial<Omit<Amenity, 'assetId'>>
  ) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/amenities/${id}`,data);
      setStatus('success');
      toast.success('Amenity updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Amenity failed');
      toast.error(err.response?.data?.message || 'Update Amenity failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteAmenity = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/real-estate/amenities/${id}`);
      setStatus('success');
      toast.success('Amenity deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Amenity failed');
      toast.error(err.response?.data?.message || 'Delete Amenity failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const fetchAmenity = async (id?: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get(`/assets/real-estate/amenities?assetId=${id}`);
      setStatus('success');
      toast.success('Amenity fetched successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Fetch Amenity failed');
      toast.error(err.response?.data?.message || 'Fetch Amenity failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createAmenity,
    updateAmenity,
    deleteAmenity,
    fetchAmenity,
    status,
    error,
  };
};
