

import api from '@/lib/httpClient';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

interface ICompany {
  id: string;
  name: string;
}

interface IApiResponse {
  data: ICompany[];
}

const useCompanies = () => {
  const { id = null } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const toastId = 'fetch-companies-error';
    const controller = new AbortController();
    try {
      const res = await api.post<IApiResponse>(`/v2/meta/company`, {
        isEdit: id ? true : false,
        signal: controller.signal,
      });
      setCompanies(res.data.data);
    } catch (err: any) {
      if (err.name === 'AbortError') return; // Handle fetch abortion
      const message =
        err.response?.data?.error?.[0]?.message || 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
    return () => controller.abort(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);
  return { companies, loading, error };
};

export default useCompanies;
