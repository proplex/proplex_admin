

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { contentType } from '@/constants/global';
export const feeConfig = ({ control }: { control: any }): FormFieldConfig[] => {
  return [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      options: contentType,
      control,
      rules: {
        required: 'Type is required',
      },
    },
    {
      name: 'value',
      label: 'Value',
      type: 'number',
      control,
      rules: {
        required: 'Value is required',
        min: {
          value: 0,
          message: 'Value must be greater than 0',
        },
        max: {
          value: 99,
          message: 'Value must be less than 99',
        },
      },
    },
  ];
};
