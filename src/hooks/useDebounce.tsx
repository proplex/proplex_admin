

import { useState, useEffect } from 'react';

/**
 * useDebounce
 * Returns a debounced value that updates after a delay.
 *
 * @param value The value to debounce
 * @param delay The debounce delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timeout if value or delay changes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
