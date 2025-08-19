

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { Control } from 'react-hook-form';

export const formConfig = ({
  control,
}: {
  control: Control;
}): FormFieldConfig[] => [
  {
    label: 'Partner Name',
    name: 'name',
    type: 'text',
    control,
  },
  {
    label: 'Partner Image',
    name: 'icon',
    type: 'file',
    accept: ['image/*'],
    control,
  },
];
