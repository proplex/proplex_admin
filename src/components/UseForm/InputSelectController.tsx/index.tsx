



import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type React from "react"
import { Controller } from "react-hook-form"

interface Option {
  value: string
  label: string
}

interface InputSelectControllerProps {
  name: string
  selectName: string
  label: string
  options: Option[]
  control: any
  disabled?: boolean
  rules?: any
  selectRules?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errors?: any
  position?: "left" | "right"
}

/**
 * A controlled input field with a dropdown select, integrated with React Hook Form
 * using InputGroupCombo
 * @param props - Component properties
 */
const InputSelectController: React.FC<InputSelectControllerProps> = ({
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
}) => {
  const isRequired = rules?.required || selectRules?.required
  const objectName = name.substring(0, name.indexOf("."))

  return (
    <div className="space-y-2">
      <Label className={`${objectName && errors?.[objectName] ? "" : ""}`}>
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </Label>
      <div className="flex">
        <div className={`flex ${position === "left" ? "flex-row-reverse" : "flex-row"} w-full`}>
          <Controller
            name={selectName}
            control={control}
            rules={selectRules}
            render={({ field: { onChange, value }, fieldState: { error: selectError } }) => (
              <div className={`${position === "left" ? "ml-2" : "mr-0"} w-1/4`}>
                <Select onValueChange={onChange} defaultValue={value} disabled={disabled} value={value || ""}>
                  <SelectTrigger
                    className={`
                      ${selectError || errors?.[objectName] ? "border-red-500" : ""}
                      ${position === "left" ? "rounded-l-none" : "rounded-r-none border-r-0"}
                      h-10
                    `}
                  >
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px] overflow-y-auto">
                    {options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onBlur, onChange: controllerOnChange, value }, fieldState: { error: inputError } }) => (
              <div className={`${position === "left" ? "mr-2" : "ml-0"} w-3/4`}>
                <Input
                  id={name}
                  disabled={disabled}
                  onChange={(e) => {
                    if (onChange) {
                      onChange(e)
                    }
                    const value = e.target.value || ""
                    controllerOnChange(value)
                  }}
                  onBlur={onBlur}
                  value={value || ""}
                  className={`
                    ${inputError || errors?.[objectName] ? "border-red-500" : ""}
                    ${position === "left" ? "rounded-r-none border-r-0" : "rounded-l-none"}
                    h-10
                  `}
                  placeholder="Phone number"
                  type="tel"
                />
              </div>
            )}
          />
        </div>
      </div>
      {/* Consolidated error message display */}
      {objectName && errors?.[objectName] && (
        <span className=" text-sm">{errors[objectName]?.message}</span>
      )}
    </div>
  )
}

export default InputSelectController

