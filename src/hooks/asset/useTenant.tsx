

import api from '@/lib/httpClient';
import { useState } from 'react';
import toast from 'react-hot-toast';

export interface Tenant {
  assetId: string;
  name: string;
  annualRentEscalation: number;
  type: string;
  startDate: string;
  endDate: string;
  lockInPeriod: number;
  leasePeriod: number;
  securityDeposit: number;
  interestOnSecurityDeposit: number;
  agreement: string;
  status: string;
  logo: string;
  sftsAllocated: number;
  rentPerSft: number;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export const useTenant = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  const createTenant = async (data: Tenant) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.post(
        `/assets/real-estate/tenant?assetId=${data.assetId}`,
        {
          name: data.name,
          annualRentEscalation: data.annualRentEscalation,
          type: data.type,
          startDate: data.startDate ? new Date(data.startDate) : new Date(),
          endDate: data.endDate ? new Date(data.endDate) : new Date(),
          status: data.status,
          lockInPeriod: data.lockInPeriod,
          leasePeriod: data.leasePeriod,
          securityDeposit: data.securityDeposit,
          interestOnSecurityDeposit: data.interestOnSecurityDeposit,
          agreement: data.agreement,
          logo: data.logo,
          sftsAllocated: data.sftsAllocated,
          rentPerSft: data.rentPerSft,
        }
      );
      setStatus('success');
      toast.success('Tenant created successfully');

      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Create Tenant failed');
      toast.error(err.response?.data?.message || 'Create Tenant failed');

      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const updateTenant = async (id: string, data: Partial<Tenant>) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/tenant/${id}`, {
        name: data.name,
        annualRentEscalation: data.annualRentEscalation,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
        status: data.status,
        lockInPeriod: data.lockInPeriod,
        leasePeriod: data.leasePeriod,
        securityDeposit: data.securityDeposit,
        interestOnSecurityDeposit: data.interestOnSecurityDeposit,
        agreement: data.agreement,
        logo: data.logo,
        sftsAllocated: data.sftsAllocated,
        rentPerSft: data.rentPerSft,
      });
      setStatus('success');
      toast.success('Tenant updated successfully');
      return res.data.data
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Update Tenant failed');
      toast.error(err.response?.data?.message || 'Update Tenant failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  const deleteTenant = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.delete(`/assets/real-estate/tenant/${id}`);
      setStatus('success');
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Delete Tenant failed');
      throw err;
    } finally {
      setTimeout(() => {
        setStatus('idle');
        setError(null);
      }, 1000);
    }
  };

  return {
    createTenant,
    updateTenant,
    deleteTenant,
    status,
    error,
  };
};
