import React from 'react';
import { Button } from '../../../../../../components/ui/button';

interface ValuationHeaderProps {
  onAdd: () => void;
}

const ValuationHeader: React.FC<ValuationHeaderProps> = ({ onAdd }) => {
  return (
    <div className='flex justify-between items-center'>
      <h1 className='text-lg font-bold text-gray-800'>Valuation</h1>
      <Button
        type='button'
        className='text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2'
        onClick={onAdd}
      >
        <span className='text-lg'>+</span>
        <span>Add Valuation</span>
      </Button>
    </div>
  );
};

export default ValuationHeader;
