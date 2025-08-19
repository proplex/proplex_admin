// 

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "@/lib/httpClient";
// import { PaginationTypes } from "@/types/global";
// import moment from "moment";

// interface PropertyFilter {
//   from_date?: string | null;
//   to_date?: string | null;
//   status?: string | null;
//   dao?: string | null;
//   type?: string | null;
// }

// interface ReportState {
//   properties: any[];
//   customer: any[];
//   pagination: PaginationTypes;
//   orderUsers: any[];
//   orderProperties: any[];
//   transctionFiler: any[];
//   orderReport: any[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ReportState = {
//   properties: [],
//   customer: [],
//   pagination: {
//     totalItems: 0, 
//     currentPage: 1, 
//     pageSize: 10,
//     totalPages: 1,
//     hasMore: false,
//   },
//   orderUsers: [],
//   orderProperties: [],
//   transctionFiler: [],
//   orderReport: [],
//   loading: false,
//   error: null,
// };
// interface FilterOptions {
//   kyc?: string | null;
//   wallet?: string | null;
//   role?: string | number | null;
//   from_date: string;
//   to_date: string;
// }

// interface FetchUsersFilterOptions {
//   filter: FilterOptions;
// }

// export const fetchUsersFilter = createAsyncThunk(
//   "users/fetchUsersFilter",
//   async (options: FetchUsersFilterOptions, { rejectWithValue }) => {
//     try {
//       const { filter } = options;

//       const query = new URLSearchParams({
//         kyc: filter.kyc || "",
//         wallet: filter.wallet || "",
//         role: filter.role?.toString() || "",
//         from_date: filter.from_date,
//         to_date: filter.to_date,
//       }).toString();

//       const response = await api.get(`/users/filter?${query}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch user list"
//       );
//     }
//   }
// );
// export const fetchPropertyListFilter = createAsyncThunk(
//   "report/fetchPropertyListFilter",
//   async (options: { filter: PropertyFilter }, { rejectWithValue }) => {
//     try {
//       const { filter } = options;

//       const formattedFromDate = moment(filter.from_date).format("YYYY-MM-DD");
//       const formattedToDate = moment(filter.to_date).format("YYYY-MM-DD");

//       const query = new URLSearchParams({
//         status: filter.status || "",
//         dao: filter.dao || "",
//         type: filter.type || "",
//         from_date: formattedFromDate,
//         to_date: formattedToDate,
//       }).toString();

//       const response = await api.get(`/property/filter?${query}`);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch property list"
//       );
//     }
//   }
// );
// export const fetchOrderFilterData = createAsyncThunk(
//   "order/fetchOrderFilterData",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/order/filter");
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response ? error.response.data : "An error occurred"
//       );
//     }
//   }
// );
// export const fetchOrderReport = createAsyncThunk(
//   "orderReport/fetchOrderReport",
//   async (
//     params: {
//       user_id: string;
//       property_id: string;
//       status: string;
//       from_date: string;
//       to_date: string;
//     },
//     { rejectWithValue }
//   ) => {
//     const { user_id, property_id, status, from_date, to_date } = params;
//     try {
//       const response = await api.get("/order/report", {
//         params: { user_id, property_id, status, from_date, to_date },
//       });
//       return response.data.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response ? error.response.data : "An error occurred"
//       );
//     }
//   }
// );

// export const fetchTransactionFilters = createAsyncThunk(
//   "transactions/fetchTransactionFilters",
//   async (
//     {
//       userId,
//       type,
//       status,
//       fromDate,
//       toDate,
//     }: {
//       userId?: string;
//       type?: string;
//       status?: string;
//       fromDate: string;
//       toDate: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.get("/wallet/transactionsfilter", {
//         params: {
//           user_id: userId || "",
//           type: type || "",
//           status: status || "",
//           from_date: fromDate,
//           to_date: toDate,
//         },
//       });
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
// const reportSlice = createSlice({
//   name: "report",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPropertyListFilter.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPropertyListFilter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.properties = action.payload.data || [];
//       })
//       .addCase(fetchPropertyListFilter.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchUsersFilter.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchUsersFilter.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customer = action.payload.data || [];
//       })
//       .addCase(fetchUsersFilter.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchOrderFilterData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderFilterData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderUsers = action.payload.users || [];
//         state.orderProperties = action.payload.properties || [];
//       })
//       .addCase(fetchOrderFilterData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchTransactionFilters.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchTransactionFilters.fulfilled, (state, action) => {
//         state.loading = false;
//         state.transctionFiler = action.payload.data || [];
//       })
//       .addCase(fetchTransactionFilters.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(fetchOrderReport.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderReport.fulfilled, (state, action) => {
//         state.loading = false;
//         state.orderReport = action.payload || [];
//       })
//       .addCase(fetchOrderReport.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export default reportSlice.reducer;