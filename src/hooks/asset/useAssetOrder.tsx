

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useAssetOrder = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const getOrders = async ({
    id,
    search,
    page = '1',
    limit = '10',
    status,
  }: {
    id: string;
    page: number | string;
    limit: string | number;
    status?: string;
    search?: string;
  }) => {
    try {
      const response = await api.get(
        `/orders?assetId=${id}&page=${page}&limit=${limit}&search=${search}&currentStatus=${status}`
      );
      setOrders(response.data.data);
      setPagination(response.data.pagination);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch orders');
    }
  };
  return {
    orders,
    pagination,
    getOrders,
  };
};
