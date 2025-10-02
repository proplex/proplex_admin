import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Menu, 
  LayoutDashboard, 
  Package, 
  Building2, 
  Users2, 
  FileText, 
  BarChart2,
  Layers2,
  Home,
  Sparkles,
  Sun,
  Moon,
  ShoppingCart,
  Settings2,
  User,
  LogIn,
  Copy,
  Check,
  Wallet
} from "lucide-react";

// Web3Auth imports
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount,useBalance,useChainId,useSwitchChain } from "wagmi";
import {formatUnits, type Chain} from "viem";

// Login Modal
import LoginModal from '../components/auth/LoginModal';
import { useAuth } from '../hooks/useAuth';
import api from '../lib/httpClient'; // Correct import path



// Mock components for demonstration
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

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string | ((props: { isActive: boolean }) => string);
  style?: React.CSSProperties;
  isActive?: boolean;
}

const NavLink = ({ to, children, className, style, isActive: isActiveProp }: NavLinkProps) => {
  const location = useLocation();
  const isActive = isActiveProp || 
    location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to)) ||
    (to === '/' && location.pathname === '/assets');
  
  const classNames = typeof className === 'function' 
    ? className({ isActive })
    : className || '';
    
  return (
    <Link 
      to={to}
      className={classNames}
      style={style}
    >
      {children}
    </Link>
  );
};

interface NavbarProps {
  onMenuToggle?: () => void;
  className?: string;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const Navbar = ({ onMenuToggle, className, isMobileMenuOpen = false, setIsMobileMenuOpen }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [notifications] = useState<number>(3);
  const [time, setTime] = useState<Date>(new Date());
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const { login,isAuthenticated  } = useAuth();
  console.log("isAuthenticated",isAuthenticated);



  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(!mobileMenuOpen);
    }
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  const { connect, isConnected, connectorName, loading: connectLoading, error: connectError } = useWeb3AuthConnect();
  const { disconnect, loading: disconnectLoading, error: disconnectError } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  console.log("user info is here L:",userInfo);
  console.log(":connecter name is here::",connectorName);
  const { address } = useAccount();
  console.log("address is here L:",address);

  const [avalancheFujiChain, setAvalancheFujiChain] = useState<Chain | null>(null);
  
  const chainId = useChainId();
  const { chains, switchChain, error: switchChainError } = useSwitchChain();
  console.log("chains are here @####@@",chains);

  // Find Unicorn Ultra Nebulas Testnet chain dynamically from available chains
  useEffect(() => {
    console.log("=== CHAIN DETECTION USEEFFECT ===");
    console.log("Conditions - isConnected:", isConnected, "address:", address, "chains:", chains, "chains.length:", chains?.length);
    
    if (isConnected && address && chains && chains.length > 0) {
      console.log("Searching for Unicorn Ultra Nebulas Testnet in chains:", chains);
      
      // Try multiple search criteria
      const unicornByName = chains.find(chain => chain.name === 'Unicorn Ultra Nebulas Testnet');
      const unicornById = chains.find(chain => chain.id === 2484);
      const unicornBySymbol = chains.find(chain => 
        chain.nativeCurrency?.symbol === 'U2U' || 
        chain.nativeCurrency?.symbol === 'U2u'
      );
      
      const unicornChain = unicornByName || unicornById || unicornBySymbol;
      
      if (unicornChain) {
        console.log('✅ Found Unicorn Ultra Nebulas Testnet chain:', unicornChain);
        setAvalancheFujiChain(unicornChain); // Reusing the state variable but for Unicorn Ultra
      } else {
        console.log('❌ Unicorn Ultra Nebulas Testnet chain not found');
        // Log all chain names for debugging
        console.log('Available chains:', chains.map(c => ({ 
          id: c.id, 
          name: c.name, 
          symbol: c.nativeCurrency?.symbol,
          decimals: c.nativeCurrency?.decimals
        })));
      }
    } else {
      console.log('❌ Conditions not met for chain detection');
      // Reset chain states when not connected
      setAvalancheFujiChain(null);
    }
  }, [isConnected, address, chains, chainId]);
  
  // Update balance hook to use Unicorn Ultra Nebulas Testnet
  const {data, isLoading, error: balanceError} = useBalance(
    address && avalancheFujiChain?.id 
      ? {
          address,
          chainId: avalancheFujiChain.id
        }
      : undefined
  );
  console.log("balance data is here",data);
  console.log("balance loading:", isLoading);
  console.log("balance error:", balanceError);
  console.log("address:", address);
  console.log("avalancheFujiChain:", avalancheFujiChain);
  
  // Check if the error is related to RPC issues
  const isRpcError = balanceError?.message?.includes('HTTP request failed') || 
                     balanceError?.message?.includes('Failed to fetch') ||
                     balanceError?.message?.includes('RPC');
  const isCorsError = balanceError?.message?.includes('CORS') ||
                      balanceError?.message?.includes('Access-Control-Allow-Origin');
  console.log("isRpcError:", isRpcError);
  console.log("isCorsError:", isCorsError);
  
  // Check if currently connected to Unicorn Ultra Nebulas Testnet
  const isOnAvalancheFuji = avalancheFujiChain && chainId === avalancheFujiChain.id;
  console.log("=== CHAIN COMPARISON ===");
  console.log("Current chainId:", chainId);
  console.log("Unicorn Ultra chainId:", avalancheFujiChain?.id);
  console.log("isOnUnicornUltra:", isOnAvalancheFuji);
  console.log("Unicorn Ultra Chain Object:", avalancheFujiChain);
  
  // Additional check for direct chain ID matching
  const isOnAvalancheFujiById = chainId === 2484;
  console.log("Direct chain ID check (2484):", isOnAvalancheFujiById);
  
  // Use either method for determining if we're on the correct chain
  const isOnCorrectChain = isOnAvalancheFuji || isOnAvalancheFujiById;
  console.log("Final chain check (isOnCorrectChain):", isOnCorrectChain);
  
  // Final summary logging
  console.log("=== FINAL SUMMARY ===");
  console.log("Should show balance?", isOnCorrectChain && avalancheFujiChain);
  console.log("Should show switch button?", !isOnCorrectChain && isConnected && avalancheFujiChain);

  // useEffect(() => {
  //   const timer = setInterval(() => setTime(new Date()), 1000);
  //   return () => clearInterval(timer);
  // }, []);

  // Load wallet address from memory (localStorage not available in artifacts)
  useEffect(() => {
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


const handleLogout = async () => {
  try {
    // Make logout request to backend
    await api.post('/admin/logout');
    
    // Clear authentication state
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Disconnect Web3Auth if connected
    await disconnect();
    
    // Redirect to home page after logout
    navigate('/');
  } catch (error) {
    console.error('Logout error:', error);
    // Still redirect to home page even if logout fails
    navigate('/');
  }
};

  const handleCopyAddress = async () => {
    if (address) {
      try {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy address:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = address;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  // Handle traditional login
// In Navbar.tsx, replace the handleLogin function with this:
const handleLogin = async (email: string, password: string) => {
  try {
    // Use the httpClient instance instead of direct fetch
    const response = await api.post('/admin/login', { email, password });
    
    if (response.data.success) {
      // Use the login function from useAuth hook
      login(response.data.token, response.data.user);
      // Close the modal
      setIsLoginModalOpen(false);
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

  const navItems = [
    { 
      icon: <Home className="h-6 w-6" />, 
      label: "Home", 
      href: "/", 
      gradient: "from-blue-500 to-cyan-500",
      exact: true
    },
    { 
      icon: <LayoutDashboard className="h-6 w-6" />, 
      label: "Dashboard", 
      href: "/dashboard", 
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: <ShoppingCart className="h-6 w-6" />, 
      label: "Orders", 
      href: "/orders", 
      gradient: "from-teal-500 to-cyan-600"
    },
    { 
      icon: <Package className="h-6 w-6" />, 
      label: "Assets", 
      href: "/assets",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Building2 className="h-6 w-6" />, 
      label: "Companies", 
      href: "/company",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      icon: <Users2 className="h-6 w-6" />, 
      label: "Investors", 
      href: "/customers",
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      icon: <Settings2 className="h-6 w-6" />, 
      label: "Configuration", 
      href: "/configuration",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <TooltipProvider delayDuration={100}>
      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin} 
      />
      
      <nav className={`
        fixed  left-0 right-0 rounded-6xl border border-gray-200/20 drop-shadow-lg dark:border-gray-800/20 h-16 z-50 transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/20 dark:border-gray-800/20' 
          : 'bg-white/60 dark:bg-gray-900/80 backdrop-blur-lg border-b border-transparent'
        }
      `}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-50" />
        
        <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          {/* Left side - Enhanced Logo and Navigation */}
          <div className="flex items-center gap-4">
            {/* Logo with animated effects - Always visible */}
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
            
            {/* Desktop Navigation with enhanced effects - Only when connected */}
            {isAuthenticated && (
              <div className="hidden lg:flex flex-wrap justify-center gap-2">
                {navItems.map((item, index) => {
                const isActive = item.exact 
                  ? location.pathname === item.href
                  : location.pathname.startsWith(item.href);
                  
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <NavLink
                          to={item.href}
                          isActive={isActive}
                          className={`group relative flex items-center justify-center p-4 h-14 w-14 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                            isActive
                              ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-current/25`
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80'
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="relative z-10 transition-transform duration-200 group-hover:rotate-12">
                            {item.icon}
                          </div>
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                            isActive ? 'opacity-10' : ''
                          }`} />
                        </NavLink>
                        <TooltipContent 
                          side="bottom"
                          className="bg-gray-800 dark:bg-gray-100 dark:text-gray-900"
                        >
                          <span className="font-semibold">{item.label}</span>
                        </TooltipContent>
                      </div>
                    </TooltipTrigger>
                  </Tooltip>
                );
              })}
              </div>
            )}

          </div>

          {/* Right side - Enhanced User Controls */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-12 w-12 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={handleMobileMenuToggle}
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>

                {/* AVAX Balance Display - Clean white design to match website */}
                {isOnCorrectChain && avalancheFujiChain && (
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {avalancheFujiChain.nativeCurrency?.symbol?.charAt(0) || 'A'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        {data ? (
                          <>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                              {parseFloat(formatUnits(data.value, data.decimals || 18)).toFixed(4)} {avalancheFujiChain.nativeCurrency?.symbol || 'U2U'}
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 leading-none">
                              {avalancheFujiChain.name}
                            </span>
                          </>
                        ) : isLoading ? (
                          <>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                              Loading...
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 leading-none">
                              {avalancheFujiChain.name}
                            </span>
                          </>
                        ) : isCorsError ? (
                          <>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                              CORS Error
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 leading-none">
                              {avalancheFujiChain.name}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                              Balance unavailable in dev mode
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                              (Works in production)
                            </span>
                          </>
                        ) : isRpcError ? (
                          <>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                              RPC Error
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 leading-none">
                              {avalancheFujiChain.name}
                            </span>
                          </>
                        ) : balanceError ? (
                          <>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                              Error loading balance
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 leading-none">
                              {avalancheFujiChain.name}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                              0.0000 {avalancheFujiChain.nativeCurrency?.symbol || 'U2U'}
                            </span>
                            <span className="text-xs text-blue-600 dark:text-blue-400 leading-none">
                              {avalancheFujiChain.name}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Switch to Unicorn Ultra Nebulas Testnet if not connected - Clean white design */}
                {!isOnCorrectChain && isConnected && avalancheFujiChain && (
                  <button
                    onClick={() => switchChain({ chainId: avalancheFujiChain.id })}
                    className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-xl shadow-sm hover:border-blue-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-1">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {avalancheFujiChain.nativeCurrency?.symbol?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                          Switch to {avalancheFujiChain.name}
                        </span>
                        <span className="text-xs text-blue-600 dark:text-blue-400 leading-none">
                          Click to connect
                        </span>
                      </div>
                    </div>
                  </button>
                )}

                {/* Divider */}
                <div className="w-px h-6 bg-gray-300/60 dark:bg-gray-600/60 mx-3" />
              </>
            ) : null}

            {/* Enhanced User Dropdown */}
            {isAuthenticated  ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-3 pl-2 pr-4 py-2 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-105 active:scale-95 group"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold text-lg">
                           {localStorage.getItem('user') ? 
                (JSON.parse(localStorage.getItem('user')!).firstName + JSON.parse(localStorage.getItem('user')!).lastName).charAt(0) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                        {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).name : 'User'}
                      </span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                          {'Connected'}
                        </span>
                        {address && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyAddress();
                            }}
                            className="ml-1 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                            title="Copy full address"
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
                  <DropdownMenuLabel className="font-semibold text-gray-900 dark:text-white px-2 py-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-800/50 my-1" />
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Profile</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Manage your profile</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  {address && (
                    <DropdownMenuItem 
                      onClick={handleCopyAddress}
                      className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
                          {copied ? (
                            <Check className="h-5 w-5 text-white" />
                          ) : (
                            <Copy className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {copied ? 'Copied!' : 'Copy Address'}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                            {address.slice(0, 12)}...{address.slice(-8)}
                          </div>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Settings</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Preferences & privacy</div>
                      </div>
                    </div>
                  </DropdownMenuItem>

{isConnected ? (
  <DropdownMenuItem 
    onClick={async () => {
      await disconnect();
      // Update UI state after disconnection
    }}
    className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group"
  >
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
        <Wallet className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">Disconnect Wallet</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Disconnect your Web3 wallet</div>
      </div>
    </div>
  </DropdownMenuItem>
) : (
  <DropdownMenuItem 
    onClick={() => {
      // Connect Web3 wallet
      connect();
    }}
    className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group"
  >
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
        <Wallet className="h-5 w-5 text-white" />
      </div>
      <div>
        <div className="font-medium text-gray-900 dark:text-white">Wallet</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">Connect Your Web3 wallet</div>
      </div>
    </div>
  </DropdownMenuItem>
)}


                 
                  
                  
                  
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
              // Sign in button when user is not connected
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                className="gap-2 bg-gradient-to-r from-blue-600  to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4 py-2 h-10 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isConnected ? (
          <div className="md:hidden px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
              />
            </div>
          </div>
        ) : null}

        {/* Mobile Navigation Menu - Full screen overlay when logged in */}
        {isAuthenticated && mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-40 border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="px-6 py-8 space-y-6 max-w-md mx-auto">
              {/* Mobile Navigation Header */}
              <div className="text-center border-b border-gray-200/50 dark:border-gray-800/50 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Navigation Menu</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Access all platform features</p>
              </div>

              {/* Mobile Navigation Items */}
              <div className="grid grid-cols-2 gap-4">
                {navItems.map((item, index) => {
                  const isActive = item.exact 
                    ? location.pathname === item.href
                    : location.pathname.startsWith(item.href);
                  
                  return (
                    <div
                      key={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <NavLink
                        to={item.href}
                        className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 border-2 ${
                          isActive
                            ? `bg-gradient-to-br ${item.gradient} text-white border-transparent shadow-lg`
                            : 'text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                        }`}
                      >
                        <div className={`mb-3 p-3 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-white/20 shadow-lg' 
                            : 'bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md group-hover:scale-110'
                        }`}>
                          <div className={`transition-colors duration-300 ${
                            isActive ? 'text-white' : `text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400`
                          }`}>
                            {React.cloneElement(item.icon, { className: "h-8 w-8" })}
                          </div>
                        </div>
                        <span className={`text-sm font-semibold transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'
                        }`}>
                          {item.label}
                        </span>
                        {isActive && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                        )}
                      </NavLink>
                    </div>
                  );
                })}
              </div>

              {/* Mobile User Info Section */}
              <div className="border-t border-gray-200/50 dark:border-gray-800/50 pt-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-500/30">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold text-lg">
                      {userInfo?.name ? userInfo.name.charAt(0) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {userInfo?.name || 'User'}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                      {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : 'Connected'}
                    </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Balance Display - Updated for Unicorn Ultra Nebulas Testnet */}
                {isOnCorrectChain && avalancheFujiChain && (
                  <div className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {avalancheFujiChain.nativeCurrency?.symbol?.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div>
                          {data ? (
                            <>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                {parseFloat(formatUnits(data.value, data.decimals || 18)).toFixed(4)} {avalancheFujiChain.nativeCurrency?.symbol || 'U2U'}
                              </div>
                              <div className="text-sm text-blue-600 dark:text-blue-400">
                                {avalancheFujiChain.name}
                              </div>
                            </>
                          ) : isLoading ? (
                            <>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                Loading...
                              </div>
                              <div className="text-sm text-blue-600 dark:text-blue-400">
                                {avalancheFujiChain.name}
                              </div>
                            </>
                          ) : isCorsError ? (
                            <>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                CORS Error
                              </div>
                              <div className="text-sm text-blue-600 dark:text-blue-400">
                                {avalancheFujiChain.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Balance unavailable in dev mode
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                (Works in production)
                              </div>
                            </>
                          ) : isRpcError ? (
                            <>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                RPC Error
                              </div>
                              <div className="text-sm text-blue-600 dark:text-blue-400">
                                {avalancheFujiChain.name}
                              </div>
                            </>
                          ) : balanceError ? (
                            <>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                Error loading balance
                              </div>
                              <div className="text-sm text-blue-600 dark:text-blue-400">
                                {avalancheFujiChain.name}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="font-semibold text-gray-900 dark:text-white">
                                0.0000 {avalancheFujiChain.nativeCurrency?.symbol || 'U2U'}
                              </div>
                              <div className="text-sm text-blue-600 dark:text-blue-400">
                                {avalancheFujiChain.name}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Menu Button */}
              <div className="pt-4 text-center">
                <Button
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl transition-all duration-200 hover:scale-105"
                >
                  Close Menu
                </Button>
              </div>
            </div>
          </div>
        )}

      </nav>
    </TooltipProvider>
  );
};

export default Navbar;