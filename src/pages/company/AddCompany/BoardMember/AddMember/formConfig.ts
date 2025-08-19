

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';

export const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
  {
    name: `LLPBoardMembers.${index}.name`,
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
    name: `LLPBoardMembers.${index}.phone_number`,
    label: 'Phone Number',
    type: 'text',
    control,
  },
  {
    name: `LLPBoardMembers.${index}.email`,
    label: 'Email',
    type: 'text',
    control,
    rules: {
      required: 'Email is required',
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    },
  },
  {
    name: `LLPBoardMembers.${index}.dsc_din`,
    label: 'DIN Number',
    type: 'number',
    control,
    rules: {
      maxLength: {
        value: 100,
        message: 'DIN Number must be less than 100 characters',
      },
    }
  },
  {
    name: `LLPBoardMembers.${index}.note`,
    label: 'Admin Note',
    type: 'textarea',
    control,
    rules: {
      maxLength: {
        value: 200,
        message: 'Note must be less than 200 characters',
      },
    },
  }
];


}
