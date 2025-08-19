

import React from 'react';
import { Building2, ArrowLeft, Users, FileText, ShieldCheck, DollarSign, Settings, BarChart } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href }) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 
      ${
        isActive
          ? 'bg-primary-50 text-primary-600 hover:bg-primary-100'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      } w-full`
    }
  >
    {icon}
    <span className="truncate">{label}</span>
  </NavLink>
);

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col w-64 min-h-screen overflow-y-auto bg-white border-r border-gray-200 shadow-sm transition-all duration-300 p-4 space-y-6`}
    >
      <div 
        className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
        onClick={() => navigate('/spv-list')}
      >
        <ArrowLeft className='w-5 h-5 text-gray-600' />
        <h1 className='text-sm font-medium text-gray-800'>Back To SPV List</h1>
      </div>

      <div className="space-y-2">
        <h1 className='text-2xl font-semibold text-gray-900'>SPV Details</h1>
        <p className='text-sm text-gray-500'>SPV Management Dashboard</p>
      </div>

      <nav className='flex-1 space-y-1'>
        <NavItem
          icon={<BarChart className='w-5 h-5' />}
          label='Overview'
          href='overview'
        />

        <NavItem
          icon={<Users className='w-5 h-5' />}
          label='Investors'
          href='investors'
        />

        <NavItem
          icon={<FileText className='w-5 h-5' />}
          label='Orders'
          href='orders'
        />

        <NavItem
          icon={<FileText className='w-5 h-5' />}
          label='Documents'
          href='documents'
        />

        <NavItem
          icon={<ShieldCheck className='w-5 h-5' />}
          label='Governance'
          href='governance'
        />

        <NavItem
          icon={<DollarSign className='w-5 h-5' />}
          label='Distribution'
          href='disturbution'
        />

        <NavItem
          icon={<Settings className='w-5 h-5' />}
          label='Settings'
          href='settings'
        />
      </nav>
    </div>
  );
}
