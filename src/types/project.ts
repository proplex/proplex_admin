type BlockchainMetadata = {
  id: number;
  name: string;
  network: string;
  rpcUrls: {
    default: {
      http: string[];
    };
  };
  testnet: boolean;
  unsupported: boolean;
  blockExplorers: {
    default: {
      url: string;
      name: string;
    };
  };
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
};

type PropertyType = {
  id: number;
  name: string;
};

export type ProjectType = {
  id: string;
  name: string;
  status: boolean;
  property_type_id: number;
  stage: string | null;
  description: string;
  ownership_model: string;
  share_type: string;
  escrow_account: string | null;
  legal_advisory: string | null;
  asset_management: string | null;
  brokrage: string | null;
  featured_video_type: string;
  mark_as: string | null;
  step_completed: number;
  terms_conditions: string | null;
  stage_of_production: string;
  individual_group: string | null;
  percentage_of_ip: string;
  _right: string | null;
  nature_of_ip: string | null;
  percentage_of_fandora: string | null;
  duration: string | null;
  // cost_of_acquisition: string | null;
  attachments: string | null;
  total_expected_investment: string;
  token_amount: string;
  total_token: number;
  expected_monetisation_after_ip_right: string;
  proposed_irr: string;
  proposed_money_multipl: string;
  lock_in_period: string;
  other_term: string;
  feature_image: string;
  media_type: string | null;
  media_value: string | null;
  project_report_by_ip_manager: string | null;
  analysis_report: string | null;
  llp_company: number | null;
  is_sto_created: boolean;
  sto_erc20_address: string | null;
  is_sto_sale_created: boolean;
  is_booking_amount_required: boolean;
  join_waitlist: boolean;
  initial_mint_isdone: boolean;
  sto_sale_address: string | null;
  indr_token_deploy: boolean;
  indr_token_address: string | null;
  sto_owner_address: string | null;
  sto_name: string;
  sto_symbol: string;
  blockchain_metadata: BlockchainMetadata | null;
  escrow_metadata: string | null;
  created_by: number | null;
  updated_by: number | null;
  org_id: number | null;
  reject_reason: string;
  asset_value: string | null;
  like_to_sell: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  total_investors_hr_ago: number;
  total_investors: number;
  total_sqyds_sold: string;
  total_sqyds_booked: string;
  property_invested_percent: number;
  propertyType: PropertyType;
};
