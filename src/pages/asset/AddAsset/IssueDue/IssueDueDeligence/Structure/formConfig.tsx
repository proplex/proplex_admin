

import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const formConfig = (index: number) => {
  const { control } = useFormContext();
  const { id } = useParams<{ id?: string }>();
  return [
    {
      name: `dueDiligence.structure.${index}.name`,
      label: 'Name',
      type: 'text',
      control,
      rules: {
        value: true,
        required: 'Name is required',
        minLength: {
          value: 3,
          message: 'Name must be at least 3 characters',
        },
        maxLength: {
          value: 100,
          message: 'Name must be less than 100 characters',
        },
      },
    },
    {
      name: `dueDiligence.structure.${index}.location`,
      label: 'Location',
      type: 'text',
      control,
      rules: {
        required: 'Location is required',
        value: true,
        minLength: {
          value: 3,
          message: 'Location must be at least 3 characters',
        },
        maxLength: {
          value: 100,
          message: 'Location must be less than 100 characters',
        },
      },
    },
    {
      name: `dueDiligence.structure.${index}.link`,
      label: 'Link',
      type: 'url',
      control,
      rules: {
        required: 'Link is required',
        value: true,
        minLength: {
          value: 3,
          message: 'Link must be at least 3 characters',
        },
      },
    },
    {
      name: `dueDiligence.structure.${index}.logoUrl`,
      label: 'Logo',
      type: 'image',
      control,
      rules: {
        required: 'Logo is required',
        value: true,
      },
      accept: ['jpg', 'png', 'jpeg', 'svg', 'webp'],
      meta: {
        refId: id ?? '',
        belongsTo: 'asset',
        isPublic: true,
      },
    },
  ];
};

export const columns = [
  {
    header: 'Name',
    accessorKey: 'name',
    type: 'string' as const,
  },
  {
    header: 'Location',
    accessorKey: 'location',
    type: 'string' as const,
  },
  {
    header: 'Link',
    accessorKey: 'link',
    type: 'url' as const,
  },
  {
    header: 'Logo',
    accessorKey: 'logoUrl',
    type: 'image' as const,
  },
  {
    header: 'Action',
    accessorKey: 'action',
    type: 'action' as const,
  },
];
