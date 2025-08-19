
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/httpClient";
import { PaginationTypes } from "@/types/global";
import { defaultPagination } from "@/constants/global";

interface FilterOptions {
  kyc?: string | null;
  wallet?: string | null;
  role?: string | number | null;
  from_date: string;
  to_date: string;
}

interface UsersState {
  customer: any[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  customer: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/users/filter?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user list"
      );
    }
  }
);

export const fetchUsersFilter = createAsyncThunk(
  "users/fetchUsersFilter",
  async (
    {
      filter,
      page = 1,
      limit = 10,
    }: { filter: FilterOptions; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams({
        kyc: filter.kyc || "",
        wallet: filter.wallet || "",
        role: filter.role?.toString() || "",
        from_date: filter.from_date,
        to_date: filter.to_date,
        page: page.toString(), // Include pagination parameters in query
        limit: limit.toString(),
      }).toString();

      const response = await api.get(`/users/filter?${query}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user list"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data;
        ;

        state.pagination = action.payload.pagination || defaultPagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUsersFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsersFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload.data || [];
        state.pagination = action.payload.pagination || defaultPagination;
      })
      .addCase(fetchUsersFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default usersSlice.reducer;
