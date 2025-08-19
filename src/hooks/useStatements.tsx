

import api from '@/lib/httpClient';
import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export const useStatements = () => {
  const { getValues } = useFormContext();
  const { acccount_number = null } = getValues('royaltyEscrowDetails');
  const { id: company_id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [statements, setStatements] = useState<any[]>([]);

  const fetchStatements = async ({ page = 1 }: { page?: number }) => {
    if (acccount_number) {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/v2/admin/royalty/statement/${company_id}`,
          {
            params: { page },
          }
        );
        setStatements(data);
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    } else return;
  };

  useEffect(() => {
    fetchStatements({ page: 1 });
  }, []);

  const fetchBasedOnPage = async (page: number) => {
    fetchStatements({ page });
  };

  return { statements, loading, fetchBasedOnPage };
};
