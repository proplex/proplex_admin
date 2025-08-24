import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/httpClient';

// Define types
export interface Asset {
  id: number;
  name: string;
  type: string;
  status: string;
  value: number;
  createdAt: string;
  updatedAt: string;
}

interface AssetManagementState {
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
}

// Initial state
const initialState: AssetManagementState = {
  assets: [],
  selectedAsset: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
};

// Async thunk to fetch assets
export const fetchAssets = createAsyncThunk(
  'assetManagement/fetchAssets',
  async (
    { page = 1, limit = 10, search = '' }: { page: number; limit: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, any> = { page, limit };
      if (search) params.search = search;
      
      const response = await api.get('/assets', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch assets'
      );
    }
  }
);

// Async thunk to fetch a single asset
export const fetchAsset = createAsyncThunk(
  'assetManagement/fetchAsset',
  async (assetId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/assets/${assetId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch asset'
      );
    }
  }
);

// Async thunk to create an asset
export const createAsset = createAsyncThunk(
  'assetManagement/createAsset',
  async (assetData: Partial<Asset>, { rejectWithValue }) => {
    try {
      const response = await api.post('/assets', assetData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create asset'
      );
    }
  }
);

// Async thunk to update an asset
export const updateAsset = createAsyncThunk(
  'assetManagement/updateAsset',
  async ({ id, ...assetData }: Partial<Asset> & { id: number }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/assets/${id}`, assetData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update asset'
      );
    }
  }
);

// Async thunk to delete an asset
export const deleteAsset = createAsyncThunk(
  'assetManagement/deleteAsset',
  async (assetId: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/assets/${assetId}`);
      return { ...response.data, id: assetId };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete asset'
      );
    }
  }
);

const assetManagementSlice = createSlice({
  name: 'assetManagement',
  initialState,
  reducers: {
    setSelectedAsset: (state, action) => {
      state.selectedAsset = action.payload;
    },
    clearSelectedAsset: (state) => {
      state.selectedAsset = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch assets
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          pageSize: action.payload.pagination.pageSize,
          totalItems: action.payload.pagination.totalItems,
          totalPages: action.payload.pagination.totalPages,
        };
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single asset
      .addCase(fetchAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAsset = action.payload.data;
      })
      .addCase(fetchAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create asset
      .addCase(createAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.assets.push(action.payload.data);
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update asset
      .addCase(updateAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.assets.findIndex(
          (asset) => asset.id === action.payload.data.id
        );
        if (index !== -1) {
          state.assets[index] = action.payload.data;
        }
        if (state.selectedAsset && state.selectedAsset.id === action.payload.data.id) {
          state.selectedAsset = action.payload.data;
        }
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete asset
      .addCase(deleteAsset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = state.assets.filter((asset) => asset.id !== action.payload.id);
        if (state.selectedAsset && state.selectedAsset.id === action.payload.id) {
          state.selectedAsset = null;
        }
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedAsset, clearSelectedAsset, clearError } = assetManagementSlice.actions;
export default assetManagementSlice.reducer;