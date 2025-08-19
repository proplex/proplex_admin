

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/httpClient';
import toast from 'react-hot-toast';

interface Pagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

const useCancel = () => {
  const [cancels, setCancels] = useState<any[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCancels = useCallback(async ({ limit = 10, page = 1 }) => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/v2/admin/cancel?limit=${limit}&page=${page}`
      );
      const data = response.data?.data ?? [];
      const pager = response.data?.pager ?? {
        totalItems: 0,
        currentPage: 1,
        pageSize: limit,
        totalPages: 1,
        hasMore: false,
      };
      setCancels(data);
      setPagination(pager);
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCancels({ limit: 10, page: 1 });
  }, [fetchCancels]);

  return { cancels, pagination, isLoading, refetch: fetchCancels };
};

export default useCancel;
