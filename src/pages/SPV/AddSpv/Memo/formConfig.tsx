

// Update the formConfig function to include more detailed validation rules for each field

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  return [
    {
      label: 'Investment Memorandum',
      name: `memoAndTerms.investmentMemorandum`,
      type: 'textarea',
      control,
      rules: {
        required: 'Investment Memorandum is required',
        minLength: {
          value: 100,
          message: 'Investment Memorandum should be at least 100 characters',
        },
        maxLength: {
          value: 5000,
          message: 'Investment Memorandum should not exceed 5000 characters',
        },
        validate: (value: string) =>
          value.includes('investment') ||
          'Must include details about the investment',
      },
      fullWidth: true,
    },
    {
      label: 'Terms & Conditions',
      name: `memoAndTerms.termsAndConditions`,
      type: 'textarea',
      control,
      rules: {
        required: 'Terms & Conditions is required',
        minLength: {
          value: 50,
          message: 'Terms & Conditions should be at least 50 characters',
        },
        maxLength: {
          value: 3000,
          message: 'Terms & Conditions should not exceed 3000 characters',
        },
        
      },
      fullWidth: true,
    },

    {
      label: 'Risk Factor',
      name: `memoAndTerms.riskFactor`,
      type: 'textarea',
      control,
      rules: {
        required: 'Risk Factors is required',
        minLength: {
          value: 50,
          message: 'Risk Factors should be at least 50 characters',
        },
        maxLength: {
          value: 2000,
          message: 'Risk Factors should not exceed 2000 characters',
        },
        
      },
    },

    {
      label: 'Investment Strategy',
      name: 'memoAndTerms.investmentStrategy',
      type: 'textarea',
      control,
      rules: {
        required: 'Investment Strategy is required',
        minLength: {
          value: 50,
          message: 'Investment Strategy should be at least 50 characters',
        },
        maxLength: {
          value: 2000,
          message: 'Investment Strategy should not exceed 2000 characters',
        },
      
      },
    },
  ];
};
