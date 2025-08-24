import { useState, useCallback, useMemo } from 'react';

interface SearchFilterState<T> {
  searchTerm: string;
  filters: Partial<Record<keyof T, any>>;
  sortBy: keyof T | null;
  sortOrder: 'asc' | 'desc';
}

interface UseSearchFilterProps<T> {
  initialSearchTerm?: string;
  initialFilters?: Partial<Record<keyof T, any>>;
  initialSortBy?: keyof T | null;
  initialSortOrder?: 'asc' | 'desc';
}

const useSearchFilter = <T extends Record<string, any>>({
  initialSearchTerm = '',
  initialFilters = {},
  initialSortBy = null,
  initialSortOrder = 'asc',
}: UseSearchFilterProps<T> = {}) => {
  const [searchFilterState, setSearchFilterState] = useState<SearchFilterState<T>>({
    searchTerm: initialSearchTerm,
    filters: initialFilters,
    sortBy: initialSortBy,
    sortOrder: initialSortOrder,
  });

  const setSearchTerm = useCallback((term: string) => {
    setSearchFilterState((prev) => ({
      ...prev,
      searchTerm: term,
    }));
  }, []);

  const setFilter = useCallback((key: keyof T, value: any) => {
    setSearchFilterState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        [key]: value,
      },
    }));
  }, []);

  const setFilters = useCallback((filters: Partial<Record<keyof T, any>>) => {
    setSearchFilterState((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters,
      },
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setSearchFilterState((prev) => ({
      ...prev,
      filters: {},
    }));
  }, []);

  const setSort = useCallback((sortBy: keyof T | null, sortOrder: 'asc' | 'desc' = 'asc') => {
    setSearchFilterState((prev) => ({
      ...prev,
      sortBy,
      sortOrder,
    }));
  }, []);

  const clearSort = useCallback(() => {
    setSearchFilterState((prev) => ({
      ...prev,
      sortBy: null,
      sortOrder: 'asc',
    }));
  }, []);

  const resetSearchFilter = useCallback(() => {
    setSearchFilterState({
      searchTerm: initialSearchTerm,
      filters: initialFilters,
      sortBy: initialSortBy,
      sortOrder: initialSortOrder,
    });
  }, [initialSearchTerm, initialFilters, initialSortBy, initialSortOrder]);

  // Memoized filtered and sorted data
  const applyFilters = useCallback(
    (data: T[]): T[] => {
      let filteredData = [...data];

      // Apply search term
      if (searchFilterState.searchTerm) {
        const term = searchFilterState.searchTerm.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(term)
          )
        );
      }

      // Apply filters
      Object.entries(searchFilterState.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          filteredData = filteredData.filter((item) => {
            const itemValue = item[key as keyof T];
            if (Array.isArray(value)) {
              return Array.isArray(itemValue) 
                ? value.some(v => itemValue.includes(v))
                : value.includes(itemValue);
            }
            return itemValue === value;
          });
        }
      });

      // Apply sorting
      if (searchFilterState.sortBy) {
        filteredData.sort((a, b) => {
          const aVal = a[searchFilterState.sortBy!];
          const bVal = b[searchFilterState.sortBy!];
          
          if (aVal < bVal) {
            return searchFilterState.sortOrder === 'asc' ? -1 : 1;
          }
          if (aVal > bVal) {
            return searchFilterState.sortOrder === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      return filteredData;
    },
    [searchFilterState]
  );

  return {
    ...searchFilterState,
    setSearchTerm,
    setFilter,
    setFilters,
    clearFilters,
    setSort,
    clearSort,
    resetSearchFilter,
    applyFilters,
  };
};

export default useSearchFilter;