

;

import React, { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

type AuthFormProps = {
  title: string;
  buttonText: string;
  linkText: string;
  linkPath: string;
  linkDescription: string;
  onSubmit: (formData: Record<string, string>) => void;
  onResendOtp?: () => void;
  includeCompany?: boolean;
  showOtpField?: boolean;
  isLoading?: boolean;
};

const AuthForm: FC<AuthFormProps> = ({
  title,
  buttonText,
  linkText,
  linkPath,
  linkDescription,
  onSubmit,
  onResendOtp, // Add this to the destructured props
  includeCompany = false,
  showOtpField = false,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    phone: "",
    company: "",
    otp: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleResendOtp = () => {
    if (onResendOtp) {
      onResendOtp();
    }
  };

  return (
    <div className='min-h-screen w-full flex relative'>
      {/* Loading overlay */}
      {isLoading && (
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10'>
          <svg
            className='animate-spin h-10 w-10 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
            ></path>
          </svg>
        </div>
      )}

      {/* Left side */}
      <div
        className={`hidden lg:flex lg:w-1/2 bg-[#0D0B1A] items-center justify-center p-8 relative ${
          isLoading ? 'backdrop-blur-sm' : ''
        }`}
      >
        <img
          src='/img/login.png'
          alt='NFT Illustration'
          className='object-contain'
        />
        <div className='flex justify-center absolute left-10 top-10'>
          <img src='/logo.png' alt='Fandora Logo' className='h-10 w-auto' />
        </div>
      </div>

      {/* Right side */}
      <div
        className={`w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white ${
          isLoading ? 'backdrop-blur-sm' : ''
        }`}
      >
        <div className='w-full max-w-md space-y-8'>
          <div className='flex justify-center'>
            <img src='/logo.png' alt='Fandora Logo' className='h-10 w-auto' />
          </div>

          <div className='text-center space-y-2'>
            <h1 className='text-2xl font-semibold text-gray-900'>{title}</h1>
            <p className='text-sm text-muted-foreground'>{linkDescription}</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-2'>
              <label
                htmlFor='phone'
                className='text-sm font-medium text-gray-700'
              >
                Mobile Number
              </label>
              <Input
                id='phone'
                name='phone'
                type='tel'
                placeholder='Enter your mobile'
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {includeCompany && (
              <div className='space-y-2'>
                <label
                  htmlFor='company'
                  className='text-sm font-medium text-gray-700'
                >
                  Company
                </label>
                <Input
                  id='company'
                  name='company'
                  type='text'
                  placeholder='Enter your company name'
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {showOtpField && (
              <div className='space-y-2'>
                <label
                  htmlFor='otp'
                  className='text-sm font-medium text-gray-700'
                >
                  OTP
                </label>
                <Input
                  id='otp'
                  name='otp'
                  type='text'
                  placeholder='Enter OTP'
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {showOtpField && onResendOtp && (
              <div className='text-center'>
                <button
                  type='button'
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className={`w-full mt-2 bg-transparent text-[#7C3AED] 
                  }`}
                >
                  {'Resend OTP'}
                </button>
              </div>
            )}

            <Button
              type='submit'
              disabled={isLoading}
              className={`w-full bg-[#7C3AED] hover:bg-[#6D28D9] ${
                isLoading ? 'cursor-not-allowed bg-slate-300 text-gray-800' : ''
              }`}
            >
              {buttonText}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
