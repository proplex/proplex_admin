import { LucideProps } from 'lucide-react';

export type ICompany = {
  // Company Info
  name: string;
  instrument: string;
  incorporation_type: string;
  countryOfIncorporation: string;
  incorporationDate: string;
  llp_agreement_copy?: string;
  walletAddress: string;
  addressLine: string;
  state: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  
  // SPV Memo
  spvMemo?: string;
  
  // Bank Details
  bankName?: string;
  accountType?: string;
  accountNumber?: string;
  ifscCode?: string;
  swiftCode?: string;
  bankInstructions?: string;
  
  // Risk & Disclosure
  riskAccepted?: boolean;
  disclosuresSigned?: boolean;
  
  // Board Member
  boardMembers?: {
    name: string;
    position: string;
    email: string;
  }[];
};

export type FormStep = {
  id: string;
  title: string;
  icon?: React.ReactNode;
};

export type ColumnProps = {
  header?: string;
  accessorKey: string;
  onChange?: (value: any, row: any) => void;
  onClick?: (row: any) => void;
  type?:
    | 'date'
    | 'number'
    | 'switch'
    | 'action'
    | 'string'
    | 'image'
    | 'multipledata'
    | 'progress'
    | 'chip'
    | 'status'
    | 'adminApproval'
    | 'imageAndText'
    | 'url'
    | 'profile'
    | 'asset'
    | 'assetStatus'
    | 'mappedValue';
  icon?: React.ReactElement<LucideProps>;
  chipColor?: string;
  profileKeys?: any;
  typeParams?: {
    valueMap?: Record<string, string>;
  };
};


