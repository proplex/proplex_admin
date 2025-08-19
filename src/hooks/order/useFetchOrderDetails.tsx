

import api from '@/lib/httpClient';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const useFetchOrderDetails = () => {
  const { id = '' } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchOrderDetails = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`/v2/admin/order/${id}`);
      setOrderDetails(response.data.data);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || 'Failed to fetch order details'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);

  return { orderDetails, isLoading, refetch: fetchOrderDetails };
};

export default useFetchOrderDetails;
