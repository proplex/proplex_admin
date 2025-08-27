import type React from "react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputControllerProps {
  name: string;
  disabled?: boolean;
  label: string;
  type?: "email" | "number" | "password" | "tel" | "text" | "url";
  control: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rules?: any;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  placeholder?: string;
  defaultValue?: string | number;
  bottomText?: string; // Added property
  bottomTextClass?: string; // Added property for custom bottom text styling
}

const InputController: React.FC<InputControllerProps> = ({
  name,
  label,
  type = "text",
  control,
  rules,
  disabled = false,
  icon,
  iconPosition = "left",
  onChange,
  placeholder,
  defaultValue,
  bottomText, // Added property
  bottomTextClass = 'text-gray-500', // Added property with default value
}) => {
  return (
    <FormField
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onBlur, onChange: controllerOnChange, value },
        fieldState: { error },
      }) => {
        const isRequired = rules?.required;
        const handleViewFile = () => {
          if (value) {
            window.open(value, "_blank");
          }
        };

        return (
          <FormItem>
            <FormLabel htmlFor={name}>
              {label}
              {isRequired && <span className="text-destructive"> *</span>}
            </FormLabel>
            <FormControl>
              <div className="relative flex items-center">
                {icon && iconPosition === "left" && (
                  <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
                    {icon}
                  </div>
                )}
                <Input
                  type={type}
                  disabled={disabled}
                  id={name}
                  placeholder={placeholder}
                  value={value !== null && value !== undefined ? value : ""}
                  onChange={(e) => {
                    const raw = e.target.value;
                    let finalValue: string | number = raw;
                    if (type === "number") {
                      finalValue = raw === "" ? "" : Number(raw);
                    }
                    controllerOnChange(finalValue);
                    onChange?.(e);
                  }}
                  onBlur={onBlur}
                  className={cn(
                    icon && iconPosition === "left" && "pl-10",
                    icon && iconPosition === "right" && "pr-10",
                    type === "url" && value && "rounded-r-none"
                  )}
                />
                {icon && iconPosition === "right" && type !== "url" && (
                  <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
                    {icon}
                  </div>
                )}
                {type === "url" && value && (
                  <Button
                    onClick={handleViewFile}
                    variant="outline"
                    type="button"
                    className="h-10 right-0 rounded-l-none"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </FormControl>
            {bottomText && (
              <span className={`text-sm ${bottomTextClass}`}>{bottomText}</span>
            )}
            {error && <FormMessage>{error.message}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
};

export default InputController;