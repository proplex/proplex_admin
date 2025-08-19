

import { useFormContext } from 'react-hook-form';
import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

export const riskFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
   return  [
  {
    name: 'risk_disclosure',
    label: 'Risk',
    control,
    type: 'textarea',
    rules: {
      required: 'Risk is required',
      maxLength: {
        value: 500,
        message: 'Risk should not exceed 500 characters',
      },
    },
  },
];
}

