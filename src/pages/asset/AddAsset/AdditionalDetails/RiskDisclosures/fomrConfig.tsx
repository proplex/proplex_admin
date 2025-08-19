

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      label: 'Name',
      name: `riskDisclosures.${index}.name`,
      type: 'text',
      control,
      rules: {
        required: `Name is required`,
      },
    },
    {
      label: 'Description',
      name: `riskDisclosures.${index}.description`,
      type: 'textarea',
      control,
      rules: {
        required: `Description is required`,
      },
    },
  ];
};
