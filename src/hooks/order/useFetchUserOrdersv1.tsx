

import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/httpClient';
import toast from 'react-hot-toast';

interface IOrder {
  id: number;
  status: string;
  property_id: number;
  no_sqyds: number | null;
  total_amount: number;
  created_at: string;
  updated_at: string;
  user: {
    name: string;
  };
  number_of_token: number;
  user_id: number;
  property_name: string;
  sto_sale_address: string | null;
  blockchain_metadata: any | null;
  property: {
    name: string;
  };
}

interface Pagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  pages: number;
  totalPages: number;
  hasMore: boolean;
}

interface UseOrderQueryParams {
  page?: number;
  limit?: number;
  user_id?: number;
}

interface UseOrderQueryReturn {
  orders: IOrder[] | [];
  pagination: Pagination | null;
  isLoading: boolean;
  refetch: (params?: UseOrderQueryParams) => void; // Refetch with updated params
}

const useFetchUserOrders = (
  initialParams: UseOrderQueryParams
): UseOrderQueryReturn => {
  const [params, setParams] = useState<UseOrderQueryParams>(initialParams);
  const [orders, setOrders] = useState<IOrder[] | []>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOrders = useCallback(async (fetchParams: UseOrderQueryParams) => {
    setIsLoading(true);
    try {
      let query = `/v2/admin/order/user/${fetchParams.user_id}?page=${
        fetchParams.page ?? 1
      }&limit=${fetchParams.limit ?? 10}`;
      const response = await api.get(query);
      setOrders(response.data.data);
      setPagination(response.data.pager);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message ||
          'An error occurred while fetching orders.'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders(params);
  }, [params, fetchOrders]);

  const refetch = (newParams: UseOrderQueryParams = {}) => {
    setParams(newParams);
  };

  return { orders, pagination, isLoading, refetch };
};

export default useFetchUserOrders;
