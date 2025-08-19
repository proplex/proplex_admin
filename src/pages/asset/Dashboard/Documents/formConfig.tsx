

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

export const formConfig = (control: any): FormFieldConfig[] => {
  return [
    {
      label: 'Provider',
      name: `provider`,
      type: 'select',
      control,
      options: [{ label: 'Docuseal', value: 'docuseal' }],
      rules: {
        required: `Provider is required`,
      },
    },
    {
      label: 'Template Id',
      name: `providerTemplateId`,
      type: 'text',
      control,
      rules: {
        required: `Template Id is required`,
      },
    },
    {
      label: 'Template Name',
      name: `templateName`,
      type: 'text',
      control,
      rules: {
        required: `Template Name is required`,
      },
    },
  ];
};
