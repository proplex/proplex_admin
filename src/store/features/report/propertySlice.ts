import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/httpClient";
import { PaginationTypes } from "@/types/global";
import moment from "moment";
import { defaultPagination } from "@/constants/global";

interface PropertyFilter {
  from_date?: string | null;
  to_date?: string | null;
  status?: string | null;
  dao?: string | null;
  project?: string | null;
}

interface PropertyState {
  properties: any[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  properties: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};


export const fetchProperty = createAsyncThunk(
  "fetchProperty/fetchProperty",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    ;
    try {
      const response = await api.get(`/property/filter?=${page}&limit=${limit}`);
      return {
        employee: response.data.data,
        pagination: response.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee"
      );
    }
  }
);



export const fetchPropertyListFilter = createAsyncThunk(
  "properties/fetchPropertyListFilter",
  async (
    {
      filter,
      page = 1,
      limit = 10,
    }: { filter: PropertyFilter; page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      const formattedFromDate = filter.from_date
        ? moment(filter.from_date).format("YYYY-MM-DD")
        : "";
      const formattedToDate = filter.to_date
        ? moment(filter.to_date).format("YYYY-MM-DD")
        : "";

      const query = new URLSearchParams({
        status: filter.status || "",
        dao: filter.dao || "",
        type: filter.project || "",
        from_date: formattedFromDate,
        to_date: formattedToDate,
      }).toString();

      const response = await api.get(`/property/filter?${query}`, {
        params: { page, limit },
      });

      return {
        properties: response.data.data,
        pagination: response.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch property list"
      );
    }
  }
);

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     .addCase(fetchProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.employee; // Update properties with the API data
        state.pagination = action.payload.pagination; // Set pagination from API response
        })
        .addCase(fetchProperty.rejected, (state, action) => {
          state.loading = false ;
        })
      .addCase(fetchPropertyListFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyListFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload.properties; // Update properties with the API data
        state.pagination = action.payload.pagination; // Set pagination from API response
    })    
      .addCase(fetchPropertyListFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertySlice.reducer;
