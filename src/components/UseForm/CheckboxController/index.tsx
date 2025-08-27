import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';

interface CheckboxControllerProps {
  name: string;
  label: string;
  rules?: any;
  control: any;
  disabled?: boolean;
  bottomText?: string; // Added property
  bottomTextClass?: string; // Added property for custom bottom text styling
}

const CheckboxController: React.FC<CheckboxControllerProps> = ({
  name,
  label,
  rules,
  control,
  disabled = false,
  bottomText, // Added property
  bottomTextClass = 'text-gray-500', // Added property with default value
}) => {
  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      rules={rules}
      render={() => (
        <FormItem>
          <FormField
            control={control}
            name='items'
            render={({ field }) => {
              return (
                <FormItem className='flex flex-row space-x-3 space-y-2 items-center justify-start'>
                  <FormControl>
                    <Checkbox
                      checked={field?.value || false}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-normal'>{label}</FormLabel>
                </FormItem>
              );
            }}
          />
          {bottomText && (
            <span className={`text-sm ${bottomTextClass}`}>{bottomText}</span>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxController;