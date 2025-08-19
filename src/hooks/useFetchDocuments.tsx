import api from '@/lib/httpClient';
import { useState, useEffect, useCallback, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

type Document = {
  id: string;
  role: string;
  [key: string]: any;
};

const useFetchDocuments = () => {
  const { id } = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchDocuments = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get(`/v2/admin/order/submissions/${id}`);

      const docs = Array.isArray(data?.data?.data) ? data.data.data : [];

      const filtered = docs.filter((doc: Document) => doc.role === 'Investor');

      // Transition the state update for smoother UX
      startTransition(() => {
        setDocuments(filtered);
      });
    } catch (err: any) {
      console.error(err);
      const message =
        err?.response?.data?.message || 'Failed to fetch documents';
      setError(message);
      toast.error(message);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading: loading || isPending,
    error,
    refetch: fetchDocuments,
  };
};

export default useFetchDocuments;
