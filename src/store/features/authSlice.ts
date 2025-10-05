import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define types for the response data
interface UserData {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
}

interface AuthState {
  user: UserData | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Define the initial state
const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Mock login function - replace with your actual authentication logic
export const login = createAsyncThunk<
  { user: UserData },
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    // Replace this with your actual authentication API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message || 'Login failed');
    }

    return await response.json();
  } catch (error) {
    return rejectWithValue('Network error occurred');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  // Add any cleanup or API call for logout if needed
  return {};
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      })
      // Handle logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default authSlice.reducer;