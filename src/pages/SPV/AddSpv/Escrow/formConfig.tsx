

import { BANK_ACCOUNT_TYPE } from '@/config/constants';
import { useFormContext } from 'react-hook-form';

export const formConfig = () => {
  const { control } = useFormContext();
  return [
    {
      label: 'Bank Name',
      name: `escrowBankDetails.bankName`,
      type: 'text',
      control,
      rules: {
        required: 'Bank name is required',
        minLength: {
          value: 2,
          message: 'Bank name must be at least 2 characters',
        },
        maxLength: {
          value: 50,
          message: 'Bank name must be less than 50 characters',
        },
        pattern: {
          value: /^[A-Za-z\s.,&\-']{2,50}$/,
          message: 'Please enter a valid bank name',
        },
      },
    },
    {
      label: 'Account Type',
      name: `escrowBankDetails.accountType`,
      type: 'select',
      control,
      rules: {
        required: 'Answer is required',
      },
      options: BANK_ACCOUNT_TYPE,
    },

    {
      label: 'AccountNumber',
      name: `escrowBankDetails.accountNumber`,
      type: 'text',
      control,
      rules: {
        required: 'Account number is required',
        minLength: {
          value: 8,
          message: 'Account number must be at least 8 digits',
        },
        maxLength: {
          value: 17,
          message: 'Account number must be less than 17 digits',
        },
        pattern: {
          value: /^[0-9]{8,17}$/,
          message: 'Please enter a valid account number (8-17 digits)',
        },
      },
    },
    {
      label: 'Routing Number',
      name: `escrowBankDetails.routingNumber`,
      type: 'text',
      control,
      rules: {
        required: 'Routing number is required',
        pattern: {
          value: /^[0-9]{9}$/,
          message: 'Please enter a valid 9-digit routing number',
        },
        validate: {
          checksum: (value: string) => {
            if (!/^\d{9}$/.test(value)) return 'Invalid routing number format';

            const digits = value.split('').map(Number);
            const weights = [3, 7, 1, 3, 7, 1, 3, 7, 1];

            const sum = digits.reduce((acc, digit, index) => {
              return acc + digit * weights[index];
            }, 0);

            return sum % 10 === 0 || 'Invalid routing number checksum';
          },
        },
      },
    },
  ];
};
