

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/httpClient";

interface PercentagesState {
  settingFeePercentages: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PercentagesState = {
  settingFeePercentages: [],
  loading: false,
  error: null,
};

export const fetchPercentages = createAsyncThunk(
  "percentages/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/percentage/all`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch percentages"
      );
    }
  }
);

const percentagesSlice = createSlice({
  name: "percentages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPercentages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPercentages.fulfilled, (state, action) => {
        state.loading = false;
        state.settingFeePercentages = action.payload;
      })
      .addCase(fetchPercentages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default percentagesSlice.reducer;
