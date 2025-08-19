



import type React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

interface ButtonControllerProps {
  name: string;
  label?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  value: string;
}

const ButtonController: React.FC<ButtonControllerProps> = ({
  name,
  label,
  disabled = false,
  icon,
  onClick,
  className,
  value,
}) => {
  const { setValue, watch } = useFormContext();
  const isSelected = watch(name) === value;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue(name, value);
    onClick && onClick(e);
  };
  return (
    <button
      id={value}
      disabled={disabled}
      onClick={handleClick}
      type='button'
      className={cn(
        className,
        disabled && 'cursor-not-allowed opacity-50 bg-gray-200',
        isSelected
          ? 'border-2 border-[#000000] bg-gray-100'
          : ' text-gray-500 border-2 border-[#E5E7EB]',
        'flex flex-col items-center justify-center gap-2 duration-200 rounded-lg p-2'
      )}
    >
      {icon}
      <p className='text-[#333] font-normal'>{label}</p>
    </button>
  );
};

export default ButtonController;
