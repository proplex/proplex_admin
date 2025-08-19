export enum FeeType {
  REGISTRATION = "registation",
  LEGAL = "legal",
}

export enum AssetClass {
  COMMODITY = "commodity",
  HARDWARE = "hardware",
  EQUITY = "equity",
  DEBT = "debt",
  REAL_ESTATE = "real-estate",
  FUND = "fund",
  GOODS = "goods",
  IP_AND_LICENSES = "ip-and-licenses",
}

export enum AssetCategory {
  COMMERCIAL = "commercial",
  HOLIDAY_HOMES = "holiday-homes",
  RESIDENTIAL = "residential",
  LAND_PARCEL = "land-parcel",
}

export const FEE_TYPE = {
  [AssetClass.REAL_ESTATE]: [
    { label: "Registration", value: FeeType.REGISTRATION },
    { label: "Legal", value: FeeType.LEGAL },
  ],
};

export const TENANT_TYPE = [
  { label: "Corporate", value: "corporate" },
  { label: "Individual", value: "individual" },
  { label: "Government", value: "government" },
  { label: "Educational", value: "educational" },
  { label: "Retail", value: "retail" },
  { label: "Other", value: "other" },
];

export const ASSET_CLASS = [
  { label: "Commodity", value: AssetClass.COMMODITY },
  { label: "Hardware", value: AssetClass.HARDWARE },
  { label: "Equity", value: AssetClass.EQUITY },
  { label: "Debt", value: AssetClass.DEBT },
  { label: "Real Estate", value: AssetClass.REAL_ESTATE },
  { label: "Fund", value: AssetClass.FUND },
  { label: "Goods", value: AssetClass.GOODS },
  { label: "IP and Licenses", value: AssetClass.IP_AND_LICENSES },
];

export const ASSET_CATEGORY = {
  [AssetClass.COMMODITY]: [
    { label: "Commercial", value: AssetCategory.COMMERCIAL },
  ],
  [AssetClass.REAL_ESTATE]: [
    { label: "Commercial", value: AssetCategory.COMMERCIAL },
    { label: "Holiday Homes", value: AssetCategory.HOLIDAY_HOMES },
    { label: "Residential", value: AssetCategory.RESIDENTIAL },
    { label: "Land Parcel", value: AssetCategory.LAND_PARCEL },
  ],
};

export const BANK_ACCOUNT_TYPE = [
  { label: "Escrow Bank Account", value: "escrow-bank-account" },
  { label: "Current Account", value: "current-account" },
  { label: "Corporate Account", value: "corporate-account" },
  { label: "Saving Account", value: "savings-account" },
];

export const DOCUMENT_SIGN_PROVIDERS = [
  { value: "docuseal", label: "Docuseal" },
];


export enum EKycOrAmlRequirements {
  REQUIRED_FOR_ALL = "required-for-all",
  ACCREDITED_ONLY = "accredited-only",
  ENHANCED = "enhanced",
  OPTIONAL = "optional",
  NONE = "none"
}
export const KYC_OR_AML_REQUIREMENTS = [
  { label: "Required for all", value: EKycOrAmlRequirements.REQUIRED_FOR_ALL , disabled: false},
  { label: "Accredited only", value: EKycOrAmlRequirements.ACCREDITED_ONLY , disabled: true},
  { label: "Enhanced", value: EKycOrAmlRequirements.ENHANCED , disabled: true},
  { label: "Optional", value: EKycOrAmlRequirements.OPTIONAL , disabled: true},
  { label: "None", value: EKycOrAmlRequirements.NONE , disabled: true},
];
export enum EInvestorAcreditation {
  OPEN_TO_ALL = "open-to-all",
  ACCREDITED_ONLY = "accredited-only",
  INSTITUTIONAL_ONLY = "institutional-only",
  QUALIFIED = "qualified",
  CUSTOM_APPROVAL = "custom-approval"
}

export const INVESTOR_ACREDITATION = [
  { label: "Open to all", value: EInvestorAcreditation.OPEN_TO_ALL  },
  { label: "Accredited only", value: EInvestorAcreditation.ACCREDITED_ONLY , disabled: true},
  { label: "Institutional only", value: EInvestorAcreditation.INSTITUTIONAL_ONLY , disabled: true},
  { label: "Qualified", value: EInvestorAcreditation.QUALIFIED , disabled: true},
  { label: "Custom approval", value: EInvestorAcreditation.CUSTOM_APPROVAL , disabled: true},
];