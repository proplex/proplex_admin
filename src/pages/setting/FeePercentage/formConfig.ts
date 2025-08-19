

import { Control } from 'react-hook-form';
import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

export const formConfig = (control: Control<any>): FormFieldConfig[] => {
  return [
    {
      name: `name`,
      label: 'Name',
      type: 'text',
      control,
      rules: {
        required: 'Right is required',
      },
    },
    {
      name: `value`,
      label: 'Value',
      type: 'text',
      control,
      rules: {
        required: 'Right is required',
      },
    },
    {
      name: `film`,
      label: 'Residential Percentage',
      type: 'text',
      control,
      rules: {
        required: 'Right is required',
      },
    },
    {
      name: `music`,
      label: 'Holiday Home Percentage',
      type: 'text',
      control,
      rules: {
        required: 'Right is required',
      },
    },
    {
      name: `web_series`,
      label: 'Agriculture Land Percentage',
      type: 'text',
      control,
      rules: {
        required: 'Right is required',
      },
    },
    {
      name: `books`,
      label: 'Land Parcel Percentage',
      type: 'text',
      control,
      rules: {
        required: 'Right is required',
      },
    },
    {
      name: `sports`,
      label: 'Commercial Percentage',
      type: 'text',
      control,
      rules: {
        required: 'Right is required',
      },
    },
    {
      name: `type`,
      label: 'Type',
      type: 'select',
      control,
      options: [
        { label: 'BUY', value: 'BUY' },
        { label: 'SELL', value: 'SELL' },
      ],
    },
    {
      name: `status`,
      label: 'Status',
      type: 'switch',
      control,
    },
  ];
};
