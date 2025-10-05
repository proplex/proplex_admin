import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.post('/auth/login', { email, password });
      // setUser(response.data.user);
      
      // Mock login for now
      setTimeout(() => {
        setUser({ email, name: 'Demo User' } as any);
        toast.success('Logged in successfully!');
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid credentials');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // TODO: Add API call to invalidate token
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
