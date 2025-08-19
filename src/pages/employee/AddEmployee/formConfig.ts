

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import {
  contact_number_regex,
  country_code_regex,
  meeting_link_regex,
  personal_email_regex,
  whatsapp_number_regex,
  work_email_regex,
} from '@/helpers/validates';
import { Control } from 'react-hook-form';

export const formConfig = ({
  control,
}: {
  control: Control;
}): FormFieldConfig[] => {
  return [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      control,
      rules: {
        required: 'Full Name is required',
      },
    },
    {
      name: 'email',
      label: 'Personal Email Address',
      type: 'email',
      control,
      rules: {
        required: 'Email is required',
        validate: (value: string) =>
          personal_email_regex.test(value) || 'Email should be valid',
      },
    },
    {
      name: 'work_email',
      label: 'Work Email Address',
      type: 'email',
      control,
      rules: {
        required: 'Work Email is required',
        validate: (value: string) =>
          work_email_regex.test(value) || 'Work Email should be valid',
      },
    },
    {
      name: 'country_code',
      label: 'Country Code',
      type: 'text',
      control,
      rules: {
        required: 'Country Code is required',
        validate: (value: string) =>
          country_code_regex.test(value) ||
          'Invalid country code (e.g., +1, +91, +44)',
      },
    },
    {
      name: 'phone',
      label: 'Contact Number',
      type: 'text',
      control,
      rules: {
        required: 'Contact Number is required',
        validate: (value: string) =>
          contact_number_regex.test(value) || 'Enter a valid Contact Number',
      },
    },
    {
      name: 'whatsapp_no',
      label: 'Whatsapp Number',
      type: 'text',
      control,
      rules: {
        required: 'Whatsapp Number is required',
        validate: (value: string) =>
          whatsapp_number_regex.test(value) ||
          'Whatsapp Number must be 10 digits',
      },
    },
    {
      name: 'language',
      label: 'Language',
      type: 'text',
      control,
    },
    {
      name: 'role',
      label: 'Role',
      control,
      type: 'select',
      rules: {
        required: 'Role is required',
      },
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        {
          value: 'active',
          label: 'Active',
        },
        {
          value: 'inactive',
          label: 'Inactive',
        },
      ],
      control,
    },
    {
      name: 'join_date',
      label: 'Joined On',
      type: 'date',
      control,
    },

    {
      name: 'meeting_link',
      label: 'Meeting Link',
      type: 'text',
      control,
      fullWidth: true,
      rules: {
        required: 'Meeting Link is required',
        validate: (value: string) =>
          meeting_link_regex.test(value) || 'Invalid Meeting Link',
      },
    },
    {
      name: 'avatar',
      label: 'Profile Image',
      type: 'image',
      control,
      accept: ['image/*'],
    },
    {
      name: 'address',
      label: 'Address',
      type: 'textarea',
      control,
    },
  ];
};
