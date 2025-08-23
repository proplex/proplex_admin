import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { TENANT_TYPE } from "@/constants/global";
import { useFormContext } from "react-hook-form";

export const leaseDetailsConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();

  return [
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.sftsAllocated`,
      control,
      label: "SFTs Allocated",
      placeholder: "Enter SFTs Allocated",
      onChange: (value: any) => {
        console.log("SFTs Allocated", value.target.value);
      },
      rules: {
        required: "SFTs Allocated is required",
      },
    },
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.rentPerSft`,
      control,
      label: "Rent Per Sft",
      placeholder: "Enter Rent Per Sft",
      rules: {
        required: "Rent Per Sft is required",
      },
    },
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.annualRentEscalation`,
      control,
      label: "Annual Rent Escalation (%)",
      placeholder: "Annual Rent Escalation",
      rules: {
        required: "Annual Rent Escalation is required",
      },
    },
    {
      type: "date",
      name: `tenants.${index}.startDate`,
      control,
      label: "Start Date",
      maxDate: false, // Assuming you want to restrict future dates
    },
    {
      type: "date",
      name: `tenants.${index}.endDate`,
      control,
      label: "End Date",
    },
    {
      type: "number",
      name: `tenants.${index}.leasePeriod`,
      control,
      label: "Lease Period (Months)",
      placeholder: "Enter Lease Period in Months",
      rules: {
        required: "Lease Period is required",
      },
    },
    {
      type: "number",
      name: `tenants.${index}.lockInPeriod`,
      control,
      label: "Lock In Period (Months)",
      placeholder: "Enter Lock In Period in Months",
      rules: {
        required: "Lock In Period is required",
      },
    },
  ];
};
