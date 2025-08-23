import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/httpClient';

// Define types
export interface Document {
  id: number;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
  projectId?: number;
  companyId?: number;
  status: 'uploaded' | 'processing' | 'processed' | 'failed';
}

interface DocumentManagementState {
  documents: Document[];
  selectedDocument: Document | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// Initial state
const initialState: DocumentManagementState = {
  documents: [],
  selectedDocument: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  },
};

// Async thunk to fetch documents
export const fetchDocuments = createAsyncThunk(
  'documentManagement/fetchDocuments',
  async (
    { page = 1, limit = 10, search = '', projectId, companyId }: { 
      page: number; 
      limit: number; 
      search?: string;
      projectId?: number;
      companyId?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const params: Record<string, any> = { page, limit };
      if (search) params.search = search;
      if (projectId) params.projectId = projectId;
      if (companyId) params.companyId = companyId;
      
      const response = await api.get('/documents', { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch documents'
      );
    }
  }
);

// Async thunk to fetch a single document
export const fetchDocument = createAsyncThunk(
  'documentManagement/fetchDocument',
  async (documentId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/documents/${documentId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch document'
      );
    }
  }
);

// Async thunk to upload a document
export const uploadDocument = createAsyncThunk(
  'documentManagement/uploadDocument',
  async (documentData: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/documents/upload', documentData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload document'
      );
    }
  }
);

// Async thunk to update a document
export const updateDocument = createAsyncThunk(
  'documentManagement/updateDocument',
  async ({ id, ...documentData }: Partial<Document> & { id: number }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/documents/${id}`, documentData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update document'
      );
    }
  }
);

// Async thunk to delete a document
export const deleteDocument = createAsyncThunk(
  'documentManagement/deleteDocument',
  async (documentId: number, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/documents/${documentId}`);
      return { ...response.data, id: documentId };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete document'
      );
    }
  }
);

const documentManagementSlice = createSlice({
  name: 'documentManagement',
  initialState,
  reducers: {
    setSelectedDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    clearSelectedDocument: (state) => {
      state.selectedDocument = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch documents
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload.data;
        state.pagination = {
          currentPage: action.payload.pagination.currentPage,
          pageSize: action.payload.pagination.pageSize,
          totalItems: action.payload.pagination.totalItems,
          totalPages: action.payload.pagination.totalPages,
        };
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch single document
      .addCase(fetchDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDocument = action.payload.data;
      })
      .addCase(fetchDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Upload document
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload.data);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update document
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.documents.findIndex(
          (document) => document.id === action.payload.data.id
        );
        if (index !== -1) {
          state.documents[index] = action.payload.data;
        }
        if (state.selectedDocument && state.selectedDocument.id === action.payload.data.id) {
          state.selectedDocument = action.payload.data;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete document
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter((document) => document.id !== action.payload.id);
        if (state.selectedDocument && state.selectedDocument.id === action.payload.id) {
          state.selectedDocument = null;
        }
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedDocument, clearSelectedDocument, clearError } = documentManagementSlice.actions;
export default documentManagementSlice.reducer;