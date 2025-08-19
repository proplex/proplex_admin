

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

const useRoyaltyAccount = () => {
  const [loading, setLoading] = useState(false);
  const createRoyaltyAccount = async ({
    data,
    company_id,
  }: {
    data: any;
    company_id: any;
  }) => {
    setLoading(true);
    try {
      const res = await api.post(
        `/v2/admin/royalty-account/${company_id}`,
        data
      );
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const getRoyaltyAccount = async (company_id: any) => {
    setLoading(true);
    try {
      const res = await api.get(`/v2/admin/royalty-account/${company_id}`);
      return res.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return { createRoyaltyAccount, loading, getRoyaltyAccount };
};

export default useRoyaltyAccount;
