import { FormFieldConfig } from "@/components/UseForm/ControllerMap";

// Define the formConfig function with the parameter type and return type
const formConfig = ({control}: { control: any }): FormFieldConfig[] => [
  {
    name: 'privacy_policy',
    label: 'Privacy Policy Document',
    type: 'textarea',
    control,
    placeholder: 'Enter the complete privacy policy document outlining data collection, usage, sharing, and protection practices...',
    rules: {
      required: 'Privacy Policy is required for SPV compliance',
      minLength: {
        value: 500,
        message: 'Privacy Policy must be at least 500 characters',
      },
      maxLength: {
        value: 5000,
        message: 'Privacy Policy should not exceed 5000 characters',
      },
    },
    bottomText: 'Comprehensive privacy policy covering data handling, user rights, and regulatory compliance requirements'
  },
  {
    name: 'terms_conditions',
    label: 'Terms and Conditions',
    type: 'textarea',
    control,
    placeholder: 'Enter the complete terms and conditions document including service terms, investment risks, liability clauses...',
    rules: {
      required: 'Terms and Conditions are required for SPV compliance',
      minLength: {
        value: 500,
        message: 'Terms and Conditions must be at least 500 characters',
      },
      maxLength: {
        value: 5000,
        message: 'Terms and Conditions should not exceed 5000 characters',
      },
    },
    bottomText: 'Detailed terms covering service usage, investment risks, dispute resolution, and legal obligations'
  },
  {
    name: 'regulatory_compliance_statement',
    label: 'Regulatory Compliance Statement',
    type: 'textarea',
    control,
    placeholder: 'Provide a statement confirming compliance with applicable financial regulations, securities laws, and SPV requirements...',
    rules: {
      required: 'Regulatory Compliance Statement is required',
      minLength: {
        value: 200,
        message: 'Compliance Statement must be at least 200 characters',
      },
      maxLength: {
        value: 2000,
        message: 'Compliance Statement should not exceed 2000 characters',
      },
    },
    bottomText: 'Statement confirming adherence to relevant financial regulations and SPV operational requirements'
  },
  {
    name: 'legal_review_confirmation',
    label: 'Legal Review Confirmation',
    type: 'checkbox',
    control,
    rules: {
      required: 'Legal review confirmation is mandatory for SPV approval',
    },
    bottomText: 'Confirm that all documents have been reviewed and approved by qualified legal counsel',
    options: [
      {
        value: 'confirmed',
        label: 'I confirm that these documents have been reviewed by qualified legal counsel and comply with applicable regulations'
      }
    ]
  },
  {
    name: 'document_version',
    label: 'Document Version',
    type: 'text',
    control,
    placeholder: 'e.g., v1.0, v2.1',
    rules: {
      required: 'Document version is required for tracking',
      pattern: {
        value: /^v\d+\.\d+$/,
        message: 'Version must follow format: v1.0, v2.1, etc.',
      },
    },
    bottomText: 'Version control for document tracking and updates'
  },
  {
    name: 'effective_date',
    label: 'Effective Date',
    type: 'date',
    control,
    rules: {
      required: 'Effective date is required',
    },
    bottomText: 'Date when these policies and terms become effective'
  }
];

export default formConfig;