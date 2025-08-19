import { defaultPagination } from "@/constants/global";
import api from "@/lib/httpClient";
import { feemanagementtypes, ResponseData } from "@/types/feemanagment";
import { PaginationTypes } from "@/types/global";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state type
interface feeState {
  feemanagement: feemanagementtypes[];
  pagination: PaginationTypes;
  permission: feemanagementtypes[];
  loading: boolean;
  error: string | null;
}

const initialState: feeState = {
  feemanagement: [],
  pagination: defaultPagination,
  permission: [],
  loading: false,
  error: null,
};

// Fetch fee async thunk
export const fetchfee = createAsyncThunk<
  {
    fee: feemanagementtypes[];
    pagination: {
      totalItems: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
      hasMore: boolean;
    };
  },
  { page: number; limit: number }
>(
  "feemanagement/fetchfeemanagement",
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await api.get<ResponseData>("/percentage/all", {
        params: { page, limit },
      });
      return {
        fee: response.data.data || [],
        pagination: response.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fees"
      );
    }
  }
);

// Post fee async thunk
export const postFee = createAsyncThunk<
  { feemanagement: feemanagementtypes[] },
  {
    name: string;
    property_types: { value: string; label: string }[];
    FILM?: string;
    MUSIC?: string;
    BOOKS?: string;
    SPORTS?: string;
    WEBSERIES?: string;
    types: { value: string; label: string };
  }
>(
  "feemanagement/postFee",
  async (
    { name, property_types, types, FILM, MUSIC, BOOKS, SPORTS, WEBSERIES },
    { rejectWithValue }
  ) => {
    try {
      const body = {
        name,
        property_types,
        FILM,
        types,
        MUSIC,
        BOOKS,
        SPORTS,
        WEBSERIES,
      };

      const response = await api.post<ResponseData>("/percentage/", body);

      return {
        feemanagement: response.data.data,
        pagination: response.data.pager || defaultPagination,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create fee management entry"
      );
    }
  }
);

export const deleteFeeManagement = createAsyncThunk(
  "FeeManagement/deleteFeeManagement",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/percentage/${id}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete fee management entry"
      );
    }
  }
);

export const updateStatus = createAsyncThunk(
  "status/updateStatus",
  async (
    { id, status }: { id: number; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/percentage/${id}`, { status });
      response.data.data;
    } catch (error: any) {}
  }
);

const feemanagmenSlice = createSlice({
  name: "feemanagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchfee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchfee.fulfilled, (state, action) => {
        state.loading = false;
        state.feemanagement = action.payload.fee;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchfee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postFee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFee.fulfilled, (state, action) => {
        state.loading = false;
        state.feemanagement = action.payload.feemanagement;
      })
      .addCase(postFee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteFeeManagement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFeeManagement.fulfilled, (state, action) => {
        state.loading = false;
        state.feemanagement = state.feemanagement.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteFeeManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default feemanagmenSlice.reducer;
