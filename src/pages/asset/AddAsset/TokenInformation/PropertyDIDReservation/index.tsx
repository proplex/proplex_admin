import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

// Define the different states the component can be in
type ReservationStatus = 'idle' | 'checking' | 'available' | 'unavailable' | 'reserved';

// Props for the component
interface PropertyDIDReservationProps {
  onReservationComplete?: (did: string) => void;
}

// Property DID Input Component
const PropertyDIDInput: React.FC<{
  propertyDID: string;
  setPropertyDID: (value: string) => void;
  onCheckAvailability: () => void;
}> = ({ propertyDID, setPropertyDID, onCheckAvailability }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    setPropertyDID(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && propertyDID.trim()) {
      onCheckAvailability();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Reserve Your Property DID</h2>
        <p className="text-gray-600 max-w-sm mx-auto">
          Create a unique decentralized identifier for your real estate asset on the blockchain
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Property DID Namespace
          </label>
          <div className="relative">
            <div className="flex items-center border-2 border-gray-200 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <span className="px-4 py-3 text-gray-500 bg-gray-50 rounded-l-xl border-r border-gray-200 text-sm">
                did:proplex:
              </span>
              <input
                type="text"
                value={propertyDID}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="property-identifier"
                className="flex-1 px-4 py-3 rounded-r-xl focus:outline-none text-gray-900"
                maxLength={50}
              />
            </div>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Use letters, numbers, and hyphens only</p>
            <p>• Must be unique across the Proplex network</p>
            <p>• Cannot be changed once reserved</p>
          </div>
        </div>

        <button
          onClick={onCheckAvailability}
          disabled={!propertyDID.trim()}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Check Availability
        </button>
      </div>
    </div>
  );
};

// Availability Status Component
const AvailabilityStatus: React.FC<{
  status: ReservationStatus;
  checkedDID: string;
  onContinue: () => void;
  onTryAnother: () => void;
}> = ({ status, checkedDID, onContinue, onTryAnother }) => {
  const isAvailable = status === 'available';

  return (
    <div className="text-center space-y-6">
      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
        isAvailable ? 'bg-green-100' : 'bg-red-100'
      }`}>
        {isAvailable ? (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      <div className="space-y-2">
        <h3 className={`text-xl font-bold ${
          isAvailable ? 'text-green-700' : 'text-red-700'
        }`}>
          {isAvailable ? 'DID Available!' : 'DID Unavailable'}
        </h3>
        
        <div className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
          <code className="text-sm text-gray-700 font-mono break-all">
            did:proplex:{checkedDID}
          </code>
        </div>

        <p className={`text-sm ${
          isAvailable ? 'text-green-600' : 'text-red-600'
        }`}>
          {isAvailable 
            ? 'This Property DID is available for reservation'
            : 'This Property DID has already been claimed'
          }
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onTryAnother}
          className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors"
        >
          Try Another
        </button>
        {isAvailable && (
          <button
            onClick={onContinue}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Reserve DID
          </button>
        )}
      </div>
    </div>
  );
};

// Fee info component
const FeeInfo: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mt-6 border border-blue-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Property DID Reservation</div>
            <div className="text-xs text-gray-600">One-time registration fee</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            500 PLX
          </div>
          <div className="text-xs text-gray-500">≈ $25.00 USD</div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-blue-200">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Network Fee:</span>
            <span>5 PLX</span>
          </div>
          <div className="flex justify-between">
            <span>DID Registration:</span>
            <span>495 PLX</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyDIDReservation: React.FC<PropertyDIDReservationProps> = ({
  onReservationComplete,
}) => {
  const { setValue } = useFormContext();
  const [propertyDID, setPropertyDID] = useState('');
  const [status, setStatus] = useState<ReservationStatus>('idle');
  const [checkedDID, setCheckedDID] = useState('');

  // Function to check DID availability
  const checkAvailability = async () => {
    if (!propertyDID.trim()) return;
    
    setStatus('checking');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo: DIDs containing "unavailable" or "taken" are unavailable
      const isAvailable = !propertyDID.toLowerCase().includes('unavailable') && 
                         !propertyDID.toLowerCase().includes('taken');
      
      setCheckedDID(propertyDID.toLowerCase());
      setStatus(isAvailable ? 'available' : 'unavailable');
    } catch (error) {
      console.error('Error checking availability:', error);
      setStatus('idle');
    }
  };

  const handleContinueReservation = () => {
    setValue('propertyInformation.propertyDID', `did:proplex:${checkedDID}`);
    if (onReservationComplete) {
      onReservationComplete(`did:proplex:${checkedDID}`);
    }
  };

  const handleTryAnother = () => {
    setPropertyDID('');
    setStatus('idle');
    setCheckedDID('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Proplex
            </span>
          </div>
          <div className="text-sm text-gray-500">Decentralized Real Estate Platform</div>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
          {status === 'checking' ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold text-gray-900">Checking Availability</p>
                <p className="text-sm text-gray-600">Verifying DID on blockchain...</p>
              </div>
            </div>
          ) : status === 'available' || status === 'unavailable' ? (
            <AvailabilityStatus
              status={status}
              checkedDID={checkedDID}
              onContinue={handleContinueReservation}
              onTryAnother={handleTryAnother}
            />
          ) : (
            <PropertyDIDInput
              propertyDID={propertyDID}
              setPropertyDID={setPropertyDID}
              onCheckAvailability={checkAvailability}
            />
          )}
        </div>

        {/* Fee Info - only shown on idle and checking states */}
        {(status === 'idle' || status === 'checking') && <FeeInfo />}
      </div>
    </div>
  );
};

export default PropertyDIDReservation;