

import { useState } from 'react';
import api from '@/lib/httpClient';

interface DeleteAdvisorResponse {
  data: any;
}

const useDeleteAdvisor = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<DeleteAdvisorResponse | null>(null);

  const deleteAdvisorCall = async (advisorId: number, companyId: number) => {
    setLoading(true);
    setError(null);
    try {
      const result = await api.delete(
        `/v2/company/advisor/${advisorId}?company_id=${companyId}`
      );
      setResponse(result.data);
    } catch (error) {
      setError('An error occurred while deleting the advisor.');
    } finally {
      setLoading(false);
    }
  };

  return { deleteAdvisorCall, loading, error, response };
};

export default useDeleteAdvisor;
