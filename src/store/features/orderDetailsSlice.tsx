

import api from '@/lib/httpClient';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: any = {
  orderDetail: {},
  loading: false,
  status: 'pending',
  investment_deadline_time: '',
  cover_image_pdf: null,
  error: null,
};

export const fetchOrderDetails = createAsyncThunk(
  'orderDetails/fetchOrdersDetails',
  async ({ order_id }: { order_id: string }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/order/${order_id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);

export const updateStatus = createAsyncThunk(
  'updateStatus/fetchUpdateStatus',
  async (
    { order_id, status }: { order_id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      // Make sure to include the status in the request body
      const response = await api.put(`/order/status`, { order_id, status }); // Sending status in the request body
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Error');
    }
  }
);

export const postFile = createAsyncThunk(
  'file/postFile',
  async (
    { file, order_id }: { file: File; order_id: string },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('cover_image_legal', file);

      const response = await api.post(
        `/order/addCoverImageOrder/${order_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      ); // Inspect the response

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'File upload failed'
      );
    }
  }
);
export const postOrderTime = createAsyncThunk(
  'orderDetails/postOrderTime',
  async (
    {
      order_id,
      investment_deadline_time,
    }: { order_id: any; investment_deadline_time: string },
    { rejectWithValue }
  ) => {
    try {
      // Send the POST request with all the necessary data
      const response = await api.post(
        `/order/update-order-time-status/${order_id}`,
        {
          investment_deadline_time,
        }
      );
      return response.data.data; // Return the response data on success
    } catch (error) {
      return rejectWithValue('Error updating the order time');
    }
  }
);

export const postDocument = createAsyncThunk(
  'orderDetails/postOrderTime',
  async (
    {
      order_id,
      document_sign_time,
    }: { order_id: any; document_sign_time: string },
    { rejectWithValue }
  ) => {
    try {
      // Send the POST request with all the necessary data
      const response = await api.post(
        `/order/update-order-time-status/${order_id}`,
        {
          document_sign_time,
        }
      );
      return response.data.data; // Return the response data on success
    } catch (error) {
      return rejectWithValue('Error updating the order time');
    }
  }
);
export const postPayment = createAsyncThunk(
  'payment/Postpayment',
  async (
    { order_id, payment_time }: { order_id: any; payment_time: string },
    { rejectWithValue }
  ) => {
    try {
      // Send the POST request with all the necessary data
      const response = await api.post(
        `/order/update-order-time-status/${order_id}`,
        {
          payment_time,
        }
      );
      return response.data.data; // Return the response data on success
    } catch (error) {
      return rejectWithValue('Error updating the order time');
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        //   state.error = action.payload;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.status = action.payload.status; // Update the status after API call
      })
      .addCase(updateStatus.rejected, (state) => {
        state.error = ''; // Reset status on error
      })
      .addCase(postFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFile.fulfilled, (state, action) => {
        state.cover_image_pdf = action.payload.cover_image_pdf;
      })
      .addCase(postFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postOrderTime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postOrderTime.fulfilled, (state, action) => {
        state.loading = false;
        state.investment_deadline_time =
          action.payload.investment_deadline_time; // Update the status after API call
      });

    //   .addCase(fetchOrderReport.pending, (state) => {
  },
});
export default orderDetailsSlice.reducer;
