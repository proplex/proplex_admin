import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
  {
    name: `LLPBoardMembers.${index}.name`,
    label: 'Full Name',
    type: 'text',
    control,
    placeholder: 'Enter the board member\'s full name',
    rules: {
      required: 'Name is required',
      pattern: {
        value: /^[A-Za-z\s]+$/i,
        message: 'Only letters and spaces are allowed',
      },
      maxLength: {
        value: 100,
        message: 'Name must be less than 100 characters',
      },
    },
    bottomText: 'Enter the full legal name of the board member'
  },
  {
    name: `LLPBoardMembers.${index}.phone_number`,
    label: 'Phone Number',
    type: 'text',
    control,
    placeholder: 'e.g., +1 (555) 123-4567',
    bottomText: 'Include country code for international numbers'
  },
  {
    name: `LLPBoardMembers.${index}.email`,
    label: 'Email Address',
    type: 'text',
    control,
    placeholder: 'e.g., member@company.com',
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    },
    bottomText: 'Official email for company communications'
  },
  {
    name: `LLPBoardMembers.${index}.dsc_din`,
    label: 'Director Identification Number (DIN)',
    type: 'number',
    control,
    placeholder: 'Enter the 8-digit DIN',
    rules: {
      maxLength: {
        value: 100,
        message: 'DIN Number must be less than 100 characters',
      },
    },
    bottomText: 'Unique identifier assigned by the corporate registry'
  },
  {
    name: `LLPBoardMembers.${index}.note`,
    label: 'Admin Notes',
    type: 'textarea',
    control,
    placeholder: 'Add any additional notes about this board member',
    rules: {
      maxLength: {
        value: 200,
        message: 'Note must be less than 200 characters',
      },
    },
    bottomText: 'Private notes for administrative purposes only'
  }
];
};