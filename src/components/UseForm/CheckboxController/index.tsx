

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
}

const CheckboxController: React.FC<CheckboxControllerProps> = ({
  name,
  label,
  rules,
  control,
  disabled = false,
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxController;
