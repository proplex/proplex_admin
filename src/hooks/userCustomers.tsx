

import api from '@/lib/httpClient';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface User {
  id: number;
  uuid: string;
  name: string;
  phone: string | null;
  email: string;
  avatar: string;
  role_data: { id: number; name: string };
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasMore: boolean;
}

export const useCustomers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    hasMore: false,
  });

  const fetchUsers = async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    setLoading(true);
    try {
      const response = await api(`/v2/admin/user?page=${page}&limit=${limit}`);
      setUsers(response.data.data);
      setPagination(response.data.pager);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'An error occurred');
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers({ page: 1, limit: 10 });
  }, []);

  const goToPage = ({ page, limit }: { page: number; limit: number }) => {
    fetchUsers({ page, limit });
  };

  return { users, loading, error, pagination, goToPage };
};
