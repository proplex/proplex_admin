

import api from '@/lib/httpClient';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface BankData {
  bank_name: string;
  account_number: string;
  name: string;
  ifsc_code: string;
}

interface UseAddBankResponse {
  isLoading: boolean;
  error: string | null;
  addBank: (data: BankData) => Promise<AxiosResponse | void>;
}

export const useAddBank = (): UseAddBankResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const STATUS_MAPPING: Record<string, string> = {
    INVALID: 'The account is invalid.',
    RECEIVED:
      'The transaction request has been successfully received and is awaiting processing or verification.',
    FAILED:
      'The transaction failed due to an error or issue on the bank’s side.',
    REJECTED:
      'The transaction was rejected, typically due to issues such as insufficient funds.',
    APPROVAL_PENDING:
      'This status indicates that the verification process is awaiting merchant approval of the submitted files to proceed further.',
    PARTIALLY_APPROVED:
      'This status indicates that some of the submitted data or files have been approved for verification.',
    IN_PROCESS:
      'This status indicates that the request is currently under validation, and the verification process is actively ongoing.',
    CANCELLED:
      'This status indicates that the request was terminated by the user and will not proceed further.',
    PROCESSING:
      'This status indicates that the request is being actively handled, and the system is working on completing the verification or transaction.',
    MANUALLY_REJECTED:
      'This status indicates that the request was explicitly reviewed and rejected by a user.',
  };

  const addBank = async (data: BankData): Promise<AxiosResponse | void> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/v2/company/add-bank', data);
      return response.data;
    } catch (err: any) {
      if (err.response.data.account_status) {
        toast.error(STATUS_MAPPING[err.response.data.account_status]);
        setError(STATUS_MAPPING[err.response.data.account_status]);
      } else {
        toast.error(err.response?.data?.message || 'Failed to submit project');
        setError(err.response?.data?.message || 'Failed to update project');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addBank };
};
