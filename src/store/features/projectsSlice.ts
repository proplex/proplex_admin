

import api from "@/lib/httpClient";
import { ProjectType } from "@/types/project";
import { PaginationTypes } from "@/types/global";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { defaultPagination } from "@/constants/global";

interface ProjectsState {
  projects: any[];
  pagination: PaginationTypes;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  pagination: defaultPagination,
  loading: false,
  error: null,
};

// Async thunk to fetch projects with pagination
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/v2/admin/project?page=${page}&limit=${limit}`);
      return {
        projects: response.data.data,
        pagination: response.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

export const updatedBooking = createAsyncThunk(
  "projects/updatedBooking",
  async (
    { id, is_booking_amount_required }: { id: number; is_booking_amount_required: boolean },
    { rejectWithValue }
  ) => {
    try {
      await api.put(`/property/status/${id}`, { is_booking_amount_required });
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update booking amount"
      );
    }
  }
);

export const updateStatus = createAsyncThunk(
  "projects/updateStatus",
  async (
    { property_id, status }: { property_id: number; status: ProjectType["status"] },
    { rejectWithValue }
  ) => {
    try {
      await api.put(`/property/status/${property_id}`, { property_id,status });
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update project status"
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`project/${id}?mode=hard`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }
)

export const updateJoinStatus = createAsyncThunk(
  "projects/updateJoinStatus",
  async (
    { property_id, join_waitlist }: { property_id: number; join_waitlist: boolean },
    { rejectWithValue }
  ) => {
    try {
      await api.put(`/property/status/${property_id}`, { join_waitlist });
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update join waitlist status"
      );
    }
  }

);



const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
