

import api from '@/lib/httpClient';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const useDistribution = (createdAt?: string) => {
  const { id: companyId } = useParams<{ id: string }>();
  const [status, setStatus] = useState<string | null>(null);
  const [distribution, setDistribution] = useState([]);
  const [sendingId, setSendingId] = useState<string | null>(null); // Track which button is clicked

  const fetchDistribution = useCallback(async () => {
    if (!companyId && !createdAt) return;
    if (companyId && !createdAt) return;
    else {
      try {
        setStatus('fetching');
        const query = createdAt ? createdAt : '';
        const res = await api.get(
          `/v2/admin/royalty/distribute/${companyId}?created_at=${query}`
        );
        setDistribution(res.data.data);
        return res.data.data;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Something went wrong';
        toast.error(message);
      } finally {
        setStatus(null);
      }
    }
  }, [companyId, createdAt]);

  const sendRoyalty = async ({ id }: { id: string }) => {
    setSendingId(id); // Set the clicked button's ID
    try {
      await api.post(`/v2/admin/royalty/send/${id}`);
      toast.success('Royalty distributed successfully');
      fetchDistribution();
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      toast.error(message);
    } finally {
      setSendingId(null); // Reset after request completes
    }
  };

  useEffect(() => {
    fetchDistribution();
  }, [fetchDistribution]);

  return {
    distribution,
    status,
    sendingId,
    refetch: fetchDistribution,
    sendRoyalty,
  };
};

export default useDistribution;
