

import api from '@/lib/httpClient';
import { ICompany } from '@/types/company';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useFetchCompany = (companyId: number | null | string, reset: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [company, setCompany] = useState<ICompany | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (companyId === null) return;
    const fetchCompanyData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/v2/company/${companyId}`);
        const fetchedCompany = res.data.company;
        reset({
          ...fetchedCompany,
          llp_agreement_copy_file: fetchedCompany?.llp_agreement_copy || null,
          llp_agreement_copy: '',
        });
        setCompany(fetchedCompany);
      } catch (err: any) {
        const message =
          err.response?.data?.error?.[0]?.message || 'Something went wrong';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyData();
  }, [companyId]);

  return { company, loading, error };
};

export default useFetchCompany;
