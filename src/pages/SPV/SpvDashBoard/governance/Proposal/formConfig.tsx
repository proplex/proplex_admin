

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { Control } from 'react-hook-form';

export const formConfig = (control: Control<any>): FormFieldConfig[] => {
  return [
    {
      type: 'text',
      name: 'title',
      control,
      label: 'Proposal Title',
      placeholder: 'Enter Proposal Title',
      rules: {
        required: {
          value: true,
          message: 'Proposal Title is required',
        },
      },
    },
    {
      type: 'textarea',
      name: 'description',
      control,
      label: 'Description',
    },
    {
      type: 'select',
      name: 'type',
      control,
      options: [],
      label:"Proposal type"
    },
    {
      type: 'date',
      name: 'date',
      control,
      label: 'Voting Period End',
    },
    {
      type: 'number',
      name: 'percentage',
      control,
      label: 'Quorum Percentage (%)',
      placeholder: 'Enter Quorum Percentage',
    },
  ];
};
