
export interface PaginationTypes {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
}

export interface IBoardMember {
  id: string;
  uuid: string;
  name: string;
  email: string;
  title: string;
  permission_level: string;
  status: boolean;
  dsc_din: boolean;
  llp_document: boolean;
  whatsapp_number: string | null;
  provide_customer_support: string;
  note: string;
  company_id: number;
  created_at: string;
  updated_at: string;
}
