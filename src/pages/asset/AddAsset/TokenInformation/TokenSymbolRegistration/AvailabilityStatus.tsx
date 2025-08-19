import { Button } from '@/components/ui/button';
import React from 'react';

type ReservationStatus = 'available' | 'unavailable';

interface AvailabilityStatusProps {
  status: ReservationStatus;
  checkedSymbol: string;
  onContinue: () => void;
  onTryAnother: () => void;
}

const AvailabilityStatus: React.FC<AvailabilityStatusProps> = ({
  status,
  checkedSymbol,
  onContinue,
  onTryAnother,
}) => {
  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-gray-500">Your Token Symbol</p>
        <h2 className="text-3xl font-bold">{checkedSymbol}</h2>
      </div>

      {status === 'available' ? (
        <div className="bg-green-50 border border-green-100 rounded p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="h-5 w-5 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-green-800 font-medium">Token Symbol is available!</h3>
              <p className="text-green-700 text-sm mt-1">
                Please note that your token symbol will be reserved for not more than 60 days if you do not use it.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-50 border border-red-100 rounded p-4 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <svg
                className="h-5 w-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">Token Symbol is not available</h3>
              <p className="text-red-700 text-sm mt-1">
                This token symbol is already taken or reserved. Please try a different symbol.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <Button
          onClick={status === 'available' ? onContinue : onTryAnother}
          className="w-full bg-black text-white py-3 rounded font-medium"
        >
          {status === 'available' ? 'Continue Reservation' : 'Try Another Symbol'}
        </Button>
      </div>
    </div>
  );
};

export default AvailabilityStatus;
