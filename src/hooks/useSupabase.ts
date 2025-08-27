import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import {
  createCompany,
  createUser,
  createAsset,
  getUserById,
  getCompanyById,
  getAssetById,
  updateUser,
  updateCompany,
  updateAsset
} from '@/services/supabaseService';

export const useSupabase = () => {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Initialize Supabase auth state
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
      
      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user || null);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    getSession();
  }, []);

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with phone and password
  const signInWithPhone = async (phone: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Sign in with OTP
  const signInWithOtp = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Verify OTP
  const verifyOtp = async (email: string, token: string, type: any = 'email') => {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Update user metadata
  const updateUserData = async (userData: any) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    // Auth state
    user,
    session,
    loading,
    
    // Auth methods
    signUp,
    signIn,
    signInWithPhone,
    signInWithOtp,
    verifyOtp,
    signOut,
    resetPassword,
    updateUserData,
    
    // CRUD operations
    createCompany,
    createUser,
    createAsset,
    getUserById,
    getCompanyById,
    getAssetById,
    updateUser,
    updateCompany,
    updateAsset
  };
};