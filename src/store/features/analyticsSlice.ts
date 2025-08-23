import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/httpClient';

// Define types
export interface AnalyticsData {
  id: string;
  name: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  period: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface AnalyticsReport {
  id: string;
  title: string;
  data: ChartDataPoint[];
  type: 'line' | 'bar' | 'pie';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface AnalyticsState {
  metrics: AnalyticsData[];
  reports: AnalyticsReport[];
  selectedReport: AnalyticsReport | null;
  loading: boolean;
  error: string | null;
  dateRange: {
    start: string;
    end: string;
  };
}

// Initial state
const initialState: AnalyticsState = {
  metrics: [],
  reports: [],
  selectedReport: null,
  loading: false,
  error: null,
  dateRange: {
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
    end: new Date().toISOString(),
  },
};

// Async thunk to fetch analytics metrics
export const fetchAnalyticsMetrics = createAsyncThunk(
  'analytics/fetchMetrics',
  async (
    { start, end }: { start: string; end: string },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, any> = { start, end };
      const response = await api.get('/analytics/metrics', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch analytics metrics'
      );
    }
  }
);

// Async thunk to fetch analytics reports
export const fetchAnalyticsReports = createAsyncThunk(
  'analytics/fetchReports',
  async (
    { start, end, type }: { start: string; end: string; type?: string },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, any> = { start, end };
      if (type) params.type = type;
      const response = await api.get('/analytics/reports', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch analytics reports'
      );
    }
  }
);

// Async thunk to fetch a single report
export const fetchAnalyticsReport = createAsyncThunk(
  'analytics/fetchReport',
  async (reportId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/analytics/reports/${reportId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch analytics report'
      );
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    clearSelectedReport: (state) => {
      state.selectedReport = null;
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch metrics
      .addCase(fetchAnalyticsMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload.metrics || [];
      })
      .addCase(fetchAnalyticsMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch reports
      .addCase(fetchAnalyticsReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.reports || [];
      })
      .addCase(fetchAnalyticsReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single report
      .addCase(fetchAnalyticsReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsReport.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedReport = action.payload.report;
      })
      .addCase(fetchAnalyticsReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedReport, clearSelectedReport, setDateRange, clearError } = analyticsSlice.actions;
export default analyticsSlice.reducer;