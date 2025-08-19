

import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const tresaryFormConfig = () => {
  const { control } = useFormContext<any>();
  const { id: companyId } = useParams() as { id: string };

  return [
    {
      label: 'Full Name',
      name: `boardOfDirectors.treasuryManager.name`,
      type: 'text',
      control,
      rules: {
        required: 'Question is required',
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
      name: `boardOfDirectors.treasuryManager.email`,
      type: 'email',
      control,
      rules: {
        required: 'Answer is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Email is not valid',
        },
      },
    },

    {
      label: 'Phone Number',
      name: `boardOfDirectors.treasuryManager.phoneNumber`,
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
      name: `boardOfDirectors.treasuryManager.idNumber`,
      type: 'text',
      control,
      rules: {
        required: 'Id Number is required',
        pattern: {
          value: /^[0-9a-zA-Z]+$/,
          message: 'Id Number must be alphanumeric',
        },
        minLength: {
          value: 5,
          message: 'Id Number must be at least 5 characters',
        },
        maxLength: {
          value: 20,
          message: 'Id Number must be at most 20 characters',
        },
      },
    },
    {
      label: 'Id Proof',
      name: 'boardOfDirectors.treasuryManager.idProof',
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
