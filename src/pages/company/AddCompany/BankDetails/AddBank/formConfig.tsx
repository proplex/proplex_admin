import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      name: `bankAccounts.${index}.name`,
      label: 'Account Holder Name',
      type: 'text',
      control,
      placeholder: 'Enter full name as it appears on bank account',
      rules: {
        required: 'Account holder name is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters and spaces are allowed',
        },
        maxLength: {
          value: 100,
          message: 'Name must be less than 100 characters',
        },
      },
      bottomText: 'This should match the name on your bank account'
    },
    {
      name: `bankAccounts.${index}.bank_name`,
      label: 'Bank Name',
      type: 'text',
      control,
      placeholder: 'e.g., State Bank of India, HDFC Bank',
      rules: {
        required: 'Bank name is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters and spaces are allowed',
        },
        maxLength: {
          value: 100,
          message: 'Bank name must be less than 100 characters',
        },
      },
      bottomText: 'Enter the full name of your bank'
    },
    {
      name: `bankAccounts.${index}.account_number`,
      label: 'Account Number',
      type: 'text',
      control,
      placeholder: 'Enter your bank account number',
      rules: {
        required: 'Account number is required',
        pattern: {
          value: /^[0-9]+$/i,
          message: 'Account number should contain only digits',
        },
        minLength: {
          value: 9,
          message: 'Account number must be at least 9 digits',
        },
        maxLength: {
          value: 18,
          message: 'Account number must be less than 18 digits',
        },
      },
      bottomText: 'Your bank account number (9-18 digits)'
    },
    {
      name: `bankAccounts.${index}.ifsc_code`,
      label: 'IFSC Code',
      type: 'text',
      control,
      placeholder: 'e.g., SBIN0002499, HDFC0001234',
      rules: {
        required: 'IFSC code is required',
        pattern: {
          value: /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/i,
          message: 'Invalid IFSC code format (e.g., SBIN0002499)',
        },
        maxLength: {
          value: 11,
          message: 'IFSC code must be exactly 11 characters',
        },
      },
      bottomText: '11-character bank identifier code'
    },
  ];
};