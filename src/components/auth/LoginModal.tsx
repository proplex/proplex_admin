import React, { useState, useEffect, useRef } from 'react';
import {
  Eye,
  EyeOff,
  ArrowRight,
  HelpCircle,
  X,
  CheckCircle,
  Check,
  Lock,
  Mail,
  User,
  Phone,
  Building,
  MapPin,
  Smartphone,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup?: (email: string, password: string, fullName: string, phoneNumber: string) => Promise<void>;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }): React.JSX.Element | null => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form states
  const [activeTab, setActiveTab] = useState('login');
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Signup state
  const [signupStep, setSignupStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const lottieRef = useRef<any>(null);

  // Carousel data with the provided images
  const slides = [
    {
      title: 'Streamlined Investment Platform',
      subtitle: 'Modern & Intuitive',
      description: 'Experience a seamless investment journey with our user-friendly platform.',
      image: '/1 (1).png',
      verified: true
    },
    {
      title: 'Comprehensive Analytics',
      subtitle: 'Data-Driven Insights',
      description: 'Make informed decisions with our powerful analytics dashboard.',
      image: '/1 (2).png',
      verified: true
    },
    {
      title: 'Secure Transactions',
      subtitle: 'Blockchain Technology',
      description: 'Your investments are protected with enterprise-grade security.',
      image: '/1 (3).png',
      verified: true
    }
  ];

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isOpen) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isOpen, slides.length]);
  
  const handleClose = () => {
    // Reset all states when closing
    setActiveTab('login');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setLoginError('');
    setSignupStep(1);
    setFullName('');
    setSignupEmail('');
    setSignupPassword('');
    setConfirmPassword('');
    setShowSignupPassword(false);
    setOtp(['', '', '', '', '', '']);
    setIsOtpSent(false);
    setAcceptTerms(false);
    setVerificationError('');
    setIsLoading(false);
    setShowSuccess(false);
    setIsVerifying(false);
    onClose();
  };
  
  // Don't render if not open
  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const result = await login(email, password);

      if (result.success) {
        // Get the intended destination from location state or default to dashboard
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
        handleClose();
      } else {
        setLoginError(result.error?.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (signupStep > 1) {
      setSignupStep(signupStep - 1);
    }
  };

  const handleSendOtp = async () => {
    console.log('Sending OTP to:', signupEmail);
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsOtpSent(true);
      setOtp(['1', '2', '3', '4', '5', '6']);
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value && !/^[0-9]$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setVerificationError('');
    
    // Auto-focus next input
    const nextInput = document.getElementById(`otp-${index + 1}`);
    if (nextInput) nextInput.focus();
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;
    
    // If not on the final step, go to next step
    if (signupStep < 3) {
      setSignupStep(prev => prev + 1);
      return;
    }
    
    // On final step, submit the form
    setIsLoading(true);
    setVerificationError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await signup({
        email: signupEmail,
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').slice(1).join(' ') || 'User',
        role: 'user'
      }, signupPassword);

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          // Navigate to dashboard after successful signup
          navigate('/dashboard', { replace: true });
          handleClose();
        }, 1500);
      } else {
        setVerificationError(result.error?.message || 'Failed to sign up. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setVerificationError('Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupNext = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isStepValid()) return;
    
    // If on step 1 (basic info), move to password
    if (signupStep === 1) {
      setSignupStep(2);
      return;
    }
    
    // If on step 2 (password), move to OTP verification
    if (signupStep === 2) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsOtpSent(true);
        setOtp(['1', '2', '3', '4', '5', '6']);
        setSignupStep(3);
      } catch (error) {
        console.error('Failed to send OTP:', error);
        setVerificationError('Failed to send OTP. Please try again.');
      } finally {
        setIsLoading(false);
      }
      return;
    }
    
    // If on step 3, verify OTP
    if (signupStep === 3) {
      if (!acceptTerms) {
        setVerificationError('Please accept the terms and conditions');
        return;
      }

      setIsLoading(true);
      setIsVerifying(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const enteredOtp = otp.join('');
        const isOtpValid = enteredOtp === '123456';
        
        if (isOtpValid) {
          console.log('OTP verified, creating account...');
          
          const userData = {
            email: signupEmail,
            name: fullName,
            isAuthenticated: true,
            token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          
          setShowSuccess(true);
          
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          onClose();
          window.location.href = '/dashboard';
          
        } else {
          setVerificationError('Invalid OTP. Please try again (use 123456 for testing)');
          setIsVerifying(false);
          return;
        }
      } catch (error) {
        console.error('OTP verification failed:', error);
        setVerificationError('Verification failed. Please try again.');
        return;
      } finally {
        setIsLoading(false);
      }
    }
  };

  const isStepValid = (): boolean => {
    switch (signupStep) {
      case 1:
        return fullName.trim() !== '' && 
               signupEmail.trim() !== '' && 
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail);
      case 2:
        return signupPassword.length >= 8 && 
               signupPassword === confirmPassword;
      case 3:
        return otp.every((digit: string) => digit !== '') && 
               acceptTerms;
      default:
        return false;
    }
  };

  // Handle click on the overlay to close the modal
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)'
      }}
    >
      <div 
        className="relative w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex max-h-[90vh] z-[10002]"
        style={{
          minHeight: '500px',
          maxHeight: '90vh',
          pointerEvents: 'auto',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white bg-opacity-90 z-50 flex flex-col items-center justify-center p-8 text-center">
            <div className="relative w-32 h-32 mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-green-100 opacity-75 animate-ping"></div>
              </div>
              <div className="relative flex items-center justify-center w-full h-full">
                <CheckCircle className="w-24 h-24 text-green-500" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              {isVerifying ? 'Verifying...' : 'Success!'}
            </h3>
            <p className="text-slate-600 mb-8">
              {isVerifying 
                ? 'Please wait while we verify your account...'
                : 'Your account has been created successfully!'
              }
            </p>
          </div>
        )}
        
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
        
        {/* Left Side - Image Carousel */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
          {/* Carousel */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Proplex</h1>
            <span className="px-2 py-1 bg-white text-slate-800 text-xs font-medium rounded">Beta</span>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-6">Welcome</h1>
            
            {/* Tab Toggle */}
            <div className="inline-flex rounded-full bg-slate-100 p-1">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setSignupStep(1);
                }}
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'login'
                    ? 'bg-white text-slate-800 shadow-md'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Log in
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === 'signup'
                    ? 'bg-white text-slate-800 shadow-md'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Sign up
              </button>
            </div>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="space-y-6">
              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500 font-medium">OR</span>
                </div>
              </div>

              {/* Login Fields */}
              <form onSubmit={handleLogin} className="space-y-4">
                {loginError && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {loginError}
                  </div>
                )}
                
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <a href="#" className="text-slate-600 hover:text-slate-800 underline transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !email || !password}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
                >
                  {isLoading ? 'Logging in...' : (
                    <>
                      Login
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center">
                <a href="#" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  <span className="underline">Having trouble logging in?</span>
                </a>
              </div>
            </div>
          )}

          {/* Signup Wizard */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              {verificationError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {verificationError}
                </div>
              )}
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step < signupStep ? 'bg-green-500 text-white' :
                      step === signupStep ? 'bg-slate-800 text-white' :
                      'bg-slate-200 text-slate-400'
                    }`}>
                      {step < signupStep ? <Check className="w-5 h-5" /> : step}
                    </div>
                    {step < 3 && (
                      <div className={`w-16 h-1 mx-2 ${step < signupStep ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Step 1: Basic Info */}
              {signupStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Create your account</h3>
                  
                  <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-500 font-medium">OR</span>
                    </div>
                  </div>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                  
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">@</span>
                    <input
                      type="email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Password */}
              {signupStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Create a password</h3>
                  
                  <div className="relative">
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Password (min 8 characters)"
                      className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                      {showSignupPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />

                  {signupPassword && confirmPassword && signupPassword !== confirmPassword && (
                    <p className="text-sm text-red-600">Passwords do not match</p>
                  )}
                </div>
              )}

              {/* Step 3: OTP Verification */}
              {signupStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Verify your email</h3>
                  <p className="text-slate-600 mb-6">We've sent a 6-digit verification code to <span className="font-medium">{signupEmail}</span></p>
                  
                  {/* OTP Input Fields */}
                  <div className="flex justify-center gap-3 mb-6">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !otp[index] && index > 0) {
                            const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
                            if (prevInput) prevInput.focus();
                          }
                        }}
                        className="w-12 h-14 text-2xl text-center bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  {verificationError && (
                    <p className="text-sm text-red-600 text-center">{verificationError}</p>
                  )}

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Didn't receive a code? <span className="font-medium">Resend code</span>
                    </button>
                  </div>

                  <label className="flex items-start gap-3 mt-6">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-600">
                      I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-3">
                {signupStep > 1 && (
                  <button
                    type="button"
                    onClick={handleSignupBack}
                    className="flex-1 px-6 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!isStepValid() || isLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
                >
                  {isLoading ? (signupStep === 3 ? (isVerifying ? 'Verifying...' : 'Creating account...') : 'Creating account...') : signupStep === 3 ? 'Verify & Continue' : (
                    <>
                      Next
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;