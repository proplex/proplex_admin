

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      label: 'Name',
      name: `riskFactors.${index}.name`,
      type: 'text',
      control,
      rules: {
        required: `Name is required`,
      },
    },
    {
      label: 'Description',
      name: `riskFactors.${index}.description`,
      type: 'textarea',
      control,
      rules: {
        required: `Description is required`,
      },
    },
  ];
};
