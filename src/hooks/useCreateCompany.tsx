import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/httpClient';

export interface CompanyData {
  name: string;
  jurisdiction: string;
  [key: string]: any;
}

interface ApiResponse {
  id: string;
  [key: string]: any;
}

const useCreateCompany = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const createCompany = async (data: CompanyData) => {
    setLoading(true);
    setError(null);
    setResponseData(null);
    
    try {
      // Save company data to the backend
      const response = await api.post<ApiResponse>('/api/companies', data);
      setResponseData(response.data);
      toast.success('Company created successfully!');
      
      // Navigate to the company detail page
      if (response.data?.id) {
        navigate(`/companies/${response.data.id}`);
      } else {
        navigate('/companies');
      }
      
      return response.data;
    } catch (err: any) {
      console.error('Error creating company:', err);
      const errorMessage = err.response?.data?.message || 'Failed to create company';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCompany,
    loading,
    responseData,
    error
  };
};

export default useCreateCompany;