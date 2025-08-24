import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchDocuments,
  fetchDocument,
  uploadDocument,
  updateDocument,
  deleteDocument,
  setSelectedDocument,
  clearSelectedDocument,
  clearError,
  Document,
} from '@/store/features/documentManagementSlice';

interface UseDocumentManagementReturn {
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
  fetchDocuments: (params: { 
    page: number; 
    limit: number; 
    search?: string;
    projectId?: number;
    companyId?: number;
  }) => void;
  fetchDocument: (documentId: number) => void;
  uploadDocument: (documentData: FormData) => void;
  updateDocument: (documentData: Partial<Document> & { id: number }) => void;
  deleteDocument: (documentId: number) => void;
  setSelectedDocument: (document: Document | null) => void;
  clearSelectedDocument: () => void;
  clearError: () => void;
}

const useDocumentManagement = (): UseDocumentManagementReturn => {
  const dispatch = useAppDispatch();
  const { documents, selectedDocument, loading, error, pagination } = useAppSelector(
    (state) => state.documentManagement
  );

  const handleFetchDocuments = useCallback(
    (params: { 
      page: number; 
      limit: number; 
      search?: string;
      projectId?: number;
      companyId?: number;
    }) => {
      dispatch(fetchDocuments(params));
    },
    [dispatch]
  );

  const handleFetchDocument = useCallback(
    (documentId: number) => {
      dispatch(fetchDocument(documentId));
    },
    [dispatch]
  );

  const handleUploadDocument = useCallback(
    (documentData: FormData) => {
      dispatch(uploadDocument(documentData));
    },
    [dispatch]
  );

  const handleUpdateDocument = useCallback(
    (documentData: Partial<Document> & { id: number }) => {
      dispatch(updateDocument(documentData));
    },
    [dispatch]
  );

  const handleDeleteDocument = useCallback(
    (documentId: number) => {
      dispatch(deleteDocument(documentId));
    },
    [dispatch]
  );

  const handleSetSelectedDocument = useCallback(
    (document: Document | null) => {
      dispatch(setSelectedDocument(document));
    },
    [dispatch]
  );

  const handleClearSelectedDocument = useCallback(() => {
    dispatch(clearSelectedDocument());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    documents,
    selectedDocument,
    loading,
    error,
    pagination,
    fetchDocuments: handleFetchDocuments,
    fetchDocument: handleFetchDocument,
    uploadDocument: handleUploadDocument,
    updateDocument: handleUpdateDocument,
    deleteDocument: handleDeleteDocument,
    setSelectedDocument: handleSetSelectedDocument,
    clearSelectedDocument: handleClearSelectedDocument,
    clearError: handleClearError,
  };
};

export default useDocumentManagement;