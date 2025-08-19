

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      label: 'Question',
      name: `faqs.${index}.question`,
      type: 'text',
      control,
      rules: {
        required: `Question is required`,
      },
    },
    {
      label: 'Answer',
      name: `faqs.${index}.answer`,
      type: 'textarea',
      control,
      rules: {
        required: `Answer is required`,
      },
    },
  ];
};
