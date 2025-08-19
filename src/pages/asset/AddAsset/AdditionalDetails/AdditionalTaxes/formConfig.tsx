

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      label: 'Name',
      name: `additionalTaxes.${index}.name`,
      type: 'text',
      control,
      rules: {
        required: `Name is required`,
      },
    },
    {
      label: 'Value',
      name: `additionalTaxes.${index}.value`,
      type: 'number',
      control,
      rules: {
        required: `Value is required`,
        min: {
          value: 0,
          message: 'Value must be greater than 0',
        },
        max: {
          value: 100,
          message: 'Value must be less than or equal to 100',
        },
      },
    },
  ];
};
