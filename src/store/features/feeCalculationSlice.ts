import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/httpClient';

// Define types
interface FeeItem {
  id: string;
  name: string;
  description: string;
  percentage: number;
  fixedAmount: number;
  required: boolean;
  category: string;
}

interface FeeCalculationState {
  feeItems: FeeItem[];
  calculatedFees: Record<string, number>;
  totalAmount: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: FeeCalculationState = {
  feeItems: [],
  calculatedFees: {},
  totalAmount: 0,
  loading: false,
  error: null,
};

// Async thunk to fetch fee structure
export const fetchFeeStructure = createAsyncThunk(
  'feeCalculation/fetchFeeStructure',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/fee-structure/${categoryId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch fee structure'
      );
    }
  }
);

// Async thunk to calculate fees
export const calculateFees = createAsyncThunk(
  'feeCalculation/calculateFees',
  async (
    { baseAmount, feeItems }: { baseAmount: number; feeItems: FeeItem[] },
    { rejectWithValue }
  ) => {
    try {
      const calculatedFees: Record<string, number> = {};
      let total = baseAmount;

      feeItems.forEach((item) => {
        const feeAmount = Math.round(
          baseAmount * (item.percentage / 100) + item.fixedAmount
        );
        calculatedFees[item.id] = feeAmount;
        total += feeAmount;
      });

      return { calculatedFees, totalAmount: total };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to calculate fees'
      );
    }
  }
);

const feeCalculationSlice = createSlice({
  name: 'feeCalculation',
  initialState,
  reducers: {
    clearFeeCalculation: (state) => {
      state.calculatedFees = {};
      state.totalAmount = 0;
      state.error = null;
    },
    updateFeeItem: (state, action) => {
      const index = state.feeItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.feeItems[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch fee structure
      .addCase(fetchFeeStructure.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeStructure.fulfilled, (state, action) => {
        state.loading = false;
        state.feeItems = action.payload.feeItems || [];
      })
      .addCase(fetchFeeStructure.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Calculate fees
      .addCase(calculateFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateFees.fulfilled, (state, action) => {
        state.loading = false;
        state.calculatedFees = action.payload.calculatedFees;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(calculateFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearFeeCalculation, updateFeeItem } = feeCalculationSlice.actions;
export default feeCalculationSlice.reducer;