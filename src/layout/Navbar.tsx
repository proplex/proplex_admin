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
  LogIn
} from "lucide-react";

// Web3Auth imports
import { useWeb3AuthConnect, useWeb3AuthDisconnect, useWeb3AuthUser } from "@web3auth/modal/react";
import { useAccount } from "wagmi";


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
}

const Navbar = ({ onMenuToggle, className }: NavbarProps) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [notifications] = useState<number>(3);
  const [time, setTime] = useState<Date>(new Date());
  const navigate = useNavigate();

  const { connect, isConnected, connectorName, loading: connectLoading, error: connectError } = useWeb3AuthConnect();
  const { disconnect, loading: disconnectLoading, error: disconnectError } = useWeb3AuthDisconnect();
  const { userInfo } = useWeb3AuthUser();
  const { address } = useAccount();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Load wallet address from memory (localStorage not available in artifacts)
  useEffect(() => {
    // setWalletAddress('0x742d35Cc6aB6a3C4d5B2...'); // Mock wallet address
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await disconnect();
      // Redirect to home page after logout
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect to home page even if disconnect fails
      navigate('/');
    }
  };

  const navItems = [
    { 
      icon: <Home className="h-4 w-4" />, 
      label: "Home", 
      href: "/", 
      gradient: "from-blue-500 to-cyan-500",
      exact: true
    },
    { 
      icon: <LayoutDashboard className="h-4 w-4" />, 
      label: "Dashboard", 
      href: "/dashboard", 
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: <ShoppingCart className="h-4 w-4" />, 
      label: "Orders", 
      href: "/orders", 
      gradient: "from-teal-500 to-cyan-600"
    },
    { 
      icon: <Package className="h-4 w-4" />, 
      label: "Assets", 
      href: "/assets",
      gradient: "from-green-500 to-emerald-500"
    },
    { 
      icon: <Building2 className="h-4 w-4" />, 
      label: "Companies", 
      href: "/company",
      gradient: "from-orange-500 to-red-500"
    },
    { 
      icon: <Users2 className="h-4 w-4" />, 
      label: "Investors", 
      href: "/customers",
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      icon: <Settings2 className="h-4 w-4" />, 
      label: "Configuration", 
      href: "/configuration",
      gradient: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <TooltipProvider delayDuration={100}>
      <nav className={`
        fixed  left-0 right-0 rounded-6xl border border-gray-200/20 drop-shadow-lg dark:border-gray-800/20 h-16 z-50 transition-all duration-500 ease-out
        ${isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-200/20 dark:border-gray-800/20' 
          : 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg border-b border-transparent'
        }
        ${!isConnected ? 'justify-center' : ''}
      `}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-50" />
        
        <div className={`relative mx-auto flex h-16 w-full max-w-7xl items-center ${!isConnected ? 'justify-center' : 'justify-between'} px-6`}>
          {/* Left side - Enhanced Logo and Navigation */}
          <div className="flex items-center gap-4">
            {/* Logo with animated effects */}
            <div className="flex items-center gap-3 pr-4 border-r border-gray-200/30 dark:border-gray-700/30">
              {/* <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition-all duration-500" />
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 p-2 rounded-lg">
                  <img 
                    src="/favicon.png" 
                    alt="Proplex Logo" 
                    className="h-5 w-5 object-contain" 
                  />
                </div>
              </div> */}
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                  Proplex
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            
            {/* Desktop Navigation with enhanced effects */}
            {isConnected ? (
              <div className="hidden lg:flex flex-wrap justify-center gap-1">
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
                          className={`group relative flex items-center justify-center p-3 h-11 w-11 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
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
                          side="right"
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
            ) : null}

          </div>

          {/* Right side - Enhanced User Controls */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-10 w-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-110 active:scale-95"
                  onClick={onMenuToggle}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-300/60 dark:bg-gray-600/60 mx-2" />

                {/* Settings Button */}
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-10 w-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-110 active:scale-95 group"
                >
                  <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400 transition-all duration-500 group-hover:text-purple-600 group-hover:rotate-90" />
                </Button>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-300/60 dark:bg-gray-600/60 mx-3" />
              </>
            ) : null}

            {/* Enhanced User Dropdown */}
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="gap-3 pl-2 pr-4 py-2 h-10 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 hover:scale-105 active:scale-95 group"
                  >
                    <div className="relative">
                      <Avatar className="h-8 w-8 ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm">
                          {userInfo?.name ? userInfo.name.charAt(0) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                    </div>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white leading-none">
                        {userInfo?.name || 'User'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 leading-none mt-0.5">
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-hover:text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-64 rounded-xl border border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-xl shadow-black/5 animate-in slide-in-from-top-2 duration-200 p-2"
                >
                  <DropdownMenuLabel className="font-semibold text-gray-900 dark:text-white px-2 py-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-800/50 my-1" />
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Profile</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Manage your profile</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <Settings className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Settings</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Preferences & privacy</div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className="rounded-lg p-3 transition-all duration-150 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">$</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Billing</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Plans & payments</div>
                      </div>
                    </div>
                  </DropdownMenuItem>

                  
                  <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-800/50 my-2" />
                  
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="rounded-lg p-3 text-red-600 dark:text-red-400 transition-all duration-150 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                        <LogOut className="h-4 w-4 text-white transition-transform duration-200 group-hover:scale-110" />
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
                onClick={() => connect()}
                disabled={connectLoading}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-4 py-2 h-10 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
                {connectLoading && (
                  <div className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isConnected ? (
          <div className="md:hidden px-6 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-200"
              />
            </div>
          </div>
        ) : null}

      </nav>
    </TooltipProvider>
  );
};

export default Navbar;