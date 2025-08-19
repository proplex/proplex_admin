

import api from '@/lib/httpClient';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router';

interface AdvisorData {
  name: string;
  email: string;
  firm: string;
  phone_number: string;
  type: string;
  area_of_expertise: string;
  note?: string;
}

interface UseUpdateAdvisorResponse {
  isLoading: boolean;
  error: string | null;
  updateAdvisor: (data: AdvisorData) => Promise<AxiosResponse | void>;
}

export const useUpdateAdvisor = (): UseUpdateAdvisorResponse => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAdvisor = async (
    data: AdvisorData
  ): Promise<AxiosResponse | void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put(`/v2/company/advisor/${id}`, data);
      return response.data.data;
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateAdvisor };
};
