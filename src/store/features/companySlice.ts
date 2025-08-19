import api from "@/lib/httpClient";
import { PaginationTypes } from "@/types/global";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultPagination } from "@/constants/global";

interface companyState {
  company: any[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: companyState = {
  company: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};

export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/v2/company`,  {
        params: { page, limit },
      } );
      ;
      return {
        company: response.data.data,
        pagination: response.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee"
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
        // Implementation goes here
        const response = await api.put(`/company/${id}`, { status });
        return response.data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );




const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.company = action.payload.company;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companySlice.reducer;
