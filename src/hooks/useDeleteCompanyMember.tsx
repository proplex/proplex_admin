

import { useState, useCallback } from 'react';
import api from '@/lib/httpClient';

const useDeleteCompanyMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const deleteCompanyMember = useCallback(
    async (memberId: number, companyId: number) => {
      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await api.delete(
          `/v2/company/director/${memberId}?company_id=${companyId}`
        );
        if (response.status === 200) {
          setSuccess(true);
        }
        return response.data;
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
            'Something went wrong while deleting the member.'
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { deleteCompanyMember, loading, success, error };
};

export default useDeleteCompanyMember;
