import { createSlice } from '@reduxjs/toolkit';

// Define types
export type ThemeMode = 'light' | 'dark' | 'system';
export type ColorScheme = 'blue' | 'green' | 'purple' | 'red';

interface ThemeState {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  sidebarCollapsed: boolean;
  notificationsEnabled: boolean;
}

// Initial state
const initialState: ThemeState = {
  mode: 'light',
  colorScheme: 'blue',
  sidebarCollapsed: false,
  notificationsEnabled: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
    },
    setColorScheme: (state, action) => {
      state.colorScheme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = action.payload;
    },
    resetTheme: (state) => {
      state.mode = 'light';
      state.colorScheme = 'blue';
      state.sidebarCollapsed = false;
      state.notificationsEnabled = true;
    },
  },
});

export const {
  setThemeMode,
  setColorScheme,
  toggleSidebar,
  setSidebarCollapsed,
  toggleNotifications,
  setNotificationsEnabled,
  resetTheme,
} = themeSlice.actions;

export default themeSlice.reducer;