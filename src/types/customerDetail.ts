export interface Kyc {
  status: string;
  email_verification_status: boolean;
  aadhar_verification_status: boolean;
  pan_verification_status: boolean;
  video_verification_status: boolean;
}

export interface RoleData {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  status: string;
  property_id: number;
  no_sqyds: number | null;
  total_amount: number;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_id: number;
  property_name: string;
}

export  interface CustomerDetails {
  id: number;
  uuid: string;
  name: string;
  firstname: string;
  lastname: string;
  phone: string;
  country_code: string;
  country: string | null;
  email: string;
  welcome_mail_sent: boolean;
  otpless_req_id: string;
  otp_expired_at: string | null;
  dob: string | null;
  avatar: string;
  gender: string | null;
  address: string | null;
  escrow_user_id: string;
  escrow_ref_id: string | null;
  pan_number: string | null;
  bank_details: string | null;
  language: string | null;
  age: number | null;
  is_terms_condition: boolean | null;
  email_verified: boolean;
  email_request_id: string;
  referrer_id: string | null;
  referral_credited: boolean;
  referral_token: string;
  is_verification_dismiss: boolean | null;
  token: string;
  role: number;
  work_email: string | null;
  whatsapp_no: string | null;
  join_date: string | null;
  status: string;
  fcm_token: string | null;
  wallet_balance: string;
  created_by: string | null;
  updated_by: string | null;
  is_employee: boolean;
  subscriber_id: string | null;
  org_id: string | null;
  meeting_link: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  kyc: Kyc;
  comments: any[];
  propertyBookmark: any[];
  propertyWaitingList: any[];
  role_data: RoleData;
}

export  interface customerDetailType {
  user: CustomerDetails;
  orders: Order[];
  total_sqyds: number;
  current_value: number;
  total_invested_amount: number;
  total_returns: number;
  my_investments: any[];
}
