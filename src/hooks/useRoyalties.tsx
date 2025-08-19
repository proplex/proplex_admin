

import api from '@/lib/httpClient';
import { set } from 'date-fns';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

interface IRoyalty {
  label: string;
  value: string;
}

interface UseRoyaltiesProps {
  companyId: string | null;
  setDate: (date: string) => void;
}

const useRoyalties = ({ companyId, setDate }: UseRoyaltiesProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [royalties, setRoyalties] = useState<IRoyalty[] | null>(null);

  const fetchRoyalties = useCallback(async () => {
    if (!companyId) return;
    setLoading(true);
    try {
      const res = await api.get(`/v2/admin/royalties/${companyId}`);
      const createdAt = res.data.data?.[0]?.created_at;
      const date = createdAt
        ? new Date(createdAt).toLocaleDateString()
        : new Date().toLocaleDateString();

      setDate(date);

      const data: IRoyalty[] = Array.from(
        new Set(
          res.data.data.map((item: any) =>
            new Date(item.created_at).toLocaleDateString()
          )
        )
      ).map((date) => ({
        label: date as string,
        value: date as string,
      }));

      setRoyalties(data);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [companyId]);

  const submitDistribution = async (data: any) => {
    try {
      setLoading(true);
      await api.post(`/v2/admin/royalty/distribute/${companyId}`, data);
      toast.success('Royalties distributed successfully');
      fetchRoyalties();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoyalties();
  }, [fetchRoyalties]);

  return { royalties, loading, refetch: fetchRoyalties, submitDistribution };
};

export default useRoyalties;
