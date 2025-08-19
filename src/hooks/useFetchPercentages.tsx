

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/httpClient';

interface PercentageItem {
  id: number;
  uuid: string;
  name: string;
  value: string | null;
  type: string | null;
  film: string | null;
  music: string | null;
  web_series: string | null;
  books: string | null;
  sports: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
}

interface Pager {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

interface ApiResponse {
  type: string;
  message: string;
  data: PercentageItem[];
  pager: Pager;
}

const useFetchPercentages = () => {
  const [data, setData] = useState<PercentageItem[]>([]);
  const [pager, setPager] = useState<Pager | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data function with optional pagination parameters
  const fetchData = useCallback(
    async (page: number = 1, limit: number = 10) => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get<ApiResponse>('/percentage', {
          params: { page, limit },
        });

        const { data: responseData, pager: responsePager } = response.data;
        setData(responseData || []);
        setPager(responsePager || null);
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || err.message || 'An error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(
    (page?: number, limit?: number) => {
      fetchData(
        page || pager?.currentPage || 1,
        limit || pager?.pageSize || 10
      );
    },
    [fetchData, pager]
  );

  return { data, pager, loading, error, refetch };
};

export default useFetchPercentages;
