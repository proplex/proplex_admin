import { RoleData } from "@/types/customer";
import { CustomerDetails, customerDetailType, Kyc, Order } from "@/types/customerDetail";

const defaultKyc: Kyc = {
  status: "pending",
  email_verification_status: false,
  aadhar_verification_status: false,
  pan_verification_status: false,
  video_verification_status: false,
};

const defaultRoleData: RoleData = {
  id: 2,
  name: "Customer",
};

const defaultOrder: Order = {
  id: 0,
  status: "Pending",
  property_id: 0,
  no_sqyds: null,
  total_amount: 0,
  created_at: "",
  updated_at: "",
  user_name: "",
  user_id: 0,
  property_name: "",
};

const defaultCustomerDetails: CustomerDetails = {
  id: 0,
  uuid: "",
  name: "",
  firstname: "",
  lastname: "",
  phone: "",
  country_code: "+91",
  country: null,
  email: "",
  welcome_mail_sent: false,
  otpless_req_id: "",
  otp_expired_at: null,
  dob: null,
  avatar: "https://reallyyappimages.s3.ap-south-1.amazonaws.com/images/male.png",
  gender: null,
  address: null,
  escrow_user_id: "",
  escrow_ref_id: null,
  pan_number: null,
  bank_details: null,
  language: null,
  age: null,
  is_terms_condition: null,
  email_verified: false,
  email_request_id: "",
  referrer_id: null,
  referral_credited: false,
  referral_token: "",
  is_verification_dismiss: null,
  token: "",
  role: 2,
  work_email: null,
  whatsapp_no: null,
  join_date: null,
  status: "Active",
  fcm_token: null,
  wallet_balance: "0.00",
  created_by: null,
  updated_by: null,
  is_employee: false,
  subscriber_id: null,
  org_id: null,
  meeting_link: null,
  created_at: "",
  updated_at: "",
  deleted_at: null,
  kyc: defaultKyc,
  comments: [],
  propertyBookmark: [],
  propertyWaitingList: [],
  role_data: defaultRoleData,
};

export const defaultDataStructure: customerDetailType = {
  user: defaultCustomerDetails,
  orders: [defaultOrder],  // Default to an array of one order object
  total_sqyds: 0,
  current_value: 0,
  total_invested_amount: 0,
  total_returns: 0,
  my_investments: [],
};
