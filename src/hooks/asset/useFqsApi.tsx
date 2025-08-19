

import api from '@/lib/httpClient';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export interface Faq {
  assetId: string;
  question: string;
  answer: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useFaqApi = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [faq, setFaq] = useState<Faq | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createFaq = useCallback(async (data: Faq) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(`/assets/faq?assetId=${data.assetId}`, {
        question: data.question,
        answer: data.answer,
      });
      setStatus('success');
      toast.success('FAQ created successfully');
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create FAQ failed');
      toast.error(err.response?.data?.message || 'Create FAQ failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  }, []);

  const updateFaq = useCallback(async (id: string, data: Partial<Faq>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/faq/${id}`, {
        question: data.question,
        answer: data.answer,
      });
      setStatus('success');
      toast.success('FAQ updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update FAQ failed');
      toast.error(err.response?.data?.message || 'Update FAQ failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  }, []);

  const deleteFaq = useCallback(async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/faq/${id}`);
      setStatus('success');
      toast.success('FAQ deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete FAQ failed');
      toast.error(err.response?.data?.message || 'Delete FAQ failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  }, []);
  const getFaqs = useCallback(async (assetId: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get(`/faq/${assetId}`);
      setStatus('success');
      setFaq(res.data);
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Get FAQs failed');
      throw err;
    }
  }, []);
  return {
    createFaq,
    updateFaq,
    deleteFaq,
    getFaqs,
    faq,
    status,
    error,
  };
};
