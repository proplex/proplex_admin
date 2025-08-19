

import React, { useState, FormEvent, useEffect } from 'react';
import api from '@/lib/httpClient';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '@/components/LoadingSpinner';

interface RegisterResponse {
  status: string;
  message: string;
  statusCode: number;
  data: string; // Token
}

interface VerifyOtpResponse {
  status: string;
  message: string;
  statusCode: number;
  data?: any;
}

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<
    'submit' | 'verify' | 'resend' | null
  >(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const navigate = useNavigate();

  // Restore state and validate token on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem('signInEmail');
    const storedToken = localStorage.getItem('emailVerificationToken');
    if (storedEmail && storedToken) {
      try {
        // Check token expiry (assumes standard JWT format)
        const payload = JSON.parse(atob(storedToken.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          localStorage.removeItem('emailVerificationToken');
          localStorage.removeItem('signInEmail');
          return;
        }
        setEmail(storedEmail);
        setOtpSent(true);
      } catch (e) {
        // Invalid token format; clear storage
        localStorage.removeItem('emailVerificationToken');
        localStorage.removeItem('signInEmail');
      }
    }
  }, []);

  // Sync email with localStorage
  useEffect(() => {
    if (email) {
      localStorage.setItem('signInEmail', email);
    } else {
      localStorage.removeItem('signInEmail');
    }
  }, [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    try {
      setIsLoading('submit');
      const response = await api.post<RegisterResponse>('/register', {
        email,
      });
      if (response) {
        setOtpSent(true);
        localStorage.setItem('emailVerificationToken', response.data.data);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || 'Failed to send OTP. Please try again.'
      );
    } finally {
      setIsLoading(null);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }
    const token = localStorage.getItem('emailVerificationToken');
    if (!token) {
      setOtpError('Session expired. Please request a new OTP.');
      setOtpSent(false);
      localStorage.removeItem('signInEmail');
      setEmail('');
      return;
    }
    setOtpError('');
    try {
      setIsLoading('verify');
      const response = await api.post<VerifyOtpResponse>(
        '/verify-email-otp',
        {
          token,
          otp,
        }
      );
      if (response) {
        localStorage.removeItem('emailVerificationToken');
        localStorage.removeItem('signInEmail');
        navigate('/dashboard');
      }
    } catch (error: any) {
      setOtpError(
        error.response?.data?.message || 'Invalid OTP. Please try again.'
      );
    } finally {
      setIsLoading(null);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    try {
      setIsLoading('resend');
      const response = await api.post<RegisterResponse>('/register', {
        email,
      });
      if (response) {
        localStorage.setItem('emailVerificationToken', response.data.data);
        setError('OTP resent successfully!');
        setTimeout(() => setError(''), 3000);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          'Failed to resend OTP. Please try again.'
      );
    } finally {
      setIsLoading(null);
    }
  };

  const handleEmailChange = () => {
    setOtpSent(false);
    setOtp('');
    setOtpError('');
    setError('');
    localStorage.removeItem('emailVerificationToken');
    localStorage.removeItem('signInEmail');
    setEmail('');
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4'>
      <div className='w-full max-w-md bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl'>
        <div className='flex justify-center mb-6'>
          <img src='/Ryzerlogo.svg' alt='Ryzer Logo' className='h-16 w-auto' />
        </div>

        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-4'>
          Sign In
        </h1>

        <div className='flex justify-center mb-6'>
          <div className='flex items-center gap-2'>
            <span
              className={`h-2 w-2 rounded-full ${
                otpSent ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
            <span className='h-2 w-2 rounded-full bg-blue-500' />
          </div>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <div>
              <label
                htmlFor='email'
                className='text-sm text-gray-600 mb-1 block'
              >
                Email Address
              </label>
              <input
                id='email'
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                required
                aria-describedby='email-error'
              />
              {error && (
                <p
                  id='email-error'
                  className=' text-sm mt-2 animate-fade-in'
                >
                  {error}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-2 transition-all'
              disabled={isLoading === 'submit'}
            >
              {isLoading === 'submit' && (
                <LoadingSpinner size='h-4 w-4' color='text-blue-600' />
              )}
              {isLoading === 'submit' ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className='flex flex-col gap-6'>
            <div className='text-center text-sm text-gray-600 mb-2'>
              Enter the 6-digit code sent to{' '}
              <span className='font-medium text-blue-600'>{email}</span>
            </div>
            <div>
              <label htmlFor='otp' className='text-sm text-gray-600 mb-1 block'>
                Verification Code
              </label>
              <input
                id='otp'
                type='text'
                placeholder='••••••'
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                maxLength={6}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center tracking-widest transition-all'
                required
                aria-describedby='otp-error'
              />
              {otpError && (
                <p
                  id='otp-error'
                  className=' text-sm mt-2 animate-fade-in'
                >
                  {otpError}
                </p>
              )}
              {error && (
                <p className='text-green-600 text-sm mt-2 animate-fade-in'>
                  {error}
                </p>
              )}
            </div>
            <button
              type='submit'
              className='w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 flex items-center justify-center gap-2 transition-all'
              disabled={isLoading === 'verify'}
            >
              {isLoading === 'verify' && (
                <LoadingSpinner size='h-4 w-4' color='text-blue-600' />
              )}
              {isLoading === 'verify' ? 'Verifying...' : 'Verify OTP'}
            </button>
            <div className='flex justify-between text-sm'>
              <button
                type='button'
                onClick={handleResendOtp}
                className='text-blue-600 hover:underline disabled:text-gray-400 flex items-center gap-2'
                disabled={isLoading === 'resend'}
              >
                {isLoading === 'resend' && (
                  <LoadingSpinner size='h-4 w-4' color='text-blue-600' />
                )}
                {isLoading === 'resend' ? 'Resending...' : 'Resend OTP'}
              </button>
              <button
                type='button'
                onClick={handleEmailChange}
                className='text-gray-600 hover:underline'
              >
                Change Email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
