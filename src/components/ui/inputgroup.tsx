

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Option {
  value: string;
  label: string;
}

interface InputGroupProps {
  id: string;
  label: string;
  inputType?: React.HTMLInputTypeAttribute; // All HTML input types
  value: string;
  selectValue: string;
  options: Option[];
  onValueChange: (value: string) => void;
  onSelectChange: (value: string) => void;
  pattern?: string; // For regex validation
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
  selectClassName?: string;
  inputPosition?: 'left' | 'right';
  placeholder?: string;
}

/**
 * A reusable, accessible input field paired with a dropdown select component
 * supporting all HTML input types with configurable position
 * @param props - Component properties
 */
const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      id,
      label,
      inputType = 'text',
      value,
      selectValue,
      options,
      onValueChange,
      onSelectChange,
      placeholder,
      errorMessage,
      disabled = false,
      className,
      inputClassName,
      selectClassName,
      inputPosition = 'left',
    },
    ref
  ) => {
    const inputElement = (
      <Input
        disabled={disabled}
        id={`${id}-input`}
        type={inputType}
        className={cn(inputClassName)}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        aria-label={label}
        aria-describedby={`${id}-error-message`}
      />
    );

    const selectElement = (
      <Select value={selectValue}>
        <SelectTrigger
          disabled={disabled}
          id={`${id}-select`}
          className={cn('w-full sm:w-[180px]', selectClassName)}
          aria-label={`${label} option selection`}
          // onChange={(value) => onSelectChange(value)}
        >
          <SelectValue placeholder='Select option' />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'grid gap-2',
          'sm:grid-cols-[1fr_auto] sm:items-center',
          inputPosition === 'right' && 'sm:grid-cols-[auto_1fr]',
          className
        )}
      >
        <div
          className={cn(
            'space-y-2',
            inputPosition === 'right' && 'sm:space-y-0 sm:flex sm:items-center',
            inputPosition === 'left' && 'sm:space-y-0 sm:flex sm:items-center'
          )}
        >
          {inputPosition === 'left' ? (
            <>
              {inputElement}
              {selectElement}
            </>
          ) : (
            <>
              {selectElement}
              {inputElement}
            </>
          )}
        </div>
      </div>
    );
  }
);

InputGroup.displayName = 'InputGroup';

export { InputGroup };
