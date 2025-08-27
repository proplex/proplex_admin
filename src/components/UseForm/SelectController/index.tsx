import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

interface IndexProps {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | [];
  control: any;
  disabled?: boolean;
  rules?: any;
  onChange?: (value: string) => void;
  defaultValue?: string;
  onBlur?: () => void;
  bottomText?: string; // Added property
  bottomTextClass?: string; // Added property for custom bottom text styling
}

const Index: React.FC<IndexProps> = ({
  name,
  label,
  options = [],
  control,
  disabled = false,
  rules,
  defaultValue = "",
  onChange,
  onBlur,
  bottomText, // Added property
  bottomTextClass = 'text-gray-500', // Added property with default value
}) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        const isRequired = rules?.required;
        return (
          <FormItem>
            <FormLabel>
              {label}
              {isRequired && <span className="text-red-500"> *</span>}
            </FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                if (onChange) {
                  onChange(value);
                }
              }}
              defaultValue={field.value}
              disabled={disabled}
              value={field.value || ""}
              onOpenChange={() => {
                if (onBlur) {
                  onBlur();
                }
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${label}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {options.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {bottomText && (
              <span className={`text-sm ${bottomTextClass}`}>{bottomText}</span>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default Index;