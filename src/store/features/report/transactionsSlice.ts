import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/httpClient";

interface TransactionState {
  transctionFilter: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transctionFilter: [],
  loading: false,
  error: null,
};

// export const fetchTransaction = createAsyncThunk(
//   "transaction/fetchTransaction",
//   async (
//     { page = 1, limit = 10 }: { page: number; limit: number },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.get(
//         `/wallet/transactionsfilter?=${page}&limit=${limit}`
//       );
//       return {
//         employee: response.data.data,
//         // pagination: response.data.pager,
//       };
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch employee"
//       );
//     }
//   }
// );

export const fetchTransactionFilters = createAsyncThunk(
  "transactions/fetchTransactionFilters",
  async (
    {
      userId,
      type,
      status,
      fromDate,
      toDate,
    }: {
      userId?: string;
      type?: string;
      status?: string;
      fromDate: string;
      toDate: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get("/wallet/transactionsfilter", {
        params: {
          user_id: userId,
          type,
          status,
          from_date: fromDate,
          to_date: toDate,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch transactions"
      );
    }
  }
);


const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchTransaction.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchTransaction.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.transctionFilter = action.payload.employee || [];
      // })
      // .addCase(fetchTransaction.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })

      .addCase(fetchTransactionFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionFilters.fulfilled, (state, action) => {
        state.loading = false;
        ;
        state.transctionFilter = action.payload.data || [];
      })
      .addCase(fetchTransactionFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
