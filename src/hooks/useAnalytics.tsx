import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchAnalyticsMetrics,
  fetchAnalyticsReports,
  fetchAnalyticsReport,
  setSelectedReport,
  clearSelectedReport,
  setDateRange,
  clearError,
} from '@/store/features/analyticsSlice';

interface UseAnalyticsReturn {
  metrics: any[];
  reports: any[];
  selectedReport: any | null;
  loading: boolean;
  error: string | null;
  dateRange: {
    start: string;
    end: string;
  };
  fetchAnalyticsMetrics: (params: { start: string; end: string }) => void;
  fetchAnalyticsReports: (params: { start: string; end: string; type?: string }) => void;
  fetchAnalyticsReport: (reportId: string) => void;
  setSelectedReport: (report: any | null) => void;
  clearSelectedReport: () => void;
  setDateRange: (range: { start: string; end: string }) => void;
  clearError: () => void;
}

const useAnalytics = (): UseAnalyticsReturn => {
  const dispatch = useAppDispatch();
  const { metrics, reports, selectedReport, loading, error, dateRange } = useAppSelector(
    (state) => state.analytics
  );

  const handleFetchAnalyticsMetrics = useCallback(
    (params: { start: string; end: string }) => {
      dispatch(fetchAnalyticsMetrics(params));
    },
    [dispatch]
  );

  const handleFetchAnalyticsReports = useCallback(
    (params: { start: string; end: string; type?: string }) => {
      dispatch(fetchAnalyticsReports(params));
    },
    [dispatch]
  );

  const handleFetchAnalyticsReport = useCallback(
    (reportId: string) => {
      dispatch(fetchAnalyticsReport(reportId));
    },
    [dispatch]
  );

  const handleSetSelectedReport = useCallback(
    (report: any | null) => {
      dispatch(setSelectedReport(report));
    },
    [dispatch]
  );

  const handleClearSelectedReport = useCallback(() => {
    dispatch(clearSelectedReport());
  }, [dispatch]);

  const handleSetDateRange = useCallback(
    (range: { start: string; end: string }) => {
      dispatch(setDateRange(range));
    },
    [dispatch]
  );

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    metrics,
    reports,
    selectedReport,
    loading,
    error,
    dateRange,
    fetchAnalyticsMetrics: handleFetchAnalyticsMetrics,
    fetchAnalyticsReports: handleFetchAnalyticsReports,
    fetchAnalyticsReport: handleFetchAnalyticsReport,
    setSelectedReport: handleSetSelectedReport,
    clearSelectedReport: handleClearSelectedReport,
    setDateRange: handleSetDateRange,
    clearError: handleClearError,
  };
};

export default useAnalytics;