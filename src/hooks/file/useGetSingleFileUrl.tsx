

import axios from 'axios';

const useGetSingleFileUrl = () => {
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

export default useGetSingleFileUrl;
