import api from "@/lib/httpClient";
import { DataList } from "@/types/SyncFee";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface RoleState {
  fee: DataList[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  fee: [],
  loading: false,
  error: null,
};

export const feeResponse = createAsyncThunk(
  "fee/feeResponse",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/percentage/property/${id}`);
      return {
        fee: response.data.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch fee"
      );
    }
  }
);

export const syncFee = createAsyncThunk(
  "fee/syncFee",
  async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/percentage/property_sync/${id}`);
      return {
        feeSync: response.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sync fee"
      );
    }
  }
);

export const updateFee = createAsyncThunk(
  "fee/updateFee",
  async (
    {
      project_id,
      item_id,
      status,
    }: { project_id: number; item_id: number; status: boolean },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(
        `/percentage/property/${project_id}/?property_id=${item_id}`,
        { status }
      );
      return {
        feeUpdate: response.data.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update fee"
      );
    }
  }
);





const roleSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(feeResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(feeResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.fee = action.payload.fee;
      })
      .addCase(feeResponse.rejected, (state, action) => {
        //   state.loading = false;
        //   state.error = action.payload as string;
      });
  },
});

export default roleSlice.reducer;
