

import { useState, useEffect } from "react";
import { CircleUserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ConnectWallet from "@/components/web3/ConnectWallet";

function Header() {
  const [walletAddress, setWalletAddress] = useState('');

  // Load wallet address from localStorage on component mount
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setWalletAddress(storedAddress);
    }
  }, []);

  // Logout Handler: Clear Storage and Redirect
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/sign-in'; // Redirect to login page
  };

  const handleConnectWallet = async () => {
    try {
      //@ts-ignore
      if (window.ethereum == null) {
        alert(
          'MetaMask is not installed. Please install it to use this feature.'
        );
        return;
      } else {
     
      }
    } catch (error) {}
  };

  return (
    <header className='flex items-center w-full justify-between p-4  bg-gray-100'>
      <div className=''>
        <img src='/Ryzerlogo.svg' alt='Logo' className='h-8' />
      </div>
      <div />
      <div className='flex items-center gap-4'>
        {/* <ConnectWallet />/ */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon'>
              <CircleUserRound className='h-5 w-5' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className=''>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
