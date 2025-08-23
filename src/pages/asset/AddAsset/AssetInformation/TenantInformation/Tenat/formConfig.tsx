import { useFormContext } from "react-hook-form";
import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { TENANT_TYPE } from "@/constants/global";

export const formConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      type: "text",
      name: `tenants.${index}.name`,
      control,
      label: "Tenant Name",
      placeholder: "Enter Tenant Name",
      rules: {
        required: "Tenant name is required",
      },
    },
    {
      type: "select",
      name: `tenants.${index}.type`,
      control,
      label: "Tenant Type",
      options: TENANT_TYPE,
      rules: {
        required: "Tenant type is required",
      },
    },
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.annualRentEscalation`,
      control,
      label: "Annual Rent Escalation",
      placeholder: "Annual Rent Escalation",
      rules: {
        required: "Annual Rent Escalation is required",
      },
    },
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.lockInPeriod`,
      control,
      label: "Lock In Period",
      placeholder: "Enter Lock In Period in Months",
      rules: {
        required: "Lock In Period is required",
      },
    },
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
      inputType: "number",
      name: `tenants.${index}.leasePeriod`,
      control,
      label: "Lease Period",
      placeholder: "Enter Lease Period in Months",
      rules: {
        required: "Lease Period is required",
      },
    },
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.securityDeposit`,
      control,
      label: "Security Deposit        ",
      placeholder: "Enter Security Deposit",
    },
    {
      type: "number",
      inputType: "number",
      name: `tenants.${index}.interestOnSecurityDeposit`,
      control,
      label: "Interest Rate On Security Deposit",
      placeholder: "Enter Interest Rate",
    },
    {
      type: "select",
      name: `tenants.${index}.status`,
      control,
      label: "Status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      rules: {
        required: {
          value: true,
          message: "Status is required",
        },
      },
    },
    {
      type: "file",
      name: `tenants.${index}.agreement`,
      control,
      label: "Upload Agreement ",
      fullWidth: true,
    },
    {
      type: "image",
      name: `tenants.${index}.logo`,
      control,
      label: "Upload Logo",
      accept: ["jpg", "jpeg", "png", "webp", "svg"],
      fullWidth: true,
    },
  ];
};
