import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  setSelectedUser,
  clearSelectedUser,
  clearError,
  User,
} from '@/store/features/userManagementSlice';

interface UseUserManagementReturn {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
  fetchUsers: (params: { page: number; limit: number; search?: string }) => void;
  fetchUser: (userId: number) => void;
  createUser: (userData: Partial<User>) => void;
  updateUser: (userData: Partial<User> & { id: number }) => void;
  deleteUser: (userId: number) => void;
  setSelectedUser: (user: User | null) => void;
  clearSelectedUser: () => void;
  clearError: () => void;
}

const useUserManagement = (): UseUserManagementReturn => {
  const dispatch = useAppDispatch();
  const { users, selectedUser, loading, error, pagination } = useAppSelector(
    (state) => state.userManagement
  );

  const handleFetchUsers = useCallback(
    (params: { page: number; limit: number; search?: string }) => {
      dispatch(fetchUsers(params));
    },
    [dispatch]
  );

  const handleFetchUser = useCallback(
    (userId: number) => {
      dispatch(fetchUser(userId));
    },
    [dispatch]
  );

  const handleCreateUser = useCallback(
    (userData: Partial<User>) => {
      dispatch(createUser(userData));
    },
    [dispatch]
  );

  const handleUpdateUser = useCallback(
    (userData: Partial<User> & { id: number }) => {
      dispatch(updateUser(userData));
    },
    [dispatch]
  );

  const handleDeleteUser = useCallback(
    (userId: number) => {
      dispatch(deleteUser(userId));
    },
    [dispatch]
  );

  const handleSetSelectedUser = useCallback(
    (user: User | null) => {
      dispatch(setSelectedUser(user));
    },
    [dispatch]
  );

  const handleClearSelectedUser = useCallback(() => {
    dispatch(clearSelectedUser());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    users,
    selectedUser,
    loading,
    error,
    pagination,
    fetchUsers: handleFetchUsers,
    fetchUser: handleFetchUser,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    setSelectedUser: handleSetSelectedUser,
    clearSelectedUser: handleClearSelectedUser,
    clearError: handleClearError,
  };
};

export default useUserManagement;