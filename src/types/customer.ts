export type customerType = {
    id: number;
    uuid: string;
    name: string;
    firstname: string;
    lastname: string | null;
    phone: string;
    country_code: string;
    country: string | null;
    email: string;
    welcome_mail_sent: boolean;
    otpless_req_id: string;
    otp_expired_at: string | null;
    dob: string | null;
    user_wallet_address : string | null ;
    avatar: string;
    gender: string | null;
    address: string | null;
    escrow_user_id: string | null;
    escrow_ref_id: string | null;
    pan_number: string | null;
    bank_details: string | null;
    language: string | null;
    age: number | null;
    is_terms_condition: boolean | null;
    email_verified: boolean;
    email_request_id: string | null;
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
    fcm_token: string;
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
    total_investment_amount: string | null;
    total_investment_sqyds: string | null;
    order: any[];  // Assuming order is an empty array or an array of objects.
    kyc: KYCStatus;
    comments: any[];  // Assuming comments is an array of objects.
    propertyBookmark: any[];  // Assuming propertyBookmark is an array of objects.
    propertyWaitingList: any[];  // Assuming propertyWaitingList is an array of objects.
    role_data: RoleData;
};

export type KYCStatus = {
    status: string;
    email_verification_status: boolean;
    aadhar_verification_status: boolean;
    pan_verification_status: boolean;
    video_verification_status: boolean;
};

export type RoleData = {
    id: number;
    name: string;
};
