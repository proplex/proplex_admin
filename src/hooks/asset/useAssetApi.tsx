

import { useState, useCallback, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/httpClient';
import toast from 'react-hot-toast';
import { mockAssets } from '@/data/mockAssets';

export interface AssetPayload {
  class: string;
  category: string;
  stage: string;
  style: string;
  name: string;
  about: string;
  currency: string;
  instrumentType: string;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export const useAssetApi = () => {
  const [status, setStatus] = useState<Status>('idle');
  const [statusUpdate, setStatusUpdate] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [asset, setAsset] = useState<any>({
    class: 'real-estate',
    category: 'commercial',
    stage: 'fully-rented',
  });

  const [assetOverview, setAssetOverview] = useState<any>()
  const [isPending, startTransition] = useTransition();
  const [assetList, setAssetList] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const navigate = useNavigate();

  const createAsset = useCallback(
    async (data: AssetPayload) => {
      setStatus('loading');
      setError(null);
      try {
        const res = await api.post('/assets/real-estate', data);
        setStatus('success');
        toast.success('Asset created successfully');
        navigate(
          `/edit-asset/${res.data.data._id}?step=asset-information&tab=asset-type`
        );
        return res.data;
      } catch (err: any) {
        setStatus('error');
        setError(
          err.response?.data?.message || err.message || 'Failed to create asset'
        );
        toast.error(
          err.response?.data?.message || err.message || 'Failed to create asset'
        );
        throw err;
      }
    },
    [navigate]
  );

  const getAsset = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get(`/assets/real-estate/${id}`);
      setStatus('success');
      setAsset(res.data.data);
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch asset'
      );
      throw err;
    }
  }

  const updateAsset = useCallback(async (id: string, data: AssetPayload) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/${id}`, data);
      setStatus('success');
      toast.success('Asset updated successfully');
      setAsset(res.data.data);
      return res.data.data;
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || err.message || 'Failed to update asset'
      );
      toast.error(
        err.response?.data?.message || err.message || 'Failed to update asset'
      );
      throw err;
    }
  }, []);

  const getAssetList = async ({
    page = 1,
    limit = 10,
    search = '',
    status = '',
    stage = ''
  }: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    stage?: string;
  }) => {
    setStatus('loading');
    setError(null);
    try {
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(status && { status }),
        ...(stage && { stage })
      });

      const res = await api.get(
        `/assets/real-estate/admin-list?${params.toString()}`
      );
      setStatus('success');
      setAssetList(res.data.data);
      setPagination(res.data.pagination);
      return res.data;
    } catch (err: any) {
      console.log('Using mock assets data due to API error:', err.message);
      // Fallback to mock data with filters
      let filteredAssets = [...mockAssets];
      
      // Apply search filter
      if (search) {
        const searchLower = search.toLowerCase();
        filteredAssets = filteredAssets.filter(asset => 
          asset.name.toLowerCase().includes(searchLower) ||
          asset.location.toLowerCase().includes(searchLower) ||
          asset.status.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply status filter
      if (status) {
        const statuses = status.split(',').map(s => s.trim().toLowerCase());
        filteredAssets = filteredAssets.filter(asset => 
          statuses.includes(asset.status.toLowerCase())
        );
      }
      
      // Apply stage filter
      if (stage) {
        const stages = stage.split(',').map(s => s.trim().toLowerCase());
        filteredAssets = filteredAssets.filter(asset => 
          stages.includes(asset.stage.toLowerCase())
        );
      }
      
      const startIndex = (page - 1) * limit;
      const paginatedAssets = filteredAssets.slice(startIndex, startIndex + limit);
      
      setStatus('success');
      setAssetList(paginatedAssets);
      setPagination({
        total: filteredAssets.length,
        page,
        limit,
        totalPages: Math.ceil(filteredAssets.length / limit)
      });
      
      return {
        data: paginatedAssets,
        pagination: {
          total: filteredAssets.length,
          page,
          limit,
          totalPages: Math.ceil(filteredAssets.length / limit)
        }
      };
    }
  };

  const getAssetOverview = async (id: string) => {
    setStatus('loading');
    setError(null);
    try {
      const res = await api.get(`/assets/real-estate/asset-overview?assetId=${id}`);
      setStatus('success');
      setAssetOverview(res.data.data);
      return res.data;
    } catch (err: any) {
      setStatus('error');
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch asset'
      );
      throw err;
    }
  };

  const updateAssetStatus = async (id: string, status: string, assetOwnerWalletAddress: string) => {
    setStatusUpdate('loading');
    setError(null);
    try {
      const res = await api.put(`/assets/real-estate/${id}/toggle-status`, {
        assetOwnerWalletAddress
      });
      setStatusUpdate('success');
      toast.success('Asset status updated successfully');
      setAssetList((prev) =>
        prev.map((asset) => {
          if (asset._id === id) {
            return { ...asset, status };
          }
          return asset;
        })
      );
      return res.data.data;
    } catch (err: any) {
      setStatusUpdate('error');
      setError(
        err.response?.data?.message || err.message || 'Failed to update asset'
      );
      toast.error(
        err.response?.data?.message || err.message || 'Failed to update asset'
      );
      throw err;
    }
  };

  return {
    createAsset,
    getAsset,
    updateAsset,
    status,
    error,
    asset,
    isPending,
    assetList,
    pagination,
    getAssetList,
    assetOverview,
    getAssetOverview,
    updateAssetStatus,
    statusUpdate,
    setStatusUpdate
  };
};
