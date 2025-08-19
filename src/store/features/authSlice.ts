
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define types for the response data
interface AuthData {
  phone: string;
  otpExpireAt: string;
  user_id?: number;
}

interface RegisterData {
  user_id: string;
  phone: string;
  countryCode: string;
  name: string;
  email: string;
}

interface AuthState {
  user: AuthData | null;
  otpExpireAt: string | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  verified: boolean; // Added to track OTP verification status
  registerSuccess: boolean; // Added to track registration status
}

// Define the initial state based on the above type
const initialState: AuthState = {
  user: null,
  otpExpireAt: null,
  isLoading: false,
  error: null,
  successMessage: null,
  verified: false, // Set initial verified state to false
  registerSuccess: false, // Initially, the registration is not successful
};

// Async thunk to handle the login API request (send OTP)
export const sendOtp = createAsyncThunk<
  { message: string; data: AuthData },
  { phone: string; country_code: string },
  { rejectValue: string }
>('auth/sendOtp', async ({ phone, country_code }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://api.fandora.app/api/auth/login',
      { phone, country_code }
    );
    if (response.status === 200 || response.status === 201) {
      return response.data; // Return the successful response
    } else {
      return rejectWithValue(response.data.message); // Return error message if the request fails
    }
  } catch (error) {
    return rejectWithValue('An error occurred. Please try again.'); // Handle any network errors
  }
});

// Async thunk to handle the resend OTP API request
export const resendOtp = createAsyncThunk<
  { message: string; data: AuthData },
  { phone: string },
  { rejectValue: string }
>('auth/resendOtp', async ({ phone }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://api.fandora.app/api/auth/resend',
      { phone }
    );
    if (response.status === 200 || response.status === 201) {
      return response.data; // Return the successful response
    } else {
      return rejectWithValue(response.data.message); // Return error message if the request fails
    }
  } catch (error) {
    return rejectWithValue('An error occurred. Please try again.'); // Handle any network errors
  }
});

// Async thunk to handle the verify OTP API request
export const verifyOtp = createAsyncThunk<
  { message: string },
  { otp: string; user_id: number },
  { rejectValue: string }
>('auth/verifyOtp', async ({ otp, user_id }, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      'https://api.fandora.app/api/auth/verify',
      {
        otp,
        user_id,
      }
    );
    if (response.status === 200 || response.status === 201) {
      localStorage.setItem('authToken', response.data.data.token);
      return response.data;
    } else {
      return rejectWithValue(response.data.message); // Return error message if the request fails
    }
  } catch (error) {
    return rejectWithValue('An error occurred. Please try again.'); // Handle any network errors
  }
});

// Async thunk to handle the register API request
export const registerUser = createAsyncThunk<
  { message: string; data: RegisterData },
  { phone: string; country_code: string; name: string; email: string },
  { rejectValue: string }
>(
  'auth/registerUser',
  async ({ phone, country_code, name, email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'https://api.fandora.app/api/auth/register',
        {
          phone,
          country_code,
          name,
          email,
        }
      );
      if (response.status === 200 || response.status === 201) {
        return response.data; // Return the successful response
      } else {
        return rejectWithValue(response.data.message); // Return error message if the request fails
      }
    } catch (error) {
      return rejectWithValue('An error occurred. Please try again.'); // Handle any network errors
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle sendOtp action
      .addCase(sendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        sendOtp.fulfilled,
        (state, action: PayloadAction<{ message: string; data: AuthData }>) => {
          state.isLoading = false;
          state.user = action.payload.data;
          state.otpExpireAt = action.payload.data.otpExpireAt;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle resendOtp action
      .addCase(resendOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        resendOtp.fulfilled,
        (state, action: PayloadAction<{ message: string; data: AuthData }>) => {
          state.isLoading = false;
          state.user = action.payload.data;
          state.otpExpireAt = action.payload.data.otpExpireAt;
          state.successMessage = action.payload.message;
        }
      )
      .addCase(resendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle verifyOtp action
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        verifyOtp.fulfilled,
        (state, action: PayloadAction<{ message: string }>) => {
          state.isLoading = false;
          state.successMessage = action.payload.message;
          state.verified = true; // Update verification status to true
        }
      )
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // Handle registerUser action
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.registerSuccess = false;
      })
      .addCase(
        registerUser.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; data: RegisterData }>
        ) => {
          state.isLoading = false;
          state.successMessage = action.payload.message;
          state.registerSuccess = true;
          state.user = {
            ...action.payload.data,
            user_id: Number(action.payload.data.user_id),
            otpExpireAt: new Date().toISOString(),
          };
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.registerSuccess = false; // Ensure register success is false on failure
      });
  },
});

export default authSlice.reducer;
