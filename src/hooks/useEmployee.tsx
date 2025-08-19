

import { useState, useCallback, useEffect } from 'react';
import api from '@/lib/httpClient';
import toast from 'react-hot-toast';

export interface FeeData {
  uuid: string;
  id: number;
  name: string;
  value: number;
  type: number;
  status: boolean;
}

const useEmployee = () => {
  const [employees, setEmployees] = useState<any[]>([]);
  const [pager, setPager] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const fetchEmployees = useCallback(
    async ({ page = 1, limit = 10 }: { page: number; limit: number }) => {
      setStatus('fetching');
      setError(null);
      try {
        const { data } = await api.get(
          `/v2/admin/employee?page=${page}&limit=${limit}`
        );
        setEmployees(data.data);
        setPager(data.pager);
      } catch (err: any) {
        const errorMessage =
          err.response.data.message || 'Something went wrong';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setStatus(null);
      }
    },
    []
  );

  const addEmployee = async (data: any) => {
    setStatus('submitting');
    setError(null);
    try {
      await api.post(`/v2/admin/employee`, data);
      toast.success('Employee added successfully');
    } catch (err: any) {
      const errorMessage =
        err.response.data.message || 'Failed to add employee. Please try again';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setStatus(null);
    }
  }

  useEffect(() => {
    fetchEmployees({ page: 1, limit: 10 });
  }, [fetchEmployees]);

  return { employees, status, error, fetchEmployees, pager, addEmployee };
};

export default useEmployee;
