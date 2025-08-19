

import api from '@/lib/httpClient';
import { useState, useEffect, useCallback } from 'react';

interface IProject {
  id: string;
  name: string;
}

interface IApiResponse {
  data: IProject[];
}

const useProjects = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    try {
      const res = await api.get<IApiResponse>(`/v2/meta/project`, {
        signal: controller.signal,
      });
      setProjects(res.data.data);
    } catch (err: any) {
      if (err.name === 'AbortError') return; // Handle fetch abortion
      const message = err.resonse.data.message || 'Something went wrong';
      setError(message);
    } finally {
      setLoading(false);
    }
    return () => controller.abort(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    fetchProjectsData();
  }, [fetchProjectsData]);
  return { projects, loading, error };
};

export default useProjects;
