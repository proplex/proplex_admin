

// useUpdateFaq.ts
import { useState } from 'react';
import api from '@/lib/httpClient';

interface UpdateFaqData {
  question: string;
  answer: string;
  faq_id: number;
  property_id: number;
}

const useUpdateFaq = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateFaq = async (data: UpdateFaqData) => {
    setLoading(true);
    setError(null);
    try {
     const respponse = await api.put(`/v2/faq/${data.faq_id}`, {
       question: data.question,
       answer: data.answer,
       property_id: data.property_id,
     });
     return respponse.data;
    } catch (err: any) {
      setError(err?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateFaq,
  };
};

export default useUpdateFaq;
