import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

export const formConfig = ({
  control,
}: {
  control: any;
}): FormFieldConfig[] => {
  return [
    {
      name: `name`,
      label: 'Full Name',
      type: 'text',
      control,
      placeholder: 'Enter your full legal name',
      rules: {
        required: 'Full name is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters and spaces are allowed',
        },
        maxLength: {
          value: 100,
          message: 'Name must be less than 100 characters',
        },
      },
      bottomText: 'Enter your complete legal name as it appears on official documents'
    },
    {
      name: `email`,
      label: 'Email Address',
      type: 'email',
      control,
      placeholder: 'you@example.com',
      rules: {
        required: 'Email address is required',
        pattern: {
          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
          message: 'Invalid email address format',
        },
      },
      bottomText: 'Official email for account communications'
    },
    {
      name: `mobile_no`,
      label: 'Phone Number',
      type: 'text',
      control,
      placeholder: '9876543210',
      rules: {
        required: 'Phone number is required',
        pattern: {
          value: /^[0-9]{10}$/i,
          message: 'Invalid phone number (10 digits required)',
        },
      },
      bottomText: '10-digit mobile number for account verification'
    },
    {
      name: `pan_number`,
      label: 'PAN Number',
      type: 'text',
      control,
      placeholder: 'ABCDE1234F',
      rules: {
        required: 'PAN number is required',
        pattern: {
          value: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
          message: 'Invalid PAN number format (e.g. ABCDE1234F)',
        },
      },
      bottomText: 'Permanent Account Number for tax purposes'
    },
  ];
};