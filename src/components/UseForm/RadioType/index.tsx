

import React from 'react';
import { Controller } from 'react-hook-form';

interface RadioControllerProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  control: any;
  rules?: any;
  disabled?: boolean;
}

const RadioController: React.FC<RadioControllerProps> = ({
  name,
  label,
  options,
  control,
  rules,
  disabled,
}) => {
  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div>
            {options.map((option) => (
              <div key={option.value} className='flex items-center space-x-2'>
                <input
                  type='radio'
                  id={`${name}-${option.value}`}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  disabled={disabled}
                />
                <label htmlFor={`${name}-${option.value}`} className='text-sm'>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      />
    </div>

    // <FormField
    //   control={control}
    //   name={name}
    //   render={({ field }) => (
    //     <FormItem className='space-y-3'>
    //       <FormControl>
    //         <RadioGroup
    //           onValueChange={field.onChange}
    //           defaultValue={field.value}
    //           className='flex flex-col space-y-1'
    //         >
    //           {options.map((option) => (
    //             <FormItem className='flex items-center space-x-3 space-y-0'>
    //               <FormControl>
    //                 <RadioGroupItem value={option.value} />
    //               </FormControl>
    //               <FormLabel className='font-normal'>{option.label}</FormLabel>
    //             </FormItem>
    //           ))}
    //         </RadioGroup>
    //       </FormControl>
    //       <FormMessage />
    //     </FormItem>
    //   )}
    // />
  );
};

export default RadioController;
