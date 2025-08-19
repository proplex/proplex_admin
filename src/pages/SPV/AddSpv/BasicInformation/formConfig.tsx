

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { COUNTRIES, CURRENCY_OPTIONS, SPV_TYPES } from '@/constants/global';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const formConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  const { id } = useParams<{ id: string }>();
  return [
    {
      label: 'SPV/LLC Name',
      name: `name`,
      type: 'text',
      control,
      rules: {
        required: 'SPV/LLC Name is required',
        minLength: {
          value: 3,
          message: 'SPV/LLC Name must be at least 3 characters',
        },
        maxLength: {
          value: 50,
          message: 'SPV/LLC Name must be at most 50 characters',
        },
        pattern: {
          value: /^[a-zA-Z0-9\s\-&,.'()]+$/,
          message: 'SPV/LLC Name contains invalid characters',
        },
      },
    },
    {
      label: 'SPV Type',
      name: `type`,
      type: 'select',
      control,
      rules: {
        required: 'SPV Type is required',
      },
      options: SPV_TYPES,
    },

    {
      label: 'Jurisdiction',
      name: `jurisdiction`,
      type: 'select',
      control,
      options: COUNTRIES,
      rules: {
        required: 'Jurisdiction is required',
      },
    },
    {
      label: 'Currency',
      name: `currency`,
      type: 'select',
      control,
      options: CURRENCY_OPTIONS,
      rules: {
        required: 'Currency is required',
      },
    },
    {
      label: 'Formation Date',
      name: 'formationDate',
      type: 'date',
      control,
      rules: {
        required: 'Formation Date is required',
      },
      maxDate: false,
    },
    {
      label: 'Business Purpose',
      name: 'businessPurpose',
      type: 'textarea',
      control,
      rules: {
        required: 'Business Purpose is required',
        validate: (value: string) => {
          const wordCount = value.trim().split(/\s+/).length;
          if (wordCount < 5)
            return 'Please write a more detailed business purpose';
          return true;
        },
      },
      fullWidth: true,
    },
  ];
};
