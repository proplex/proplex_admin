
import React from 'react';
import { Outlet } from 'react-router-dom';
const Header = React.lazy(() => import('../Header'));
const Footer = React.lazy(() => import('../Footer'));
const Sidebar = React.lazy(() => import('./Sidebar'));

const Main: React.FC = () => {
  return (
    <div className='dark:bg-boxdark-2 dark:text-bodydark'>
      <div className='flex h-screen overflow-hidden'>
        <Sidebar />
        <div className='relative flex flex-1 flex-col overflow-hidden'>
          <Header />
          <main className='flex-1 overflow-y-auto'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Main;
