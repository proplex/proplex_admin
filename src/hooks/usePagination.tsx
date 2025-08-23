import { useState, useCallback, useEffect } from 'react';

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  totalItems = 0,
}: UsePaginationProps = {}) => {
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: initialPage,
    pageSize: initialPageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / initialPageSize),
  });

  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems,
      totalPages: Math.ceil(totalItems / prev.pageSize),
    }));
  }, [totalItems]);

  const goToPage = useCallback((page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  }, []);

  const nextPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.min(prev.currentPage + 1, prev.totalPages),
    }));
  }, []);

  const previousPage = useCallback(() => {
    setPagination((prev) => ({
      ...prev,
      currentPage: Math.max(prev.currentPage - 1, 1),
    }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setPagination((prev) => {
      const newTotalPages = Math.ceil(prev.totalItems / pageSize);
      return {
        currentPage: Math.max(1, Math.min(prev.currentPage, newTotalPages)),
        pageSize,
        totalItems: prev.totalItems,
        totalPages: newTotalPages,
      };
    });
  }, []);

  const setTotalItems = useCallback((totalItems: number) => {
    setPagination((prev) => {
      const newTotalPages = Math.ceil(totalItems / prev.pageSize);
      return {
        ...prev,
        totalItems,
        totalPages: newTotalPages,
        currentPage: Math.max(1, Math.min(prev.currentPage, newTotalPages)),
      };
    });
  }, []);

  const resetPagination = useCallback(() => {
    setPagination({
      currentPage: initialPage,
      pageSize: initialPageSize,
      totalItems,
      totalPages: Math.ceil(totalItems / initialPageSize),
    });
  }, [initialPage, initialPageSize, totalItems]);

  return {
    ...pagination,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    setTotalItems,
    resetPagination,
  };
};

export default usePagination;