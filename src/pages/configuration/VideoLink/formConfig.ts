

import { Control, useFormContext } from 'react-hook-form';
import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

export const formConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      label: 'Type',
      name: 'type',
      type: 'text',
      control: control,
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      control: control,
    },
    {
      label: 'Link',
      name: 'link',
      type: 'text',
      control: control,
    },
  ];
};
