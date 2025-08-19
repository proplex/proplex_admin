

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      label: 'Title',
      name: `termsAndConditions.${index}.title`,
      type: 'text',
      control,
      rules: {
        required: `Title is required`,
      },
    },
    {
      label: 'Answer',
      name: `termsAndConditions.${index}.description`,
      type: 'textarea',
      control,
      rules: {
        required: `Answer is required`,
      },
    },
  ];
};
