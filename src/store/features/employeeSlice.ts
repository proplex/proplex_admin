import { defaultPagination } from "@/constants/global";
import api from "@/lib/httpClient";
import { EmployeeTypes } from "@/types/employeeList";
import { PaginationTypes } from "@/types/global";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface EmployeeState {
  employee: EmployeeTypes[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employee: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};

// Async thunk to fetch employee with pagination
export const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/v2/admin/employee?page=${page}&limit=${limit}`);
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

// Async thunk to post a new employee
export const postEmployee = createAsyncThunk(
  "employee/postEmployee",
  async (
    employeeData: {
      name: string;
      email: string;
      work_email: string;
      country_code: string;
      phone: string;
      whatsapp_no: string;
      role: string;
      status: string;
      join_date: string;
      language: string;
      meeting_link: string;
      address: string;
      avatar:string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/employee", employeeData);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to post employee");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "delete/deleteEmployee",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`employee/${id}`);
      return response.data.data;
    } catch (error) {
    }
  }
);





const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload.employee;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload.employee;
      })
      .addCase(postEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as any;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = state.employee.filter(
          (employee) => employee.id !== action.payload.id
        );
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default employeeSlice.reducer;
