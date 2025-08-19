export type EmployeeTypes = {
    id: number; // User ID
    uuid: string; // Unique identifier (UUID)
    name: string; // Full name of the user
    firstname: string; // First name of the user
    lastname: string; // Last name of the user
    phone: string; // Phone number as a string
    country_code: string; // Country code as a string
    country: string | null; // Country name, nullable
    email: string; // Email address
    welcome_mail_sent: boolean; // Indicates if welcome email is sent
    otpless_req_id: string | null; // OTP-less request ID, nullable
    otp_expired_at: string | null; // OTP expiry timestamp, nullable
    dob: string | null; // Date of birth in ISO format, nullable
    avatar: string; // URL to the avatar image
    gender: string | null; // Gender, nullable
    address: string; // User's address
    escrow_user_id: string | null; // Escrow user ID, nullable
    escrow_ref_id: string | null; // Escrow reference ID, nullable
    pan_number: string | null; // PAN number, nullable
    bank_details: string | null; // Bank details, nullable
    language: string; // Languages known by the user
    age: number | null; // User's age, nullable
    is_terms_condition: boolean | null; // Terms and conditions acceptance, nullable
    email_verified: boolean; // Email verification status
    email_request_id: string | null; // Email request ID, nullable
    referrer_id: string | null; // Referrer ID, nullable
    referral_credited: boolean; // Indicates if referral is credited
    referral_token: string; // Referral token
    is_verification_dismiss: boolean | null; // Verification dismissal flag, nullable
    token: string | null; // Token, nullable
    role: number; // User role ID
    work_email: string; // Work email address
    whatsapp_no: string; // WhatsApp number
    join_date: string; // Join date in ISO format
    status: string; // User status
    fcm_token: string | null; // Firebase Cloud Messaging token, nullable
    wallet_balance: string; // Wallet balance as a string
    created_by: number | null; // ID of creator, nullable
    updated_by: number | null; // ID of updater, nullable
    is_employee: boolean; // Employee status
    subscriber_id: number | null; // Subscriber ID, nullable
    org_id: number | null; // Organization ID, nullable
    meeting_link: number | null; // Meeting link, nullable
    created_at: string; // Creation timestamp in ISO format
    updated_at: string; // Update timestamp in ISO format
    deleted_at: string | null; // Deletion timestamp, nullable
    kyc: {
        status: string; // KYC status
        email_verification_status: boolean; // Email KYC verification status
        aadhar_verification_status: boolean; // Aadhar KYC verification status
        pan_verification_status: boolean; // PAN KYC verification status
        video_verification_status: boolean; // Video KYC verification status
    }; // KYC information
    comments: Array<any>; // Comments array
    propertyBookmark: Array<any>; // Property bookmarks
    propertyWaitingList: Array<any>; // Property waiting list
    role_data: {
        id: number; // Role ID
        name: string; // Role name
    }; // Role data
};
