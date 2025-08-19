import api from '@/lib/httpClient';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PaginationTypes } from "@/types/global";
import { defaultPagination } from '@/constants/global';
import { link } from 'fs';

interface LinkType {
  id:number,
  type: string;
  description: string;
  link: string;
}

interface LinkState {
  link: LinkType[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: LinkState = {
  link: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};

const handleAsyncThunkError = (error: any, rejectWithValue: any) => {
  const message = error.response?.data?.message || 'An unexpected error occurred';
  return rejectWithValue(message);
};
 
export const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (
   _, { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/config/videolink`,{
       
      })
      return { 
        link: response.data.data, 
        pagination: response.data.pager,
      };
     
    } catch (error) {
      return handleAsyncThunkError(error, rejectWithValue);
    }
  }
);

export const addVideoLink = createAsyncThunk(
  "video/addVideoLink",
  async (videoData: Omit<LinkType, 'id'>, { rejectWithValue }) => {
    try {
      // Send only the necessary data, without the id
      const response = await api.post('/config/videoLink', videoData);
      return response.data; // Return the response data (without id if not needed)
    } catch (error) {
      return handleAsyncThunkError(error, rejectWithValue);
    }
  }
);


export const removeVideoLink = createAsyncThunk(
    "removeVideo/removeVideoLink",
    async (videoId: number, { rejectWithValue }) => {
     try {
      const response = await api.delete(`/config/videoLink/${videoId}`);
      
      return response.data;
    }
    catch (error) {
      return handleAsyncThunkError(error, rejectWithValue);
    }
  }
);



const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.link = action.payload.link.rows;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addVideoLink.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideoLink.fulfilled, (state, action) => {
        state.loading = false;
        state.link.push(action.payload);
        // Note: You might want to update pagination here if necessary
      })
      .addCase(addVideoLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});






export default videoSlice.reducer;