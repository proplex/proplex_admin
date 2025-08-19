import React, { useState } from 'react';
import TokenSymbolInput from './TokenSymbolInput';
import AvailabilityStatus from './AvailabilityStatus';
import { useFormContext } from 'react-hook-form';

// Define the different states the component can be in
type ReservationStatus = 'idle' | 'checking' | 'available' | 'unavailable';

// Props for the component
interface TokenSymbolReservationProps {
  onReservationComplete?: (symbol: string) => void;
}

// Fee info component
const FeeInfo: React.FC = () => {
  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center mr-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 9L19 4M19 4H14M19 4V9M10 15L5 20M5 20H10M5 20V15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-gray-600 text-sm">Token Symbol Reservation fee</span>
      </div>
      <div className="flex items-center">
        <span className="text-purple-500 mx-2"> 2000 RyzerX Tokens</span>
        <button type='button' className="text-gray-400 cursor-pointer" aria-label="More information">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 16V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8H12.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const TokenSymbolReservation: React.FC<TokenSymbolReservationProps> = ({
  onReservationComplete,
}) => {
    const {setValue}= useFormContext();
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [status, setStatus] = useState<ReservationStatus>('idle');
  const [checkedSymbol, setCheckedSymbol] = useState('');

  // Function to check token availability
  const checkAvailability = async () => {
    if (!tokenSymbol.trim()) return;
    
    setStatus('checking');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo: tokens containing "ORIO" are unavailable
      const isAvailable = !tokenSymbol.toUpperCase().includes('ORIO');
      
      setCheckedSymbol(tokenSymbol.toUpperCase());
      setStatus(isAvailable ? 'available' : 'unavailable');
    } catch (error) {
      console.error('Error checking availability:', error);
      setStatus('idle');
    }
  };

  const handleContinueReservation = () => {
    setValue('tokenInformation.tokenSymbol', tokenSymbol);
    if (onReservationComplete) {
      onReservationComplete(checkedSymbol);
    }
  };


  const handleTryAnother = () => {
    setTokenSymbol('');
    setStatus('idle');
  };

  return (
    <div className="max-w-md mx-auto flex flex-col py-12">
      {/* Header */}
      <div className="bg-gray-100 p-4 mb-4">
        <h1 className="text-xl font-bold text-center">Token Symbol Reservation</h1>
      </div>

      {/* Content */}
      <div className="bg-white p-4 rounded shadow-sm">
        {status === 'checking' ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-t-2 border-gray-900 rounded-full animate-spin mb-4"></div>
            <p className="text-lg">Checking availability...</p>
          </div>
        ) : status === 'available' || status === 'unavailable' ? (
          <AvailabilityStatus
            status={status}
            checkedSymbol={checkedSymbol}
            onContinue={handleContinueReservation}
            onTryAnother={handleTryAnother}
          />
        ) : (
          <TokenSymbolInput
            tokenSymbol={tokenSymbol}
            setTokenSymbol={setTokenSymbol}
            onCheckAvailability={checkAvailability}
          />
        )}
      </div>

      {/* Footer Fee Info - only shown on idle and checking states */}
      {(status === 'idle' || status === 'checking') && <FeeInfo />}
    </div>
  );
};

export default TokenSymbolReservation;