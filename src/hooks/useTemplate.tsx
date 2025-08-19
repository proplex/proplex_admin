

import api from '@/lib/httpClient';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export interface ITemplate {
  providerTemplateId: string;
  templateName: string;
  _id?: string;
  provider: string;
  assetId: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useTemplateApi = () => {
  const { id } = useParams();
  const [status, setStatus] = useState<Status>('idle');
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [error, setError] = useState<string | null>(null);

  const createTemplate = async (data: ITemplate) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(`/document-template?assetId=${data.assetId}`, {
        templateName: data.templateName,
        providerTemplateId: data.providerTemplateId,
        provider: data.provider,
      });
      setTemplates((prev) => [...prev, res.data.data]);
      toast.success('Template added successfully');
      setStatus('success');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Template failed');
      toast.error(err.response?.data?.message || 'Create Template failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const getTemplates = async () => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get(`/document-template?assetId=${id}`);
      setTemplates(res.data.data);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Get Templates failed');
      toast.error(err.response?.data?.message || 'Get Templates failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateTemplate = async (id: string, data: Partial<ITemplate>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/document-template/${id}`, {
        templateName: data.templateName,
        providerTemplateId: data.providerTemplateId,
        provider: data.provider,
      });
      setTemplates((prev) =>
        prev.map((doc) => (doc._id === id ? { ...doc, ...data } : doc))
      );
      setStatus('success');
      toast.success('Template updated successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Template failed');
      toast.error(err.response?.data?.message || 'Update Template failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteTemplate = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/document-template/${id}`);
      setTemplates((prev) => prev.filter((doc) => doc._id !== id));
      setStatus('success');
      toast.success('Template deleted successfully');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Template failed');
      toast.error(err.response?.data?.message || 'Delete Template failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return {
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplates,
    templates,
    status,
    error,
  };
};
