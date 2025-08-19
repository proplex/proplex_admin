

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const useFileUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, endpoint: string = '/file') => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(
        'https://dev.ryzer.app/api/asset',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json',
          },
        }
      );

      return response.data;
    } catch (err: any) {
      if (err.response?.status === 413) {
        toast.error(
          'File size is too large. Please try again with a smaller file.'
        );
        setError(
          'File size is too large. Please try again with a smaller file.'
        );
      } else {
        toast.error(
          err.response?.data?.message || err.message || 'Something went wrong'
        );
        setError(
          err.response?.data?.message || err.message || 'Something went wrong'
        );
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, loading, error };
};

export default useFileUpload;
