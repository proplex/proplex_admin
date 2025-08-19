

import { useState } from 'react';
import api from '@/lib/httpClient';

interface UpdateDirectorPayload {
  name: string;
  email: string;
  phone_number: string;
  dsc_din: boolean;
  note: string;
  llp_document: string;
}

interface UseUpdateDirectorReturn {
  loading: boolean;
  error: string | null;
  updateDirector: (
    companyId: number,
    payload: UpdateDirectorPayload
  ) => Promise<void>;
  data: any;
}

export const useUpdateDirector = (): UseUpdateDirectorReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const updateDirector = async (
    companyId: number,
    payload: UpdateDirectorPayload
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/v2/company/director/${companyId}`, payload);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, updateDirector, data };
};
