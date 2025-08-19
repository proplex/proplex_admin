import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface InputGroupControllerProps {
  name: string;
  selectName: string;
  label: string;
  options: Option[];
  control: any;
  disabled?: boolean;
  rules?: any;
  selectRules?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: any;
  position?: "left" | "right";
  inputType?: "text" | "number";
}

/**
 * A controlled input field with a dropdown select, integrated with React Hook Form
 * using InputGroupCombo
 * @param props - Component properties
 */
const InputGroupController: React.FC<InputGroupControllerProps> = ({
  label,
  rules,
  selectRules,
  errors,
  name,
  selectName,
  control,
  disabled,
  onChange,
  options = [],
  position = "right",
  inputType = "text",
}) => {
  const isRequired = rules?.required || selectRules?.required;
  const objectName = name.substring(0, name.indexOf("."));
  return (
    <div className="space-y-2">
      {/* InputGroupCombo */}
      <Label className={`${objectName && errors?.[objectName] ? "" : ""}`}>
        {label}
        {isRequired && <span> *</span>}
      </Label>
      <div
        className={`flex items-start ${
          position === "left"
            ? "flex-row-reverse space-x-2 space-x-reverse"
            : "flex-row space-x-2"
        }`}
      >
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({
            field: { onBlur, onChange: controllerOnChange, value },
            fieldState: { error },
          }) => (
            <div className="w-2/3">
              <Input
                id={name}
                disabled={disabled}
                type={inputType}
                onChange={(e) => {
                  const value = e.target.value || "";
                  if (onChange) {
                    onChange(e);
                  }
                  controllerOnChange(value);
                  if (inputType === 'number') {
                    const num = Number(value);
                    controllerOnChange(isNaN(num) ? '' : num);
                  }
                }}
                onBlur={onBlur}
                value={value || ""}
                className={`${error ? "border-red-500" : ""}`}
              />
              {objectName && errors?.[objectName] && (
                <span className=" text-sm">{error?.message}</span>
              )}
            </div>
          )}
        />
        <Controller
          name={selectName}
          control={control}
          rules={selectRules}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="w-1/3">
              <Select
                onValueChange={onChange}
                defaultValue={value}
                disabled={disabled}
                value={value || ""}
              >
                <SelectTrigger className={`${error ? "border-red-500" : ""}`}>
                  <SelectValue placeholder={`select `} />
                </SelectTrigger>
                <SelectContent
                  className={`max-h-[300px] overflow-y-auto ${
                    error ? "border-red-500" : ""
                  }`}
                >
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {objectName && errors?.[objectName] && (
                <span className=" text-sm">{error?.message}</span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default InputGroupController;
