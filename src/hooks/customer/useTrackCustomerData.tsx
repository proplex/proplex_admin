// hooks/customer/useTrackCustomerData.ts
import { useState } from 'react';
import api from '@/lib/httpClient';

const useTrackCustomerData = () => {
  const [customerData, setCustomerData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCustomerData = async (userId: string) => {
    setLoading(true);
    try {
      const response = await api.get(`/financial/financial-data?userId=${userId}`);
      const data = response.data?.data;
      setCustomerData(data);
      return data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { customerData, fetchCustomerData, error, loading };
};

export default useTrackCustomerData;
