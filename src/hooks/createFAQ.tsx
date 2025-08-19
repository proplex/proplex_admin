

import { useState } from 'react';
import api from '@/lib/httpClient';

// Define the type for FAQ data
interface FAQData {
  question: string;
  answer: string;
  property_id: number;
}

// Define the type for API response
interface FAQResponse {
  id: number;
  question: string;
  answer: string;
  property_id: number;
  created_at: string;
  updated_at: string;
}

// Define the type for error response
interface APIError {
  message: string;
  statusCode: number;
  details?: any;
}

const useCreateFAQ = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<APIError | null>(null);

  const createFAQ = async (
    faqData: FAQData
  ): Promise<FAQResponse | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<FAQResponse>('/v2/faq', faqData);
      return response.data;
    } catch (err: any) {
      const errorResponse: APIError = err.response?.data || {
        message: 'Network Error',
        statusCode: 500,
      };
      setError(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, createFAQ };
};

export default useCreateFAQ;
