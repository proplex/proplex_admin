

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface IDocument {
  assetId: string;
  name: string;
  description?: string;
  type: string;
  format: string;
  document: string;
  isProtected: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useAssetDocument = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createDocument = async (data: IDocument) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/documents?assetId=${data.assetId}`,
        {
          name: data.name,
          description: data.description,
          type: data.type,
          format: data.format,
          document: data.document,
          isProtected: data.isProtected,
          isActive: data.isActive,
        }
      );
      toast.success('Document created successfully');
      setStatus('success');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Document failed');
      toast.error(err.response?.data?.message || 'Create Document failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateDocument = async (id: string, data: Partial<IDocument>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/documents/${id}`, {
        name: data.name,
        description: data.description,
        type: data.type,
        format: data.format,
        document: data.document,
        isProtected: data.isProtected,
        isActive: data.isActive,
      });
      toast.success('Document updated successfully');
      setStatus('success');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Document failed');
      toast.error(err.response?.data?.message || 'Update Document failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteDocument = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/real-estate/documents/${id}`);
      toast.success('Document deleted successfully');
      setStatus('success');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Document failed');
      toast.error(err.response?.data?.message || 'Delete Document failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createDocument,
    updateDocument,
    deleteDocument,
    status,
    error,
  };
};
