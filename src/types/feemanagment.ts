export type feemanagementtypes = {
  length: any;
  id: number;
  uuid: string;
  name: string;
  value: string | null;
  type: string | null;
  property_types: {
    label: string;
    value: string;
    percentage: string;
  }[];
  types: {
    label: string;
    value: string;
  }[];
  status: boolean;
  created_at: string;
  updated_at: string;
};

export type ResponseData = {
  type: string;
  message: string;
  data: feemanagementtypes[];
  pager: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
  };
};
