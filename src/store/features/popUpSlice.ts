import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/httpClient';
import { defaultPagination } from '@/constants/global';
import { PaginationTypes } from '@/types/global';

interface PopupText {
  id: number;
  type: string;
  subtitle: string;
  description: string;
}

interface PopupTextState {
  popupTexts: PopupText[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: PopupTextState = {
  popupTexts: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};

export const fetchPopupTexts = createAsyncThunk(
  'popupText/fetchPopupTexts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/config/popuptext');
      return {
        popupTexts: response.data.data,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch popup texts');
    }
  }
);

export const createPopupText = createAsyncThunk(
  'popupText/createPopupText',
  async (data: Omit<PopupText, 'id'>, { rejectWithValue }) => {
    try {
      const response = await api.post('/config/popuptext', data);
      return response.data; // Return the response data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create popup text');
    }
  }
);


export const deletePopUpText = createAsyncThunk(
  "popupText/deletePopUpText",
  async(id: number,{rejectWithValue}) => {
    try{
      const response = await api.delete(`/config/popuptext/${id}`);
      return response.data; // Return the response data
    }
    catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete popup text');
    }
  }
)


const popupTextSlice = createSlice({
  name: 'popupText',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopupTexts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopupTexts.fulfilled, (state, action) => {
        ; 
        state.loading = false;
        state.popupTexts = Array.isArray(action.payload.popupTexts)
          ? action.payload.popupTexts
          : []; 
      })
      .addCase(fetchPopupTexts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createPopupText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPopupText.fulfilled, (state, action) => {
        state.loading = false;
        state.popupTexts.push(action.payload); 
      })
      .addCase(createPopupText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePopUpText.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePopUpText.fulfilled, (state, action) => {
        state.loading = false;
        state.popupTexts = state.popupTexts.filter((popupText) => popupText.id!== action.payload.id);
      })
      .addCase(deletePopUpText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default popupTextSlice.reducer;