

import { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/httpClient';
import toast from 'react-hot-toast';

export interface SpvPayload {
  class: string;
  category: string;
  stage: string;
  style: string;
  name: string;
  about: string;
  currency: string;
  instrumentType: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useSpvApi = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [statusUpdate, setStatusUpdate] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [spvList, setSpvList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [spv, setSpv] = useState<any>(null);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const createSpv = async (data: SpvPayload) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post('/company', data);
      navigate(`/edit-spv/${res.data.data._id}`);
      setStatus('success');
      toast.success('Spv created successfully');
      return res.data;
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || err.message || 'Failed to create Spv'
      );
      setStatus('error');
      setError(
        err.response?.data?.message || err.message || 'Failed to create Spv'
      );
      throw err;
    } 
  };

  const getSpv = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get(`/company/${id}`);
      setStatus('success');
      setSpv(res.data.data);
      return res.data;
    } catch (err: any) {
      setStatus('error');
      toast.error(
        err.response?.data?.message || err.message || 'Failed to create Spv'
      );
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch Spv'
      );
      throw err;
    } 
  };

  const updateSpv = async (id: string, data: SpvPayload) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/company/${id}`, data);
      setStatus('success');
      toast.success('Spv updated successfully');
      setSpv(res.data.data);
      return res.data;
    } catch (err: any) {
      setStatus('error');
      toast.error(
        err.response?.data?.message || err.message || 'Failed to create Spv'
      );
      setError(
        err.response?.data?.message || err.message || 'Failed to update Spv'
      );
      throw err;
    }
  };

  const getSpvList = async ({
    page = 1,
    limit = 10,
    status = 'active',
    type,
    search,
  }: {
    page?: number;
    limit?: number;
    status?: string;
    type: string[];
    search?: string;
  }) => {
    setStatus('loading');
    setError(null);
    try {
      const params = new URLSearchParams();
      if (type) {
        type.forEach((t) => {
          params.append('type', t);
        });
      }
      if (status) {
        params.append('status', status);
      }
      if (page) {
        params.append('page', page.toString());
      }
      if (limit) {
        params.append('limit', limit.toString());
      }
      if (search) {
        params.append('search', search);
      }
      const queryString = params.toString();
      const res = await api.get(`/company/company-list?${queryString}`);
      setStatus('success');
      setSpvList(res.data.data);
      setPagination(res.data.pagination);
      return res.data;
    } catch (err: any) {
      setStatus('error');
      toast.error(
        err.response?.data?.message || err.message || 'Failed to create Spv'
      );
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch Spv list'
      );
      throw err;
    } 
  };

  const updateSpvStatus = async (id: string, status: string) => {
    setStatusUpdate('loading');
    setError(null);
    try {
      const res = await api.put(`/company/${id}/toggle-status`);
      setSpvList((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            return { ...item, status };
          }
          return item;
        })
      );
      setStatusUpdate('success');
      toast.success('Spv status updated successfully');
      setSpv(res.data.data);
      return res.data;
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || err.message || 'Failed to create Spv'
      );
      setStatusUpdate('error');
      setError(
        err.response?.data?.message || err.message || 'Failed to update Spv'
      );
      throw err;
    } 
  };

  return {
    createSpv,
    getSpv,
    updateSpv,
    getSpvList,
    status,
    error,
    spv,
    isPending,
    spvList,
    pagination,
    updateSpvStatus,
    statusUpdate,
    setStatusUpdate
  };
};
