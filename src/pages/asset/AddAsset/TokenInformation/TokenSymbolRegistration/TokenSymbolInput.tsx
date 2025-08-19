import { Button } from '@/components/ui/button';
import React from 'react';

interface TokenSymbolInputProps {
  tokenSymbol: string;
  setTokenSymbol: (value: string) => void;
  onCheckAvailability: () => void;
}

const TokenSymbolInput: React.FC<TokenSymbolInputProps> = ({
  tokenSymbol,
  setTokenSymbol,
  onCheckAvailability,
}) => {
  return (
    <div>
      <div className="mb-6">
        <label htmlFor="tokenSymbol" className="block font-medium mb-1">
          Enter Security Token Symbol
        </label>
        <input
          type="text"
          id="tokenSymbol"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
          placeholder="e.g., PROP001"
          className="w-full border border-gray-300 p-2 rounded"
          maxLength={10}
        />
        <p className="text-sm text-gray-500 mt-1">
          Enter a unique token symbol to check availability
        </p>
      </div>

      <Button
        onClick={onCheckAvailability}
        disabled={!tokenSymbol.trim()}
        className="w-full text-white py-3 rounded font-medium disabled:opacity-50"
      >
        Check Availability
      </Button>
    </div>
  );
};

export default TokenSymbolInput;
