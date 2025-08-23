import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchAssets,
  fetchAsset,
  createAsset,
  updateAsset,
  deleteAsset,
  setSelectedAsset,
  clearSelectedAsset,
  clearError,
} from '@/store/features/assetManagementSlice';
import { Asset } from '@/types/global';

interface UseAssetManagementReturn {
  assets: Asset[];
  selectedAsset: Asset | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  fetchAssets: (params: { page: number; limit: number; search?: string }) => void;
  fetchAsset: (assetId: number) => void;
  createAsset: (assetData: Partial<Asset>) => void;
  updateAsset: (assetData: Partial<Asset> & { id: number }) => void;
  deleteAsset: (assetId: number) => void;
  setSelectedAsset: (asset: Asset | null) => void;
  clearSelectedAsset: () => void;
  clearError: () => void;
}

const useAssetManagement = (): UseAssetManagementReturn => {
  const dispatch = useAppDispatch();
  const { assets, selectedAsset, loading, error, pagination } = useAppSelector(
    (state) => state.assetManagement
  );

  const handleFetchAssets = useCallback(
    (params: { page: number; limit: number; search?: string }) => {
      dispatch(fetchAssets(params));
    },
    [dispatch]
  );

  const handleFetchAsset = useCallback(
    (assetId: number) => {
      dispatch(fetchAsset(assetId));
    },
    [dispatch]
  );

  const handleCreateAsset = useCallback(
    (assetData: Partial<Asset>) => {
      dispatch(createAsset(assetData));
    },
    [dispatch]
  );

  const handleUpdateAsset = useCallback(
    (assetData: Partial<Asset> & { id: number }) => {
      dispatch(updateAsset(assetData));
    },
    [dispatch]
  );

  const handleDeleteAsset = useCallback(
    (assetId: number) => {
      dispatch(deleteAsset(assetId));
    },
    [dispatch]
  );

  const handleSetSelectedAsset = useCallback(
    (asset: Asset | null) => {
      dispatch(setSelectedAsset(asset));
    },
    [dispatch]
  );

  const handleClearSelectedAsset = useCallback(() => {
    dispatch(clearSelectedAsset());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    assets,
    selectedAsset,
    loading,
    error,
    pagination,
    fetchAssets: handleFetchAssets,
    fetchAsset: handleFetchAsset,
    createAsset: handleCreateAsset,
    updateAsset: handleUpdateAsset,
    deleteAsset: handleDeleteAsset,
    setSelectedAsset: handleSetSelectedAsset,
    clearSelectedAsset: handleClearSelectedAsset,
    clearError: handleClearError,
  };
};

export default useAssetManagement;