

import axios from 'axios';

const useGetMultipleFileUrl = () => {
  const getFileUrl = async (id: string) => {
    try {
      const response = await axios.get(
        `https://dev.ryzer.app/api/s3-file/${id}/s3Url`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching fileUrl:', error);
      throw error;
    }
  };
  return {
    getFileUrl,
  };
};

export default useGetMultipleFileUrl;

