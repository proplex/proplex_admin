import { defaultDataStructure } from "@/constants/DefaultCustomerDetails";
import api from "@/lib/httpClient";
import { customerDetailType } from "@/types/customerDetail";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CustomerState {
  customerDetails: customerDetailType;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  customerDetails: defaultDataStructure,
  loading: false,
  error: null,
};

export const fetchCustomerDetails = createAsyncThunk(
  "customerDetails/fetchCustomerDetails",
  async ({ customerId }: { customerId: string }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/me/portfolioById/${customerId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

const customerDetailsSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.customerDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchCustomerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomerDetails.rejected, (state, action) => {
        //  state.error = action.payload;
        state.loading = false;
      });
  },
});

export default customerDetailsSlice.reducer;
