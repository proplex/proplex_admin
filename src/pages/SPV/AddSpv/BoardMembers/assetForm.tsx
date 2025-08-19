

import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const assetFormConfig = () => {
  const { id: companyId } = useParams() as { id: string };
  const { control } = useFormContext();
  return [
    {
      label: 'Full Name',
      name: `boardOfDirectors.assetManager.name`,
      type: 'text',
      fullWidth: false,
      control,
      rules: {
        required: 'Full Name is required',
        minLength: {
          value: 3,
          message: 'Full Name must be at least 3 characters',
        },
        maxLength: {
          value: 50,
          message: 'Full Name must be at most 50 characters',
        },
        pattern: {
          value: /^[a-zA-Z0-9\s\-&,.'()]+$/,
          message: 'Full Name contains invalid characters',
        },
      },
    },
    {
      label: 'Email',
      name: `boardOfDirectors.assetManager.email`,
      type: 'email',
      fullWidth: false,
      control,
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Email is not valid',
        },
      },
    },

    {
      label: 'Phone Number',
      name: `boardOfDirectors.assetManager.phoneNumber`,
      type: 'text',
      fullWidth: false,
      control,
      rules: {
        required: 'Phone Number is required',
        pattern: {
          value: /^[0-9]{10}$/,
          message: 'Phone Number must be 10 digits',
        },
        minLength: {
          value: 10,
          message: 'Phone Number must be at least 10 digits',
        },
        maxLength: {
          value: 15,
          message: 'Phone Number must be at most 15 digits',
        },
      },
    },
    {
      label: 'Id Number',
      name: `boardOfDirectors.assetManager.idNumber`,
      type: 'text',
      control,
      rules: {
        required: 'Id Number is required',
        minLength: {
          value: 3,
          message: 'Id Number must be at least 3 characters',
        },
        maxLength: {
          value: 50,
          message: 'Id Number must be at most 50 characters',
        },
        pattern: {
          value: /^[a-zA-Z0-9\s\-&,.'()]+$/,
          message: 'Id Number contains invalid characters',
        },
      },
    },
    {
      label: 'Id Proof',
      name: 'boardOfDirectors.assetManager.idProof',
      type: 'file',
      fullWidth: true,
      accept: ['png', 'jpg', 'jpeg', 'pdf'],
      maxSize: 1 * 1024 * 1024,
      control,
      rules: {
        required: 'Id Proof is required',
      },
      meta: {
        refId: companyId,
        belongsTo: 'company',
        isPublic: true,
      },
    },
  ];
};
