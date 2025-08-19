

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { contentType } from '@/constants/global';

export const feeConfig = ({
  control,
  getValues,
}: {
  control: any;
  getValues: (field: string) => any;
}): FormFieldConfig[] => {
  const name = getValues('name');

  return [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      control,
      rules: {
        required: 'Name is required',
      },
      disabled: name.toLowerCase() === 'eoi',
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
      },
    },
    {
      name: 'type',
      label: 'Type',
      options: contentType,
      type: 'select',
      control,
      rules: {
        required: 'Type is required',
      },
      disabled: name.toLowerCase() === 'eoi',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'switch',
      control,
    },
    // {
    //   name: 'is_percentage',
    //   label: 'Is Percentage',
    //   type: 'switch',
    //   control,
    // },
  ];
};