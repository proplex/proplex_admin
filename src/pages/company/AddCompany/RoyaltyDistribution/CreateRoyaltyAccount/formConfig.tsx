

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

export const formConfig = ({
  control,
}: {
  control: any;
}): FormFieldConfig[] => {
  return [
    {
      name: `name`,
      label: 'Name',
      type: 'text',
      control,
      rules: {
        required: 'Name is required',
      },
    },
    {
      name: `email`,
      label: 'Email',
      type: 'email',
      control,
      rules: {
        required: 'Email is required',
      },
    },
    {
      name: `mobile_no`,
      label: 'Phone Number',
      type: 'text',
      control,
      rules: {
        required: 'Phone Number is required',
      },
    },
    {
      name: `pan_number`,
      label: 'Pan Number',
      type: 'text',
      control,
      rules: {
        required: 'Pan Number is required',
      },
    },
  ];
};
