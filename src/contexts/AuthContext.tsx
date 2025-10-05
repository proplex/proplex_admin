import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

interface AuthResponse {
  user: Omit<User, 'accessToken' | 'refreshToken' | 'expiresIn'>;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: AuthError }>;
  signup: (userData: Omit<User, 'id' | 'accessToken' | 'refreshToken' | 'expiresIn'>, password: string) => Promise<{ success: boolean; error?: AuthError }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  redirectPath: string | null;
  setRedirectPath: (path: string | null) => void;
}

// Constants
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before token expires
const AUTH_STORAGE_KEY = 'auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  const [refreshTokenTimeout, setRefreshTokenTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Mock API Client for development
  const mockApiRequest = async <T,>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ data?: T; error?: AuthError }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      switch (endpoint) {
        case 'login': {
          const { email, password } = JSON.parse(options.body as string);

          // Mock validation - accept any email/password for demo
          if (!email || !password) {
            return {
              error: {
                message: 'Email and password are required',
                status: 400,
              },
            };
          }

          // Mock successful login
          const mockUser: Omit<User, 'accessToken' | 'refreshToken' | 'expiresIn'> = {
            id: '1',
            email,
            firstName: email.split('@')[0],
            lastName: 'User',
            role: 'admin',
          };

          const expiresIn = 3600; // 1 hour
          const data: AuthResponse = {
            user: mockUser,
            accessToken: `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`,
            refreshToken: `mock-refresh-token-${Math.random().toString(36).substr(2, 9)}`,
            expiresIn,
          };

          return { data: data as T };
        }

        case 'signup': {
          const { email, password, firstName, lastName, role } = JSON.parse(options.body as string);

          if (!email || !password || !firstName) {
            return {
              error: {
                message: 'Email, password, and first name are required',
                status: 400,
              },
            };
          }

          // Mock successful signup
          const mockUser: Omit<User, 'accessToken' | 'refreshToken' | 'expiresIn'> = {
            id: Date.now().toString(),
            email,
            firstName,
            lastName: lastName || 'User',
            role: role || 'user',
          };

          const expiresIn = 3600; // 1 hour
          const data: AuthResponse = {
            user: mockUser,
            accessToken: `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`,
            refreshToken: `mock-refresh-token-${Math.random().toString(36).substr(2, 9)}`,
            expiresIn,
          };

          return { data: data as T };
        }

        case 'refresh-token': {
          const { refreshToken } = JSON.parse(options.body as string);

          if (!refreshToken || !refreshToken.startsWith('mock-refresh-token')) {
            return {
              error: {
                message: 'Invalid refresh token',
                status: 401,
              },
            };
          }

          // Mock successful token refresh
          const mockUser: Omit<User, 'accessToken' | 'refreshToken' | 'expiresIn'> = {
            id: '1',
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'admin',
          };

          const expiresIn = 3600; // 1 hour
          const data: AuthResponse = {
            user: mockUser,
            accessToken: `mock-jwt-token-${Math.random().toString(36).substr(2, 9)}`,
            refreshToken: `mock-refresh-token-${Math.random().toString(36).substr(2, 9)}`,
            expiresIn,
          };

          return { data: data as T };
        }

        case 'logout': {
          // Mock successful logout
          return { data: { success: true } as T };
        }

        default:
          return {
            error: {
              message: 'Unknown endpoint',
              status: 404,
            },
          };
      }
    } catch (err) {
      return {
        error: {
          message: 'Invalid request format',
          status: 400,
        },
      };
    }
  };

  // Token Management
  const setAuthData = (data: AuthResponse) => {
    const userData: User = {
      ...data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      expiresIn: data.expiresIn,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    
    // Schedule token refresh
    scheduleTokenRefresh(data.expiresIn);
  };

  const clearAuthData = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear any pending refresh
    if (refreshTokenTimeout) {
      clearTimeout(refreshTokenTimeout);
      setRefreshTokenTimeout(null);
    }
  };

  const scheduleTokenRefresh = (expiresIn: number) => {
    // Clear any existing timeout
    if (refreshTokenTimeout) {
      clearTimeout(refreshTokenTimeout);
    }

    // Set a timeout to refresh the token before it expires
    const timeout = Math.max(0, (expiresIn * 1000) - TOKEN_REFRESH_THRESHOLD);
    const timeoutId = setTimeout(() => refreshToken(), timeout);
    setRefreshTokenTimeout(timeoutId);
  };

  // Auth Methods
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await mockApiRequest<AuthResponse>('login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (error) {
        setError(error);
        return { success: false, error };
      }

      if (data) {
        setAuthData(data);
        return { success: true };
      }

      return { success: false, error: { message: 'Unknown error occurred' } };
    } catch (err) {
      const error = { message: 'Login failed. Please try again.' };
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData: Omit<User, 'id' | 'accessToken' | 'refreshToken' | 'expiresIn'>, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await mockApiRequest<AuthResponse>('signup', {
        method: 'POST',
        body: JSON.stringify({ ...userData, password }),
      });

      if (error) {
        setError(error);
        return { success: false, error };
      }

      if (data) {
        setAuthData(data);
        return { success: true };
      }

      return { success: false, error: { message: 'Unknown error occurred' } };
    } catch (err) {
      const error = { message: 'Signup failed. Please try again.' };
      setError(error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = useCallback(async (): Promise<boolean> => {
    if (!user?.refreshToken) {
      clearAuthData();
      return false;
    }

    try {
      const { data, error } = await mockApiRequest<AuthResponse>('refresh-token', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: user.refreshToken }),
      });

      if (error || !data) {
        throw new Error(error?.message || 'Failed to refresh token');
      }

      setAuthData(data);
      return true;
    } catch (err) {
      console.error('Failed to refresh token:', err);
      clearAuthData();
      return false;
    }
  }, [user?.refreshToken]);

  const logout = async () => {
    try {
      // Try to revoke the refresh token on the server
      if (user?.refreshToken) {
        await mockApiRequest('logout', {
          method: 'POST',
          body: JSON.stringify({ refreshToken: user.refreshToken }),
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      clearAuthData();
      setRedirectPath('/login');
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authData = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!authData) {
          setLoading(false);
          return;
        }

        const parsedData = JSON.parse(authData) as User;
        
        // Check if token is expired
        if (parsedData.expiresIn && Date.now() >= parsedData.expiresIn * 1000) {
          // Try to refresh the token
          const refreshed = await refreshToken();
          if (!refreshed) {
            clearAuthData();
          }
        } else {
          setUser(parsedData);
          setIsAuthenticated(true);
          scheduleTokenRefresh(parsedData.expiresIn || 3600); // Default to 1 hour if not set
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Cleanup on unmount
    return () => {
      if (refreshTokenTimeout) {
        clearTimeout(refreshTokenTimeout);
      }
    };
  }, [refreshToken]);

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    signup,
    logout,
    refreshToken,
    clearError: () => setError(null),
    redirectPath,
    setRedirectPath,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading || isAuthenticated ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Higher Order Component for protecting routes
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: { redirectTo?: string } = {}
) => {
  const WithAuth: React.FC<P> = (props) => {
    const { isAuthenticated, loading, redirectPath, setRedirectPath } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        // Store the current location for redirecting back after login
        setRedirectPath(window.location.pathname);
        navigate(options.redirectTo || '/login');
      }
    }, [isAuthenticated, loading, navigate, setRedirectPath]);

    if (loading || !isAuthenticated) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} />;
  };

  return WithAuth;
};