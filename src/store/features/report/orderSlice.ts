import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/httpClient";
import { PaginationTypes } from "@/types/global";
import { defaultPagination } from "@/constants/global";

interface OrderState {
  orderUsers: any[];
  pagination: PaginationTypes;
  orderProperties: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderUsers: [],
  pagination: defaultPagination,
  orderProperties: [],
  loading: false,
  error: null,
};

// Fetch orders with pagination (page and limit)
export const fetchOrderFilterData = createAsyncThunk(
  "orders/fetchOrderFilterData",
  async (
    {
      page = 1,
      limit = 10,
      user_id,
      property_id,
      status,
      from_date,
      to_date,
    }: {
      page?: number;
      limit?: number;
      user_id?: string;
      property_id?: string;
      status?: string;
      from_date?: string;
      to_date?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(
        `order/report?page=${page}&limit=${limit}` +
        (user_id ? `&user_id=${user_id}` : "") +
        (property_id ? `&property_id=${property_id}` : "") +
        (status ? `&status=${status}` : "") +
        (from_date ? `&from_date=${from_date}` : "") +
        (to_date ? `&to_date=${to_date}` : "")
      );
      
      return {
        order: response.data.data,
        pagination: response.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch order data"
      );
    }
  }
);

export const fetchOrdersReport =createAsyncThunk(
  "ordersreport/fetchOrdersReport",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    
    { rejectWithValue }
  
  ) => {
    try {
      const response = await api.get(`order/report?=${page}&limit=${limit}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch order report data"
      );
    }
  }
)

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Reset order data (optional reducer)
    resetOrders(state) {
      state.orderUsers = [];
      state.pagination = defaultPagination;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrdersReport.pending,(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchOrdersReport.fulfilled,(state, action) => {
      state.loading = false;
      state.orderProperties = action.payload;
      ;
    })
    .addCase(fetchOrdersReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })






      .addCase(fetchOrderFilterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderFilterData.fulfilled, (state, action) => {
        state.loading = false;
        ;
        state.orderUsers = action.payload.order;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchOrderFilterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrders } = orderSlice.actions;

export default orderSlice.reducer;
