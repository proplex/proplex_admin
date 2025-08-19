

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { AdvisorType } from '@/constants/global';
import { useFormContext } from 'react-hook-form';

const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { control } = useFormContext();
  return [
    {
      name: `LLPAdvisorsMembers.${index}.name`,
      label: 'Name',
      type: 'text',
      control,
      rules: {
        required: 'Name is required',
        pattern: {
          value: /^[a-zA-Z\s]*$/,
          message: 'Invalid Name',
        },
      },
    },
    {
      name: `LLPAdvisorsMembers.${index}.firm`,
      label: 'Firm',
      type: 'text',
      control,
      rules: {
        required: 'Firm is required',
      },
    },
    {
      name: `LLPAdvisorsMembers.${index}.email`,
      label: 'Email',
      type: 'email',
      control,
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Invalid Email',
        },
      },
    },
    {
      name: `LLPAdvisorsMembers.${index}.phone_number`,
      label: 'Phone Number',
      type: 'tel',
      control,
      rules: {
        required: 'Phone Number is required',
        pattern: {
          value: /^[0-9]*$/,
          message: 'Invalid Phone Number',
        },
      },
    },
    {
      name: `LLPAdvisorsMembers.${index}.area_of_expertise`,
      label: 'Area of Expertise',
      type: 'text',
      control,
    },
    {
      name: `LLPAdvisorsMembers.${index}.type`,
      label: 'Type',
      type: 'select',
      options: AdvisorType,
      control,
      rules: {
        required: 'Type is required',
      },
    },
    {
      name: `LLPAdvisorsMembers.${index}.note`,
      label: 'Admin Note',
      type: 'textarea',
      control,
      rules: {
        maxLength: {
          value: 200,
          message: 'Note should not exceed 200 characters',
        },
      },
    },
  ];
};
export default formConfig;
