

import React from 'react';

interface LoadingSpinnerProps {
  size?: string; // e.g., 'h-5 w-5' for Tailwind classes
  color?: string; // e.g., 'text-white' or 'text-blue-600'
  className?: string; // Additional classes for customization
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'h-5 w-5',
  color = 'text-current',
  className = '',
}) => {
  return (
    <svg
      className={`animate-spin ${size} ${color} ${className}`}
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z'
      />
    </svg>
  );
};

export default LoadingSpinner;
