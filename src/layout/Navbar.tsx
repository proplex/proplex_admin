import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { 
  Bell, 
  ChevronDown, 
  Menu,
  User as UserIcon,
  Copy,
  Check,
  LogOut,
  LogIn,
  Settings2,
} from "lucide-react";

import LoginModal from '../components/auth/LoginModal';
import { useAuth } from '../hooks/useAuth';

// Base component interface
interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  delayDuration?: number;
  side?: string;
}

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

interface TooltipTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface TooltipContentProps {
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children, delayDuration = 100 }) => (
  <div className="relative" style={{ '--delay': `${delayDuration}ms` } as React.CSSProperties}>
    {children}
  </div>
);

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="group relative inline-flex">{children}</div>
);

const TooltipTrigger: React.FC<TooltipTriggerProps> = ({ children, asChild = false }) => (
  asChild ? <>{children}</> : <div>{children}</div>
);

const TooltipContent: React.FC<TooltipContentProps> = ({ 
  children, 
  side = 'bottom',
  className = ''
}) => {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  } as const;

  const arrowPosition = {
    top: 'bottom-0 left-1/2 -mb-1',
    right: 'left-0 top-1/2 -ml-1 -translate-y-1/2',
    bottom: 'top-0 left-1/2 -mt-1',
    left: 'right-0 top-1/2 -mr-1 -translate-y-1/2',
  } as const;

  return (
    <div 
      className={`
        absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 
        rounded-md shadow-lg whitespace-nowrap pointer-events-none
        opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100
        ${positionClasses[side]} ${className}
      `}
    >
      <div className="relative z-10 flex items-center">
        {children}
      </div>
      <div 
        className={`
          absolute w-2.5 h-2.5 bg-gray-900 dark:bg-gray-700 
          transform rotate-45 -translate-x-1/2
          ${arrowPosition[side]}
        `} 
      />
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: string;
  size?: string;
  className?: string;
}

const Button = ({ 
  children, 
  variant, 
  size, 
  className = '', 
  onClick, 
  ...props 
}: ButtonProps) => (
  <button 
    className={`inline-flex items-center justify-center transition-all ${className}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);

const Avatar = ({ children, className = '' }: BaseComponentProps) => (
  <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarFallback = ({ children, className = '' }: BaseComponentProps) => (
  <div className={`flex h-full w-full items-center justify-center ${className}`}>
    {children}
  </div>
);

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return null;
        
        const childType = (child.type as React.ComponentType).name;
        if (childType === 'DropdownMenuTrigger') {
          return <div key="trigger" onClick={() => setIsOpen(!isOpen)}>{child}</div>;
        }
        if (childType === 'DropdownMenuContent' && isOpen) {
          return <div key="content">{child}</div>;
        }
        return null;
      })}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, asChild }: BaseComponentProps) => asChild ? children : <div>{children}</div>;

const DropdownMenuContent = ({ children, className = '' }: BaseComponentProps) => (
  <div className={`absolute right-0 mt-2 z-50 ${className}`}>
    {children}
  </div>
);

const DropdownMenuLabel = ({ children, className = '' }: BaseComponentProps) => (
  <div className={`px-2 py-1.5 text-sm ${className}`}>{children}</div>
);

interface DropdownMenuItemProps extends BaseComponentProps {
  onClick?: (e: React.MouseEvent) => void;
}

const DropdownMenuItem = ({ children, className = '', onClick }: DropdownMenuItemProps) => (
  <div className={`px-2 py-1.5 text-sm ${className}`} onClick={onClick}>
    {children}
  </div>
);

const DropdownMenuSeparator = ({ className = '' }: { className?: string }) => (
  <div className={`h-px my-1 ${className}`} />
);

interface NavbarProps {
  onMenuToggle?: () => void;
  className?: string;
}

const Navbar = ({ onMenuToggle, className }: NavbarProps) => {
  const [time, setTime] = useState<Date>(new Date());
  const [copied, setCopied] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use the useAuth hook for authentication state
  const { 
    isAuthenticated, 
    user, 
    login, 
    logout,
    loading: isAuthLoading 
  } = useAuth();
  
  // Debug log to track auth state changes
  useEffect(() => {
    console.log('Navbar auth state:', { isAuthenticated, user, isAuthLoading });
  }, [isAuthenticated, user, isAuthLoading]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      // Call the login function from useAuth hook with email and password
      const result = await login(email, password);

      if (result.success) {
        // Show success message
        console.log('Login successful');
        toast.success('Login successful!');
        setIsLoginModalOpen(false);
      } else {
        console.error('Login failed:', result.error?.message);
        // Show error message to user
        toast.error(result.error?.message || 'Login failed. Please check your credentials and try again.');
        throw new Error(result.error?.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Show error message to user
      toast.error('Login failed. Please check your credentials and try again.');
      throw error; // Re-throw to allow LoginModal to handle the error
    }
  };

  const handleCopyEmail = async () => {
    if (user?.email) {
      try {
        await navigator.clipboard.writeText(user.email);
        setCopied(true);
        toast.success('Email copied to clipboard!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy email:', err);
        toast.error('Failed to copy email', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const getUserInitials = (): string => {
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  };

  const getUserName = (): string => {
    if (!user) return 'User';
    return `${user.firstName} ${user.lastName}`.trim() || user.email || 'User';
  };

  return (
    <TooltipProvider delayDuration={100}>
      {/* Login Modal - Only show when explicitly opened */}
      {isLoginModalOpen && (
        <LoginModal 
          isOpen={true} 
          onClose={() => {
            console.log('Closing modal from overlay');
            setIsLoginModalOpen(false);
          }} 
          onLogin={async (email, password) => {
            console.log('Login attempt with:', email);
            await handleLogin(email, password);
          }}
        />
      )}
      
      <nav className={`
        fixed left-0 right-0 rounded-6xl border border-gray-200/20 drop-shadow-lg dark:border-gray-800/20 h-16 z-50 transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/20 dark:border-gray-800/20' 
          : 'bg-white/60 dark:bg-gray-900/80 backdrop-blur-lg border-b border-transparent'
        }
      `}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-50" />
        
        <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          {/* Left side - Logo and Time */}
          <div className="flex items-center gap-4">
            {/* Logo with animated effects */}
            <div className="flex items-center gap-3 pr-4 border-r border-gray-200/30 dark:border-gray-700/30">
              <div className="relative group">
                <img 
                  src="/logo.png" 
                  alt="Proplex Logo" 
                  className="h-12 w-8 object-contain transition-transform duration-200 group-hover:scale-110" 
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                  Proplex
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Right side - User Controls */}
          <div className="flex items-center gap-2">
            {/* Enhanced User Dropdown */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-3 pl-2 pr-4 py-2 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-105 active:scale-95 group"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold text-lg">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                        {getUserName()}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                          Authenticated
                        </span>
                        {user?.email && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyEmail();
                            }}
                            className="ml-1 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                            title="Copy email"
                          >
                            {copied ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-hover:text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-64 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl shadow-black/5 animate-in slide-in-from-top-2 duration-200 p-2"
                >
                  <DropdownMenuLabel className="font-semibold text-gray-900 dark:text-white px-2 py-2">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-800/50 my-1" />
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Profile</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Manage your profile</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
                        <Copy className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getUserName()}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.email || ''}
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Settings2 className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Settings</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Preferences & privacy</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-800/50 my-2" />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="rounded-lg p-3 text-red-600 dark:text-red-400 transition-all duration-150 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                        <LogOut className="h-5 w-5 text-white transition-transform duration-200 group-hover:scale-110" />
                      </div>
                      <div>
                        <div className="font-medium">Sign out</div>
                        <div className="text-xs opacity-75">See you later!</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Sign in button when user is not authenticated
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4 py-2 h-10 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">Sign in</span>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;