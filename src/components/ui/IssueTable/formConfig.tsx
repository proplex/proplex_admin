

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const formConfig = (): FormFieldConfig[] => {
  const { id = null } = useParams();
  const { control, watch } = useFormContext();
  const isEdit = id ? true : false;
  return [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      control,
      rules: {
        required: 'Name is required',
        pattern: {
          value: /^[A-Za-z\s]+$/i,
          message: 'Only letters are allowed',
        },
      },
      disabled: isEdit,
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      control,
      rules: {
        required: 'Address is required',
      },
    },
    {
      name: 'total_projects',
      label: 'Total Projects',
      type: 'number',
      control,
      rules: {
        required: 'Total Projects is required',
      },
    },
    {
      name: 'on_going_projects',
      label: 'On Going Projects',
      type: 'number',
      control,
      rules: {
        required: 'On Going Projects is required',
      },
    },
    {
      name: 'phone_number',
      label: 'Phone Number',
      type: 'number',
      control,
      rules: {
        required: {
          value: true,
          message: 'Phone Number is required',
        },
      },
    },
    {
      name: 'whatsapp_number',
      label: 'Whatsapp Number',
      type: 'number',
      control,
      rules: {
        required: 'Whatsapp Number is required',
      },
    },
    {
      name: 'prime_location',
      label: 'Prime Location',
      type: 'text',
      control,
      rules: {
        required: {
          value: true,
          message: 'Prime Location is required',
        },
      },
    },
    {
      name: 'hosted_by',
      label: 'Hosted By',
      type: 'file',
      accept: ['.jpg', '.png', '.jpeg'],
      control,
      rules: {
        required: {
          value: true,
          message: 'Hosted By is required',
        },
      },
    },
    {
      name: 'issuer_profile_description',
      label: 'Issuer Profile Description',
      type: 'textarea',
      rules: {
        required: {
          value: true,
          message: 'Issuer Profile Description is required',
        },
      },
      control,
      fullWidth: true,
    },
  ];
};

export default formConfig;
