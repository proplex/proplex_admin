import api from "@/lib/httpClient";
import { basicDetailsvalue } from "@/types/basicDetails";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";



interface BasicDetailsState {
 
  basicDetails : basicDetailsvalue[] ;
  loading: boolean;
  error: string | null;
}

const initialState: BasicDetailsState = {
  basicDetails : [],
  loading: false,
  error: null,
};

export const postBasicDetails = createAsyncThunk(
  "basicDetails/postBasicDetails",
  async (
    basicDetails: {
      title: string;
      symbol: string;
      stage_of_production: string;
      contentType: number;
      projectManager?: string;
      totalSupply: number;
      tokenPriceInINR: number;
      royaltyPercentage: number;
      email : string;
      pan_number:string;
      mobile_no: string;
      individual_group: string,
      step_completed : number;
    },
    { rejectWithValue }
  ) => {
    try {
      const serverData = {
        name: basicDetails.title || "",
        property_type_id: basicDetails.contentType || "",
        stage_of_production : basicDetails.stage_of_production,
        individual_group: basicDetails.individual_group || "Individual",
        step_completed: basicDetails.step_completed || 1.1,
        symbol: basicDetails.symbol || "",
        royaltyPercentage: basicDetails.royaltyPercentage || 0,
        total_token: basicDetails.totalSupply || 0,
        token_amount: basicDetails.tokenPriceInINR || 0,
        email: basicDetails.email || "",
        pan_number: basicDetails.pan_number || "",
        mobile_no: basicDetails.mobile_no || "",
      };
      
      const response = await api.post('/project', serverData);
      return  response.data ;

    } catch (error) {
      
      return rejectWithValue(Error);
    }
  }
);

const basicSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateBasicDetails(state, action: PayloadAction<Partial<BasicDetailsState>>) {
      return { ...state, ...action.payload };
    },
    resetForm(state) {
      return { ...initialState };
    },
  },
  extraReducers: (builder)=>{
    builder
     .addCase(postBasicDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(postBasicDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.basicDetails = action.payload.basicDetails;
      })
     .addCase(postBasicDetails.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      });
    
  }





});

export const { updateBasicDetails, resetForm } = basicSlice.actions;

export default basicSlice.reducer;
