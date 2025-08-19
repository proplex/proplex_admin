
import api from '@/lib/httpClient';
import { RoleTypes } from '@/types/roles';
import { PermissionTypes } from '@/types/roles';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationTypes } from "@/types/global";
import { defaultPagination } from '@/constants/global';
interface RoleState {
 roles: RoleTypes[];
 pagination: PaginationTypes;
permission : PermissionTypes[],
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
    roles: [],
    pagination:defaultPagination,
    permission:[],
  loading: false,
  error: null,
};  

export const fetchRoles = createAsyncThunk(
  'roles/fetchRoles',
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    ;
    try {
      const response = await api.get(`/role`, { params: { page, limit } });
      return {
        roles: response.data.data,
        pagination: response.data.pager
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch order'
      );
    }
  }
);

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload.roles;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roleSlice.reducer;