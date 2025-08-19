import React, { useState, useEffect } from 'react';
import {
  Building2,
  Settings,
  Users2Icon,
  UserCogIcon,
  Star,
  Bell,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  FileChartColumnIncreasing,
  Package,
  ClipboardList,
  User,
  Layers2,
  Layout,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  href,
  isCollapsed,
  onClick,
}) => (
  <NavLink
    to={href}
    onClick={onClick}
    className={({ isActive }) =>
      `group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg 
      transition-all duration-200 ease-in-out relative
      ${isActive
        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      } ${isCollapsed ? 'justify-center px-2' : ''}`
    }
  >
    <div className={`transition-transform duration-200 ${isCollapsed ? 'scale-110' : 'scale-100'}`}>
      {icon}
    </div>
    {!isCollapsed && (
      <span className="transition-opacity duration-200 opacity-100">
        {label}
      </span>
    )}
    
    {/* Tooltip for collapsed state */}
    {isCollapsed && (
      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
                    rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                    whitespace-nowrap z-50 pointer-events-none">
        {label}
        <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 
                      border-r-4 border-r-gray-900 border-y-4 border-y-transparent"></div>
      </div>
    )}
  </NavLink>
);

interface CollapsibleSidebarProps {
  className?: string;
}

export default function Sidebar({ className = '' }: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist collapse state
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/sign-in';
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleMobile}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${className}
          ${isCollapsed ? 'w-16' : 'w-64'} 
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          fixed md:relative z-50 md:z-auto
          flex flex-col h-full
          bg-white border-r border-gray-200 
          transition-all duration-300 ease-in-out
          shadow-lg md:shadow-none
        `}
      >
        {/* Header */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4'} py-4 border-b border-gray-100`}>
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Layers2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Dashboard</span>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Layers2 className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <nav className="space-y-2">
            {/* Main Navigation */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Main
                </div>
              )}
              
              <NavItem
                icon={<LayoutDashboard className="w-5 h-5" />}
                label="Dashboard"
                href="/dashboard"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
              
              <NavItem
                icon={<Package className="w-5 h-5" />}
                label="Assets"
                href="/assets"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
              
              <NavItem
                icon={<Building2 className="w-5 h-5" />}
                label="SPVs"
                href="/spv-list"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
              
              <NavItem
                icon={<ClipboardList className="w-5 h-5" />}
                label="Orders"
                href="/orders"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
              
              <NavItem
                icon={<Users2Icon className="w-5 h-5" />}
                label="Investors"
                href="/customers"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200"></div>

            {/* Secondary Navigation */}
            <div className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Management
                </div>
              )}
              
              <NavItem
                icon={<FileChartColumnIncreasing className="w-5 h-5" />}
                label="Reports"
                href="/reports"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
              
              <NavItem
                icon={<User className="w-5 h-5" />}
                label="Employees"
                href="/employees"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
              
              <NavItem
                icon={<Star className="w-5 h-5" />}
                label="Reviews"
                href="/reviews"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
              
              <NavItem
                icon={<Bell className="w-5 h-5" />}
                label="Notifications"
                href="/notifications"
                isCollapsed={isCollapsed}
                onClick={closeMobile}
              />
            </div>
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-3 space-y-1">
          {!isCollapsed && (
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              System
            </div>
          )}
          
          <NavItem
            icon={<UserCogIcon className="w-5 h-5" />}
            label="Config"
            href="/config"
            isCollapsed={isCollapsed}
            onClick={closeMobile}
          />
          
          <NavItem
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            href="/settings"
            isCollapsed={isCollapsed}
            onClick={closeMobile}
          />

          {/* Logout Button */}
          <button 
            onClick={() => {
              handleLogout();
              closeMobile();
            }} 
            className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg 
                      transition-all duration-200 ease-in-out w-full text-left
                      text-red-600 hover:bg-red-50 hover:text-red-700
                      ${isCollapsed ? 'justify-center px-2' : ''}`}
          >
            <div className={`transition-transform duration-200 ${isCollapsed ? 'scale-110' : 'scale-100'}`}>
              <LogOut className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <span className="transition-opacity duration-200 opacity-100">
                Logout
              </span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
                            rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                            whitespace-nowrap z-50 pointer-events-none">
                Logout
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 
                              border-r-4 border-r-gray-900 border-y-4 border-y-transparent"></div>
              </div>
            )}
          </button>

          {/* Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className={`group hidden md:flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg 
                      transition-all duration-200 ease-in-out w-full text-left
                      text-gray-600 hover:bg-gray-50 hover:text-gray-700
                      ${isCollapsed ? 'justify-center px-2' : ''}`}
          >
            <div className={`transition-transform duration-200 ${isCollapsed ? 'scale-110' : 'scale-100'}`}>
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </div>
            {!isCollapsed && (
              <span className="transition-opacity duration-200 opacity-100">
                Collapse
              </span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
                            rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 
                            whitespace-nowrap z-50 pointer-events-none">
                Expand
                <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 
                              border-r-4 border-r-gray-900 border-y-4 border-y-transparent"></div>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}