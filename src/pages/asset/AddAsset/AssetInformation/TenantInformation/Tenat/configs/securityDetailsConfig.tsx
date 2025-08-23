import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { TENANT_TYPE } from "@/constants/global";
import { useFormContext } from "react-hook-form";

export const securityDetailsConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();

  return [
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.securityDeposit`,
      control,
      label: "Security Deposit",
      placeholder: "Enter Security Deposit",
      rules:{
        required:"Security Deposit is required"
      }
    },
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.interestOnSecurityDeposit`,
      control,
      label: "Interest Rate On Security Deposit (%)",
      placeholder: "Enter Interest Rate",
       rules:{
        required:"Interest Rate  is required"
      }
    },
  ];
};
