import axios from 'axios';

type KYCStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

interface UpdateKYCStatusParams {
  userId: string;
  status: KYCStatus;
  rejectionReason?: string;
}

export const updateKYCStatus = async ({
  userId,
  status,
  rejectionReason,
}: UpdateKYCStatusParams): Promise<{ message: string; data: any }> => {
  try {
    const payload: { status: KYCStatus; rejectionReason?: string } = { status };
    
    if (status === 'REJECTED' && !rejectionReason) {
      throw new Error('Rejection reason is required when status is REJECTED');
    }
    
    if (status === 'REJECTED' && rejectionReason) {
      payload.rejectionReason = rejectionReason;
    }

    const response = await axios.put(
      `/api/v1/kyc/${userId}/approval`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(
          error.response.data.message || 'Failed to update KYC status'
        );
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from server');
      }
    }
    throw error;
  }
};
