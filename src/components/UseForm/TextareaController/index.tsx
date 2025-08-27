import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface TextareaControllerProps {
  name: string;
  disabled?: boolean;
  label: string;
  control: any;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rules?: any;
  bottomText?: string;
  bottomTextClass?: string; // Added property for custom bottom text styling
}

const TextareaController: React.FC<TextareaControllerProps> = ({
  name,
  label,
  control,
  rules,
  bottomText,
  bottomTextClass = 'text-gray-500', // Default class
  disabled = false,
  onChange,
}) => {
  return (
    <FormField
      name={name}
      control={control}
      key={name}
      rules={rules}
      render={({
        field: { onBlur, onChange: controllerOnChange, value },
        fieldState: { error },
      }) => {
        const isRequired = rules?.required;
        return (
          <FormItem>
            <FormLabel htmlFor={name}>
              {label}
              {isRequired && <span className='text-red-500'>*</span>}
            </FormLabel>
            <FormControl>
              <div>
                <Textarea
                  disabled={disabled}
                  id={name}
                  value={value || ''}
                  onChange={(e) => {
                    controllerOnChange(e);
                    onChange && onChange(e);
                  }}
                />
                {bottomText && (
                  <span className={`text-sm ${bottomTextClass}`}>{bottomText}</span>
                )}
              </div>
            </FormControl>
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default TextareaController;