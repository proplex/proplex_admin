

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { ColumnProps } from '@/types/company';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const formConfig = (index: number): FormFieldConfig[] => {
  const { id } = useParams<{ id: string }>();
  const { control } = useFormContext();
  return [
    {
      type: 'text',
      name: `amenities.${index}.name`,
      control,
      label: `Name`,
      placeholder: `Enter Name`,
      rules: {
        required: 'Name is required',
      },
    },
    {
      type: 'textarea',
      name: `amenities.${index}.description`,
      control,
      label: 'Description',
      placeholder: 'Enter Description',
    },

    {
      type: 'image',
      name: `amenities.${index}.image`,
      control,
      label: 'Image',
      accept: ['png', 'jpg', 'jpeg', 'webp', 'gif'],
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
      name: `amenities.${index}.status`,
      control,
      label: 'Status',
      placeholder: 'Status',
    },
  ];
};

