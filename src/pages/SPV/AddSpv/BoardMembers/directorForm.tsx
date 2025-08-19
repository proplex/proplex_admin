

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const directorFormConfig = ({
  index,
}: {
  index: number;
}): FormFieldConfig[] => {
  const { id: companyId } = useParams() as { id: string };
  const { control } = useFormContext();
  return [
    {
      label: 'Full Name',
      name: `boardOfDirectors.additionalBoardMembers.${index}.fullName`,
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
      control,
      label: 'Email',
      name: `boardOfDirectors.additionalBoardMembers.${index}.email`,
      type: 'email',
      fullWidth: false,
      rules: {
        required: 'Email is required',
        pattern: {
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: 'Email is not valid',
        },
      },
    },

    {
      control,
      label: 'Phone Number',
      name: `boardOfDirectors.additionalBoardMembers.${index}.phoneNumber`,
      type: 'text',
      fullWidth: false,
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
      control,
      label: 'Select Role',
      name: `boardOfDirectors.additionalBoardMembers.${index}.role`,
      type: 'select',
      options: [
        { label: 'Treasury Manger', value: 'treasury-manager' },
        { label: 'Asset Manager', value: 'asset-manager' },
      ],
    },
    {
      label: 'Id Number',
      name: `boardOfDirectors.additionalBoardMembers.${index}.idNumber`,
      type: 'text',
      fullWidth: false,
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
      control,
      label: 'Id Proof',
      name: `boardOfDirectors.additionalBoardMembers.${index}.idProof`,
      type: 'file',
      fullWidth: true,
      accept: ['png', 'jpg', 'jpeg', 'pdf'],
      maxSize: 5 * 1024 * 1024,
      meta: {
        refId: companyId,
        belongsTo: 'company',
        isPublic: true,
      },
      rules: {
        required: 'Id Proof is required',
      },
    },
  ];
};
