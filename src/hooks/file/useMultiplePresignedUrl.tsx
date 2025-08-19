import api from '@/lib/httpClient'; // Or use axios directly if needed

interface FileInput {
  fileName: string;
  mimeType: string;
  fileSize: number;
  refId: string;
  belongsTo: string;
  isPubilc: boolean;
  metadata?: Record<string, any>;
}

interface PresignedResponse {
  uploadUrl: string;
  savedS3Object: {
    _id: string;
    [key: string]: any;
  };
}

const useMultiplePresignedUrl = () => {
  const getMultiplePresignedUrl = async (
    files: FileInput[]
  ): Promise<PresignedResponse[]> => {
    try {
      const response = await api.post('/s3-file/upload-multiple', {
        files,
      });

      return response.data;
    } catch (error: any) {
      console.error('Failed to fetch presigned URLs', error);
      throw new Error(
        error?.response?.data?.message || 'Presigned URL request failed'
      );
    }
  };

  return { getMultiplePresignedUrl };
};

export default useMultiplePresignedUrl;
