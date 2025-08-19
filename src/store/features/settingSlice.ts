import { defaultPagination } from "@/constants/global";
import api from "@/lib/httpClient";
import { SetingType } from "@/types/setting";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Pager {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

interface companyState {
  setting: SetingType[];
  settingToEdit: SetingType;
  isEditMode: Boolean;
  pager: Pager;
  loading: boolean;
  error: string | null;
}


const initialState: companyState = {
  setting: [], 
  settingToEdit: {
    id: 0,
    uuid: null,
    name: "",
    value: "",
    created_at: "", 
    updated_at: "" 
  },
  isEditMode: false,
  pager: defaultPagination,
  loading: false,
  error: null,
};


export const fetchSetting = createAsyncThunk(
  "company/fetchSetting",
  async (
    { page = 1, limit = 10 }: { page: number; limit: number  },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.get(`/setting`, {
        params: { page, limit }, 
      });
      return {
        setting: response.data.data,
        pager: response.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee"
      );
    }
  }
);

export const postSetting = createAsyncThunk(
  "company/postSetting",
  async (
    { name, value }: { name: string; value: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(`/setting`, {
        name,
        value,
      });
      return {
        settings: response.data.data
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add setting"
      );
    }
  }
);

export const deleteSetting = createAsyncThunk(
  "company/deleteSetting",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/setting/${id}`);
      return { id };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete setting"
      );
    }
  }
);

export const getSettingDetailsToEdit = createAsyncThunk(
  "company/getSettingDetailsToEdit",
  async (settingName: string, {rejectWithValue}) => {
    try {
      const response = await api.get(`/setting/${settingName}`);
      return {
        settingToEdit: response.data.data
      }
    } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to get the setting detail by name"
        )
      }
  }
)
export const editSetting = createAsyncThunk(
  "company/editSetting",
  async ({settingIdToBeUpdated, data}:{settingIdToBeUpdated: number, data: {name: string, value:string}}, {rejectWithValue}) => {
    try {
      const response = await api.put(`/setting/${settingIdToBeUpdated}`, {
        name: data.name,
        value: data.value,
      });
      const page: number = 1;
      const limit: number = 10;
      const fetchSettingsResponse = await api.get(`/setting`, {
        params: { page, limit}, 
      });
      return {
        setting: fetchSettingsResponse.data.data,
        pager: fetchSettingsResponse.data.pager,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to edit the setting detail"
      )
    }
  }
);

const settingSlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    resetEditMode: (state) => {
      

      state.isEditMode = false,
      state.settingToEdit = {
        id: 0,
        uuid: null,
        name: "",
        value: "",
        created_at: "", 
        updated_at: "" 
      }
      // 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.setting = action.payload.setting;
        state.pager = action.payload.pager; 
      })
      .addCase(fetchSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.setting = action.payload.settings
        // state.pager = defaultPagination
      })
      .addCase(postSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.setting = state.setting.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getSettingDetailsToEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSettingDetailsToEdit.fulfilled, (state, action) => {
        state.loading = false;
        state.isEditMode = true; 
        state.settingToEdit = action.payload.settingToEdit;
      })
      .addCase(getSettingDetailsToEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSetting.fulfilled, (state, action) => {
        state.loading = false;
        state.isEditMode = false; 
        state.settingToEdit = {
          id: 0,
          uuid: null,
          name: "",
          value: "",
          created_at: "", 
          updated_at: "" 
        };
        state.setting = action.payload.setting;
        state.pager = action.payload.pager;
      })
      .addCase(editSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export const { resetEditMode } = settingSlice.actions
export default settingSlice.reducer;
