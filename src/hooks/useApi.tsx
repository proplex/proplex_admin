
import { useState } from 'react';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export const useApi = <T = any,>(
  apiCall: (...args: any[]) => Promise<T>,
  options?: UseApiOptions<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (...args: any[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await apiCall(...args);
      setData(result);

      // Trigger success callback if provided
      options?.onSuccess?.(result);
    } catch (err: unknown) {
      const errorMessage = (err as Error).message || 'An error occurred';
      setError(errorMessage);

      // Trigger error callback if provided
      options?.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, execute };
};
