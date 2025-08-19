

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export const useUpdateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const updateOrder = async (orderId: number, payload: object) => {
    setIsLoading(true);
    try {
      const { data } = await api.put(`/v2/admin/order/${orderId}`, payload);
      setSuccess(true);
      return data.data;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update order');
    } finally {
      setIsLoading(false);
    }
  };

  return { updateOrder, isLoading, success };
};
