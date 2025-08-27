import axios from 'axios';

const useGetMultipleFileUrl = () => {
  const getFileUrl = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/s3-file/${id}/s3Url`
        // `https://dev.ryzer.app/api/s3-file/${id}/s3Url`
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