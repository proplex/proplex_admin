import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { 
  Home, 
  LayoutDashboard, 
  ShoppingCart, 
  Building2, 
  Server, 
  Settings, 
  Users2,
  Bell,
  Copy,
  Check,
  LogOut,
  User,
  Wallet,
} from "lucide-react";

// Type definitions
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface SidebarProps {
  user: User | null;
  isAuthenticated: boolean;
  onLogout: () => void;
  onLogin: () => void;
}

interface BaseComponentProps {
  children: React.ReactNode;
  className?: string;
}

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

const Sidebar = ({ user, isAuthenticated, onLogout, onLogin }: SidebarProps) => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState<string | null>(null);

  const navItems = [
    { 
      icon: <Home className="h-5 w-5" />, 
      label: "Home", 
      href: "/",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: "Dashboard", 
      href: "/dashboard",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      icon: <ShoppingCart className="h-5 w-5" />, 
      label: "Orders", 
      href: "/orders",
      gradient: "from-amber-500 to-orange-500"
    },
    { 
      icon: <Building2 className="h-5 w-5" />, 
      label: "Company", 
      href: "/company",
      gradient: "from-emerald-500 to-teal-500"
    },
    { 
      icon: <Users2 className="h-5 w-5" />, 
      label: "Investors", 
      href: "/customers",
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      icon: <Server className="h-5 w-5" />, 
      label: "Assets", 
      href: "/assets",
      gradient: "from-violet-500 to-indigo-500"
    },
    { 
      icon: <Wallet className="h-5 w-5" />, 
      label: "Wallet", 
      href: "/wallet",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  const handleCopyEmail = async () => {
    if (user?.email) {
      try {
        await navigator.clipboard.writeText(user.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    }
  };

  const getUserInitials = (): string => {
    if (!user) return 'U';
    return `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  const getUserName = (): string => {
    if (!user) return 'User';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email || 'User';
  };

  return (
    <div className="fixed left-4 top-4 bottom-4 w-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl flex flex-col items-center py-6 z-50 border border-gray-200/50 dark:border-gray-800/50 rounded-3xl transition-all duration-300 hover:shadow-2xl">
      {/* Logo */}
      <div className="mb-8">
        <div className="relative group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110">
            <span className="text-white font-bold text-xl">P</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center gap-4 w-full px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`group relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg scale-105`
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 hover:scale-105'
              }`}
              title={item.label}
              onMouseEnter={() => setIsHovering(item.href)}
              onMouseLeave={() => setIsHovering(null)}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.icon}
              {isActive && (
                <div 
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-l-full transition-all duration-300"
                />
              )}
              {/* Hover tooltip */}
              <span className={`
                absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                shadow-lg ${isHovering === item.href ? 'opacity-100' : 'opacity-0'}
              `}>
                {item.label}
                <span className={`
                  absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45
                  ${isHovering === item.href ? 'opacity-100' : 'opacity-0'}
                `} />
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="flex flex-col items-center gap-3 w-full px-2 border-t border-gray-200/50 dark:border-gray-800/50 pt-4">
        {/* Notification Bell */}
        <button 
          className="relative flex items-center justify-center w-14 h-14 rounded-2xl text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 group/notif"
        >
          <Bell className="h-5 w-5 transition-transform group-hover:notif:animate-bell" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse ring-2 ring-white dark:ring-gray-900" />
        </button>

        {/* User Avatar */}
        <div className="relative group">
          {isAuthenticated && user ? (
            <>
              <button 
                className="relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 hover:scale-105"
                aria-label="User menu"
              >
                <Avatar className="h-12 w-12 ring-2 ring-transparent group-hover:ring-blue-500/50 transition-all duration-300">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:scale-105 transition-transform duration-300">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 ring-1 ring-green-400" />
              </button>
              
              {/* User Menu Dropdown */}
              <div className="absolute left-full bottom-0 ml-4 mb-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50 origin-bottom">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 min-w-[220px] border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{getUserName()}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={handleCopyEmail}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-left transition-colors"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                      <span>{copied ? 'Copied!' : 'Copy Email'}</span>
                    </button>
                    
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center justify-center w-14 h-14 rounded-2xl text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
              aria-label="Sign in"
            >
              <User className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;