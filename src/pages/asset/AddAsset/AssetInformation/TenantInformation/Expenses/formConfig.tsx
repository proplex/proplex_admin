import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import { useFormContext } from "react-hook-form";

export const formConfig = (): FormFieldConfig[] => {
  const { control, getValues, watch } = useFormContext();
  const totalNumberOfSfts = watch("totalNumberOfSfts") || 0;
  const vacancyRate = watch("rentalInformation.vacancyRate") || 0;
  const rentPerSft = watch("rentalInformation.rentPerSft") || 0;
  const fields = watch("expenses") || [];
  const totalPropertyValueAfterFees = getValues("totalPropertyValueAfterFees") || 0;

  let rentNumberOfSfts =
    totalNumberOfSfts - (vacancyRate / 100) * totalNumberOfSfts || 0;

  let grossRent = rentPerSft * rentNumberOfSfts || 0;
  grossRent = parseFloat(grossRent.toFixed(2));

 console.log(grossRent)
  // Calculate total expenses
  const expenses = fields.reduce((total: number, field: any) => {
    if (field.status && field.value) {
      return total + (field.isPercentage ? (grossRent * field.value / 100) : field.value);
    }
    return total;
  }, 0);

  let netRent = grossRent - expenses || 0;
  const netAnnualRent = netRent * 12 || 0;

  const rentalYield = parseFloat(
    totalPropertyValueAfterFees && netAnnualRent
      ? ((netAnnualRent / totalPropertyValueAfterFees) * 100).toFixed(2)
      : "0"
  );
  
  console.log('Debug values:', {
    totalPropertyValueAfterFees,
    netAnnualRent,
    rentalYield,
    grossRent,
    expenses,
    netRent
  });
  return [
    {
      type: "number",
      name: "totalNumberOfSfts",
      control,
      label: "Total Area (sqft)",
      // placeholder: "Enter Total Area",
      disabled: true,
    },
    {
      type: "number",
      name: "rentalInformation.rentPerSft",
      control,
      label: "Rent per sqft",
      placeholder: "Enter Price per sqft",
      disabled: true,
    },
    {
      type: "number",
      name: "rentalInformation.vacancyRate",
      control,
      label: "Approx Vacancy Rate(%)",
      placeholder: "Enter Vacancy Rate",
      disabled: true,
    },
    {
      type: "number",
      name: "totalPropertyValueAfterFees",
      control,
      label: "Gross Total Property Value",
      disabled: true,
      placeholder: "Gross Total",
      defaultValue: totalPropertyValueAfterFees,
    },
    {
      name: "rentalYield",
      label: "Rental Yield (%)",
      type: "text",
      control: control,
      defaultValue: rentalYield.toString(),
      disabled: true,
    },
  ];
};

export const expenseFormConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      type: "text",
      name: `expenses.${index}.name`,
      control,
      label: "Expense Name",
      placeholder: "Enter Expense Name",
      rules: {
        required: "Expense name is required",
      },
    },
    {
      type: "number",
      name: `expenses.${index}.value`,
      control,
      label: "value",
      placeholder: "Enter value",
      rules: {
        required: "Value is required",
        validate: (value: number) => {
          if (value < 0) {
            return "Value cannot be negative";
          }
          return true;
        },
      },
    },
    {
      type: "switch",
      name: `expenses.${index}.isPercentage`,
      control,
      label: "Is Percentage",
      placeholder: "Is Percentage",
    },
    {
      type: "switch",
      name: `expenses.${index}.status`,
      control,
      label: "Status",
      placeholder: "Status",
    },
  ];
};


