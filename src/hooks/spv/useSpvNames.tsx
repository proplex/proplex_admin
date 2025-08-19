

import api from '@/lib/httpClient';
import { useEffect, useState } from 'react';

const useSpvNames = () => {
  const [spv, setSpv] = useState<any>(null);
  const [spvNames, setSpvNames] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchSpvNames = async () => {
    setError(null);
    try {
      const response = await api.get('/company/names');
      const options = response.data.data.map(
        (item: { name: string; _id: string }) => ({
          label: item.name,
          value: item._id,
        })
      );
      setSpvNames(options);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchSpv = async (id: string) => {
    setError(null);
    try {
      const response = await api.get(`/company/dao/${id}`);
      setSpv(response.data.data);
      return response.data.data;
    } catch (err: any) {
      setError(err.message);
    }
  };
  return {
    spvNames,
    error,
    fetchSpv,
    spv,
    fetchSpvNames
  };
};
export default useSpvNames;
