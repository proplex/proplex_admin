

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface AdditionalBoardMember {
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  idNumber: string;
  idProof: string;
  role: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useABApi = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createAB = async (data: AdditionalBoardMember) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/company/additional-board-member?companyId=${data.companyId}`,
        {
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          idNumber: data.idNumber,
          idProof: data.idProof,
          role: data.role,
        }
      );
      toast.success('Additional Board Member added successfully');
      setStatus('success');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || 'Create Additional Board Member failed'
      );
      toast.error(
        err.response?.data?.message || 'Create Additional Board Member failed'
      );
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateAB = async (id: string, data: Partial<AdditionalBoardMember>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/company/additional-board-member/${id}`, {
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        idNumber: data.idNumber,
        idProof: data.idProof,
        role: data.role,
      });
      setStatus('success');
      toast.success('Additional Board Member updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || 'Update Additional Board Member failed'
      );
      toast.error(
        err.response?.data?.message || 'Update Additional Board Member failed'
      );
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteAB = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/company/additional-board-member/${id}`);
      setStatus('success');
      toast.success('Additional Board Member deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || 'Delete Additional Board Member failed'
      );
      toast.error(
        err.response?.data?.message || 'Delete Additional Board Member failed'
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
    createAB,
    updateAB,
    deleteAB,
    status,
    error,
  };
};
