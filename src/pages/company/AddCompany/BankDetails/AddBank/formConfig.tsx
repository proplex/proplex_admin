

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      name: `bankAccounts.${index}.name`,
      label: 'Name',
      type: 'text',
      control,
      rules: {
        required: 'Name is required',
        patten: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters are allowed',
        },
        maxLength: {
          value: 100,
          message: 'Name must be less than 100 characters',
        },
      },
    },
    {
      name: `bankAccounts.${index}.bank_name`,
      label: 'Bank Name',
      type: 'text',
      control,
      rules: {
        required: 'Bank Name is required',
        patten: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters are allowed',
        },
        maxLength: {
          value: 100,
          message: 'Bank Name must be less than 100 characters',
        },
      },
    },
    {
      name: `bankAccounts.${index}.account_number`,
      label: 'Account Number',
      type: 'text',
      control,
      rules: {
        required: 'Account number is required',
      },
    },
    {
      name: `bankAccounts.${index}.ifsc_code`,
      label: 'IFSC Code',
      type: 'text',
      control,
      rules: {
        required: 'IFSC Code is required',
       
      },
    },
  ];
};
