

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { ColumnProps } from '@/types/company';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const formConfig = (index: number): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { id } = useParams<{ id: string }>();

  return [
    {
      type: 'text',
      name: `features.${index}.name`,
      control,
      label: `Feature Name`,
      fullWidth: true,
      placeholder: `Enter Name`,
      rules: {
        required: 'Feature Name is required',
      },
    },

    {
      type: 'textarea',
      name: `features.${index}.description`,
      control,
      label: 'Description',
      fullWidth: true,
      placeholder: 'Enter Description',
    },

    {
      type: 'image',
      name: `features.${index}.image`,
      control,
      label: 'Image',
      accept: ['png', 'jpg', 'jpeg', 'webp', 'gif'],
      fullWidth: true,
      placeholder: 'Upload Image',
      meta: {
        refId: id || '',
        belongsTo: 'asset',
        isPublic: true,
      },
      rules: {
        required: 'Image is required',
      },
    },
    {
      type: 'switch',
      name: `features.${index}.status`,
      control,
      label: 'Status',
      placeholder: 'Status',
    },
  ];
};

