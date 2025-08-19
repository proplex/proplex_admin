
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../Navbar';

const Main: React.FC = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };

  return (
    <div className='flex min-h-screen w-full flex-col bg-background relative'>
      {/* Navbar */}
      <header className='fixed top-0 left-0 right-0 z-40 w-full h-16'>
        <Navbar onMenuToggle={toggleMobileNav} />
      </header>

      {/* Main content - Add padding-top to account for fixed navbar height */}
      <main className='flex-1 pt-16 md:pt-16'>
        <div className='container mx-auto px-4 sm:px-6 py-4 sm:py-6 w-full'>
          <Outlet />
        </div>
      </main>

      {/* Footer removed */}
    </div>
  );
};

export default Main;
