import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabaseClient';

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
    // Using Supabase for authentication
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: `${country_code}${phone}`,
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    // Return success response
    return {
      message: 'OTP sent successfully',
      data: {
        phone: `${country_code}${phone}`,
        otpExpireAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
      }
    };
  } catch (error) {
    return rejectWithValue('An error occurred. Please try again.');
  }
});

// Async thunk to handle the resend OTP API request
export const resendOtp = createAsyncThunk<
  { message: string; data: AuthData },
  { phone: string },
  { rejectValue: string }
>('auth/resendOtp', async ({ phone }, { rejectWithValue }) => {
  try {
    // Using Supabase for authentication
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phone,
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    // Return success response
    return {
      message: 'OTP resent successfully',
      data: {
        phone: phone,
        otpExpireAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
      }
    };
  } catch (error) {
    return rejectWithValue('An error occurred. Please try again.');
  }
});

// Async thunk to handle the verify OTP API request
export const verifyOtp = createAsyncThunk<
  { message: string },
  { otp: string; phone: string },
  { rejectValue: string }
>('auth/verifyOtp', async ({ otp, phone }, { rejectWithValue }) => {
  try {
    // Using Supabase for authentication
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phone,
      token: otp,
      type: 'sms',
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    // Store user data in Redux state
    if (data?.user) {
      return {
        message: 'OTP verified successfully',
      };
    } else {
      return rejectWithValue('Verification failed');
    }
  } catch (error) {
    return rejectWithValue('An error occurred. Please try again.');
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
      // Using Supabase for user registration
      const { data, error } = await supabase.auth.signUp({
        phone: `${country_code}${phone}`,
        email: email,
        options: {
          data: {
            name: name,
            country_code: country_code,
          }
        }
      });

      if (error) {
        return rejectWithValue(error.message);
      }

      // Return success response
      return {
        message: 'User registered successfully',
        data: {
          user_id: data.user?.id || '',
          phone: `${country_code}${phone}`,
          countryCode: country_code,
          name: name,
          email: email,
        }
      };
    } catch (error) {
      return rejectWithValue('An error occurred. Please try again.');
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