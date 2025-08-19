import { useFormContext } from "react-hook-form";
import { FormFieldConfig } from "@/components/UseForm/ControllerMap";

type ColumnType = {
  header: string;
  accessorKey: string;
  type?: "date" | "number" | "switch" | "action" | "string";
  onChange?: (value: any, row: any) => void;
};

export const formConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      type: "text",
      name: `allocationStats.categories.${index}.category`,
      control,
      label: "Category",
      placeholder: "Category Name",
      rules: {
        required: {
          message: "Category is required",
          value: true,
        },
        minLength: {
          value: 3,
          message: "Category must be at least 3 characters",
        },
      },
    },

    {
      name: `allocationStats.categories.${index}.tokens`,
      control,
      label: "Tokens",
      rules: {
        required: {
          message: "Tokens are required",
          value: true,
        },
      },
    },
    {
      type: "date",
      name: `allocationStats.categories.${index}.vestingStartDate`,
      control,
      label: "Vestiong Start Date",
    },
    {
      name: `allocationStats.categories.${index}.cliffPeriod`,
      control,
      label: "Cliff Period",
      placeholder: "Cliff Period",
      rules: {
        required: {
          message: "Cliff Period is required",
          value: true,
        },
      },
    },

    {
      type: "select",
      name: `allocationStats.categories.${index}.vestingType`,
      control,
      label: "Vesting Type",
      placeholder: "Vesting Type",
      options: [
        { label: "No Vesting", value: "no-vesting" },
        { label: "Linear Vesting", value: "linear-vesting" },
        { label: "Cliff Vesting", value: "cliff-vesting" },
      ],
      rules: {
        required: {
          message: "Vesting Type is required",
          value: true,
        },
      },
    },
    {
      type: "date",
      name: `allocationStats.categories.${index}.vestingEndDate`,
      control,
      label: "Vesting End Date",
      rules: {
        required: {
          message: "Vesting End Date is required",
          value: true,
        },
      },
    },
    {
      type: "textarea",
      name: `allocationStats.categories.${index}.description`,
      control,
      label: "Description",
      placeholder: "Description",
      fullWidth: true,
      rules: {
        required: {
          message: "Description is required",
          value: true,
        },
        minLength: {
          value: 3,
          message: "Description must be at least 3 characters",
        },
      },
    },
  ];
};

 
