

import { max } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export const formConfig = () => {
  const { id: companyId } = useParams() as { id: string };
  const { control } = useFormContext<any>();
  return [
    {
      label: 'Logo',
      name: 'logo',
      type: 'image',
      control,
      rules: {
        required: 'Logo is Required',
      },
      accept: ['png', 'jpg', 'jpeg'],
      fullWidth: true,
      meta: {
        refId: companyId || '681ae78be0ac8cb9f08f09a7',
        belongsTo: 'company',
        isPublic: true,
      },
    },
    {
      label: 'LLC Operating Agreement',
      name: `legalDocuments.llcOperatingAgreement`,
      type: 'file',
      accept: ['pdf'],
      control,
      rules: {
        required: 'LLC Operating Agreement is required',
      },
      meta: {
        refId: companyId,
        belongsTo: 'company',
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
    },
    {
      label: 'Articles of Association',
      name: `legalDocuments.articlesOfAssociation`,
      type: 'file',
      rules: {
        required: 'Article of Association is required',
      },
      accept: ['pdf'],
      control,
      meta: {
        refId: companyId,
        belongsTo: 'company',
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
    },
    {
      label: 'Memorandum of Association (MOA)',
      name: 'legalDocuments.memorandumOfAssociation',
      type: 'file',
      accept: ['pdf'],
      control,
      rules: {
        required: 'Memorandum of Association (MOA) is required',
      },
      meta: {
        refId: companyId,
        belongsTo: 'company',
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
    },
    {
      label: 'Other Documents (Optional)',
      name: 'legalDocuments.otherDocuments',
      type: 'file',
      accept: ['pdf'],
      control,
      meta: {
        refId: companyId,
        belongsTo: 'company',
        isPublic: true,
      },
      maxSize: 5 * 1024 * 1024,
    },
  ];
};
