import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setThemeMode,
  setColorScheme,
  toggleSidebar,
  setSidebarCollapsed,
  toggleNotifications,
  setNotificationsEnabled,
  resetTheme,
} from '@/store/features/themeSlice';
import { ThemeMode, ColorScheme } from '@/store/features/themeSlice';

interface UseThemeReturn {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  sidebarCollapsed: boolean;
  notificationsEnabled: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleNotifications: () => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  resetTheme: () => void;
}

const useTheme = (): UseThemeReturn => {
  const dispatch = useAppDispatch();
  const { mode, colorScheme, sidebarCollapsed, notificationsEnabled } = useAppSelector(
    (state) => state.theme
  );

  const handleSetThemeMode = useCallback(
    (mode: ThemeMode) => {
      dispatch(setThemeMode(mode));
    },
    [dispatch]
  );

  const handleSetColorScheme = useCallback(
    (scheme: ColorScheme) => {
      dispatch(setColorScheme(scheme));
    },
    [dispatch]
  );

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  const handleSetSidebarCollapsed = useCallback(
    (collapsed: boolean) => {
      dispatch(setSidebarCollapsed(collapsed));
    },
    [dispatch]
  );

  const handleToggleNotifications = useCallback(() => {
    dispatch(toggleNotifications());
  }, [dispatch]);

  const handleSetNotificationsEnabled = useCallback(
    (enabled: boolean) => {
      dispatch(setNotificationsEnabled(enabled));
    },
    [dispatch]
  );

  const handleResetTheme = useCallback(() => {
    dispatch(resetTheme());
  }, [dispatch]);

  return {
    mode,
    colorScheme,
    sidebarCollapsed,
    notificationsEnabled,
    setThemeMode: handleSetThemeMode,
    setColorScheme: handleSetColorScheme,
    toggleSidebar: handleToggleSidebar,
    setSidebarCollapsed: handleSetSidebarCollapsed,
    toggleNotifications: handleToggleNotifications,
    setNotificationsEnabled: handleSetNotificationsEnabled,
    resetTheme: handleResetTheme,
  };
};

export default useTheme;