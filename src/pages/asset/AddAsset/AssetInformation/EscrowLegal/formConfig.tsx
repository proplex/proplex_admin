

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const legalFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { id } = useParams();
  return [
    {
      type: 'text',
      name: 'legalAdivisory.name',
      control,
      label: 'Legal Advisory',
      rules: {
        required: 'Legal advisory is required',
        value: true,
      },
    },
    {
      type: 'file',
      name: 'legalAdivisory.document',
      control,
      label: 'SLA Agreement',
      rules: {
        required: 'SLA agreement is required',
        value: true,
      },
      meta: {
        refId: id || '',
        belongsTo: 'asset',
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024, // 5MB
      accept: ['pdf', 'docx', 'doc'],
    },
  ];
};

export const brokerageFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { id } = useParams();

  return [
    {
      type: 'text',
      name: 'brokerage.name',
      control,
      label: 'Brokerage Name',
      rules: {
        required: 'Brokerage is required',
        value: true,
      },
    },
    {
      type: 'file',
      name: 'brokerage.document',
      control,
      label: 'SLA Agreement',
      rules: {
        required: 'SLA agreement is required',
        value: true,
      },
      meta: {
        refId: id || '',
        belongsTo: 'asset',
        isPublic: true,
      },
           maxSize: 5 * 1024 * 1024, // 5MB
      accept: ['pdf', 'docx', 'doc'],
    },
  ];
};

export const assetManagementFormConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext();
  const { id } = useParams();

  return [
    {
      type: 'text',
      name: 'assetManagementCompany.name',
      control,
      label: 'Asset Management Company',
      rules: {
        required: 'Asset management company is required',
        value: true,
      },
    },
    {
      type: 'file',
      name: 'assetManagementCompany.document',
      control,
      label: 'SLA Agreement',
      rules: {
        required: 'SLA agreement is required',
        value: true,
      },
      meta: {
        refId: id || '',
        belongsTo: 'asset',
        isPublic: true,
      },
           maxSize: 5 * 1024 * 1024, // 5MB
      accept: ['pdf', 'docx', 'doc'],
    },
  ];
};
