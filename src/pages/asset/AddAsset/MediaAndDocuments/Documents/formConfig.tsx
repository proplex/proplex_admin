

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const formConfig = ({ index }: { index: number }): FormFieldConfig[] => {
  const { id = null } = useParams();
  const { control } = useFormContext();
  return [
    {
      name: `documents.${index}.name`,
      label: 'Name',
      type: 'text',
      control,
      rules: {
        required: 'Name is required',
      },
    },
    {
      name: `documents.${index}.description`,
      label: 'Description',
      type: 'text',
      control,
      rules: {
        required: 'Description is required',
      },
    },

    {
      name: `documents.${index}.document`,
      label: 'Document',
      type: 'file',
      accept: [
        'pdf',
        'docx',
        'doc',
        'xlsx',
        'xls',
        'csv',
        'pptx',
        'ppt',
        'jpg',
        'jpeg',
        'png',
      ],
      control,
      rules: {
        required: 'Document is required',
      },
      meta: {
        refId: id || '',
        belongsTo: 'asset',
        isPublic: true,
      },
    },
    {
      name: `documents.${index}.type`,
      label: 'Document Type',
      type: 'select',
      control,
      options: [
        { label: 'Asset Pitch Deck', value: 'asset-pitch-deck' },
        { label: 'Asset Document', value: 'asset-document' },
        { label: 'SPV Legal Document', value: 'spv-legal-document' },
        { label: 'Valuation Report', value: 'valuation-report' },
        { label: 'Market Research Report', value: 'market-research-report' },
        { label: 'Other', value: 'other' },
      ],
      rules: {
        required: 'Document Type is required',
      },
    },
    {
      name: `documents.${index}.isProtected`,
      label: 'Is Protected',
      type: 'switch',
      control,
    },
    {
      name: `documents.${index}.isActive`,
      label: 'Is Active',
      type: 'switch',
      control,
    },
  ];
};

export default formConfig;
