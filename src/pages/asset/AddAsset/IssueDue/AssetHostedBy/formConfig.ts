

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const formConfig = (): FormFieldConfig[] => {
  const { id } = useParams<{ id: string }>();
  const { control, watch } = useFormContext();
  return [
    {
      name: 'hostedBy.name',
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
    },
    {
      name: 'hostedBy.email',
      label: 'Email',
      type: 'email',
      control,
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Invalid email address',
        },
      },
    },
    {
      name: 'hostedBy.address',
      label: 'Address',
      type: 'text',
      control,
    },
    {
      name: 'hostedBy.totalProjects',
      label: 'Total Projects',
      type: 'number',
      control,
    },
    {
      name: 'hostedBy.onGoingProjects',
      label: 'On Going Projects',
      type: 'number',
      control,
    },
    {
      name: 'hostedBy.phone',
      label: 'Phone Number',
      type: 'text',
      control,
      rules: {
        required: 'Phone Number is required',
      },
    },
    {
      name: 'hostedBy.whatsappNumber',
      label: 'Whatsapp Number',
      type: 'text',
      control,
    },
    {
      name: 'hostedBy.primeLocation',
      label: 'Prime Location',
      type: 'text',
      control,
    },
    {
      name: 'hostedBy.logoURL',
      label: 'Hosted Logo',
      type: 'image',
      accept: ['png', 'jpg', 'jpeg'],
      control,
      fullWidth: true,
      meta: {
        refId: id || '',
        belongsTo: 'asset',
        isPublic: true,
      },
    },
    {
      name: 'hostedBy.website',
      label: 'Website',
      type: 'url',
      control,
      fullWidth: true,
    },
    {
      name: 'hostedBy.about',
      label: 'Issuer Profile Description',
      type: 'textarea',
      control,
      fullWidth: true,
    },
  ];
};

export default formConfig;
