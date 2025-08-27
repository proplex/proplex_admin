import axios from 'axios';

const useSinglePresignedUrl = () => {
  const getSinglePresignedUrl = async ({
    fileName,
    mimeType,
    fileSize,
    refId,
    belongsTo,
    isPubilc,
  }: {
    fileName: string;
    mimeType: string;
    fileSize: number;
    refId: string;
    belongsTo: string;
    isPubilc: boolean;
  }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/s3-file/upload-single',
        // 'https://dev.ryzer.app/api/s3-file/upload-single',
        {
          fileName,
          mimeType,
          fileSize,
          refId,
          belongsTo,
          isPubilc,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return { getSinglePresignedUrl };
};
export default useSinglePresignedUrl;