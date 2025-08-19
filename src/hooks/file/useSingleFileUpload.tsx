

import axios from 'axios';

const useSingleFileUpload = () => {
  const uploadFile = async ({ url, file }: { url: string; file: File }) => {
    try {
      const response = await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      return response;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
  return { uploadFile };
};
export default useSingleFileUpload;
