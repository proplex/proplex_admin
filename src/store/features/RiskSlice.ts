import api from "@/lib/httpClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type riskType = {
  id: number;
  uuid: string;
  property_id: number;
  name: string;
  faqId: number;
  description: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
};

interface propertyState {
  risk: riskType[];
  loading: boolean;
  error: string | null;
}

const initialState: propertyState = {
  risk: [],
  loading: false,
  error: null,
};

export const postRisk = createAsyncThunk(
  "property/postRisk",
  async (riskItems: riskType) => {
    try {
      const response = await api.post("/project/project_metadata", riskItems);
      return response.data;
    } catch (error) {
      console.error("Error posting risk:", error);
      throw error;
    }
  }
);

export const deleteRisk = createAsyncThunk(
  "property/deleteRisk",
  async (id: number) => {
    try {
      await api.delete(`/project/project_metadata/${id}`);
    } catch (error) {
      
    }
  }
);

export const putRisk = createAsyncThunk(
  "property/putRisk",
  async ({ RiskItem, id }: { RiskItem: {}; id: number }) => {
    try {
      const response = await api.put(
        `/project/project_metadata/${id}`,
        RiskItem
      );
      return response.data.data; // Adjust the response if necessary
    } catch (error) {
      console.error("Error updating Risk:", error);
      throw error;
    }
  }
);

export const fetchRisk = createAsyncThunk(
  "property/fetchRisk",
  async (property_id: number) => {
    try {
      const response = await api.get(
        `project/project_metadata/risk/${property_id}`
      );
      return response.data.data;
    } catch (error) {
      
    }
  }
);

const RiskSlice = createSlice({
  name: "faqItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postRisk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRisk.fulfilled, (state, action) => {
        state.loading = false;
        const newRisk = action.meta.arg; // Use the data you submitted to the API
        state.risk = [...state.risk, newRisk]; // Append to the current risk array
      })
      .addCase(postRisk.rejected, (state, action) => {
        state.loading = false;
        state.risk = [];
      })
      .addCase(putRisk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRisk = action.payload; // This should be the updated risk data
        state.risk = state.risk.map((risk) =>
          risk.id === updatedRisk.id ? updatedRisk : risk
        );
      })
      .addCase(putRisk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update risk";
      })
      .addCase(deleteRisk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRisk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRisk.fulfilled, (state, action) => {
        state.loading = false;
        state.risk = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchRisk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default RiskSlice.reducer;
