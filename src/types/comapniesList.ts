export type companyTypes = {
    id: number; // Unique identifier
    uuid: string; // UUID for the entity
    name: string; // Name of the entity
    instrument: string; // Instrument type (e.g., LLP Ownership)
    incorporation_type: string; // Type of incorporation (e.g., llp)
    Country_of_Incorportaion: string; // Country of incorporation
    llp_agreement_copy: string; // URL for the LLP agreement copy
    RERA_Certificate: string; // URL for the RERA certificate
    account_id: string; // Account ID (empty string allowed)
    company_profile_photo: string; // URL for the company profile photo
    spv_memo: string; // SPV memo as a string
    risk_disclosure: string; // Risk disclosure as a string
    disclosures: Array<{
        name: string; // Name of the disclosure
        status: boolean; // Status of the disclosure (true/false)
    }>; // Array of disclosure objects
    address: string; // Address of the entity
    city: string; // City of the entity (can be empty)
    state: string; // State of the entity (can be empty)
    status: boolean; // Current status of the entity (true/false)
    country: string; // Country name
    logo: string | null; // URL for the logo (nullable)
    phone: string; // Phone number (can be empty)
    email: string; // Email address (can be empty)
    pincode: string; // Pincode (can be empty)
    total_token: number; // Total token count
    step_completed: number; // Steps completed (can have decimal values)
    total_allocated: number; // Total allocated value
    erc20_symbol: string | null; // ERC20 symbol (nullable)
    erc20_name: string | null; // ERC20 name (nullable)
    erc20_address: string | null; // ERC20 address (nullable)
    erc20_owner_address: string | null; // ERC20 owner address (nullable)
    created_at: string; // Creation date in ISO 8601 format
    updated_at: string; // Update date in ISO 8601 format
    total_property: number; // Total number of properties
};
