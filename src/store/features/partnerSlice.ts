import api from '@/lib/httpClient';
import { PartnerTypes } from '@/types/partnet';
import { PaginationTypes } from "@/types/global";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { defaultPagination } from '@/constants/global';

interface ProjectsState {
  partners: PartnerTypes[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  partners: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};

// Abstracted error handling
const handleAsyncThunkError = (error: any, rejectWithValue: any) => {
  const message = error.response?.data?.message || 'An unexpected error occurred';
  return rejectWithValue(message);
};

// Async thunk to fetch partners with pagination
export const fetchPartners = createAsyncThunk(
  'partners/fetchPartners',
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get('/config/partner', {
        params: { page, limit },
      });
      return {
        partners: response.data.data,
        pagination: response.data.pager,
      };
    } catch (error) {
      return handleAsyncThunkError(error, rejectWithValue);
    }
  }
);

// Async thunk to add a new partner
export const postPartner = createAsyncThunk(
  'partners/postPartner',
  async (
    { name, icon }: { name: string; icon: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await api.post('/config/partner', { name, icon });
      // Dispatch fetchPartners to refresh the partner list
      dispatch(fetchPartners({ page: 1, limit: 10 })); // Adjust the page and limit as necessary
      return response.data; // Return just the new partner data, not pagination
    } catch (error) {
      return handleAsyncThunkError(error, rejectWithValue);
    }
  }
);

export const updatedPartner = createAsyncThunk(
  "partner/updatePartner",
  async (
    { id, name, icon }: {id:number,  name: string; icon: string },
    { dispatch, rejectWithValue }
  ) => {
    try{
          const response =  await api.put(`/config/partner/${id}`, {name: name,icon:icon});
            return response.data
    }
    catch (error) {
      return handleAsyncThunkError(error, rejectWithValue);
    }
  
  }
)





const partnerSlice = createSlice({
  name: 'partners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload.partners;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postPartner.fulfilled, (state) => {
        state.loading = false;
        // State already updated by fetchPartners after successful addition
      })
      .addCase(postPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default partnerSlice.reducer;