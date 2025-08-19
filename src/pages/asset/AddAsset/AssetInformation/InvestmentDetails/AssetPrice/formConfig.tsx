import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { useFormContext } from "react-hook-form";

export const formConfig = ({
  index,
  type,
}: {
  index: number;
  type: string;
}): FormFieldConfig[] => {
  const { control, watch } = useFormContext();
  const isPercentage = watch(`fees.${type}.${index}.isPercentage`);

  return [
    {
      name: `fees.${type}.${index}.name`,
      label: "Name",
      control,
      type: "text",
      rules: {
        required: "Name is required",
      },
    },
    {
      name: `fees.${type}.${index}.value`,
      label: "Value",
      control,
      type: "number",
      rules: {
        required: "Value is required",
        min: {
          value: 0,
          message: "Value must be greater than 0",
        },
        validate: (value: number) => {
          if (isPercentage) {
            if (value > 100) {
              return "Value must be less than or equal to 100";
            }
          }
          return true;
        },
      },
    },
    {
      name: `fees.${type}.${index}.isPercentage`,
      label: "Is Percentage",
      control,
      type: "switch",
    },
    {
      name: `fees.${type}.${index}.status`,
      label: "Status",
      control,
      type: "switch",
    },
  ];
};

export const feeFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      name: "totalNumberOfSfts",
      label: "Total Number of SFTs",
      control,
      type: "number",
      rules: {
        required: "Total Number of SFTs is required",
        min: {
          value: 0,
          message: "Total Number of SFTs must be greater than 0",
        },
      },
    },
    {
      name: "pricePerSft",
      label: "Price Per SFT",
      control,
      type: "number",
      rules: {
        required: "Price Per SFT is required",
        min: {
          value: 0,
          message: "Price Per SFT must be greater than 0",
        },
      },
    },
  ];
};


