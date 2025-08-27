import { createCompany } from '@/services/supabaseService';

export const createCompanyApi = async (body: any) => {
  try {
    const result = await createCompany(body);
    return result;
  } catch (error) {
    throw error;
  }
};