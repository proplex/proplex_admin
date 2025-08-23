import {
  X,
  Building2,
  File,
  Users,
  Banknote,
  Files,
  Layers,
  Container,
  ListOrdered,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const defaultPagination = {
  totalItems: 0,
  currentPage: 1,
  pageSize: 10,
  totalPages: 0,
  hasMore: false,
};

export const IncorporationType = [
  { value: "llp", label: "LLP" },
  { value: "partnership", label: "Partnership" },
  { value: "private limited", label: "Private Limited" },
  { value: "proprietorship", label: "Proprietorship" },
];

export const shareType = [
  { value: "Partner Share Certificate", label: "Partner Share Certificate" },
  { value: "LLP Certificate", label: "LLP Certificate" },
  { value: "SPV Share Certificates", label: "SPV Share Certificates" },
];

export const ownerShipModel = [
  { value: "LLP Ownership", label: "LLP Owner Ship" },
  { value: "partnership", label: "Partnership" },
  { value: "trustee", label: "Trustee" },
  { value: "Pvt limited", label: "Pvt limited" },
];

export const contentType = [
  { value: "1", label: "Film" },
  { value: "2", label: "Web Series" },
  { value: "3", label: "Music" },
  { value: "4", label: "Books" },
  { value: "5", label: "Sport" },
];

export const PROJECT_STATUS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Completed", label: "Completed" },
  { value: "Application Pending", label: "Incomplete" },
];

export const stage_of_production = [
  { value: "In-Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

export const InstrumentOptions = [
  { value: "LLP Ownership", label: "LLP Ownership" },
  { value: "trustee", label: "Trustee" },
  { value: "partnership", label: "Partnership" },
];

export const PermissionLevel = [{ value: "Manager", label: "Manager" }];

export const BoardMemberStatus = [
  { value: true, label: "Active" },
  { value: false, label: "Inactive" },
];

export const BoardMemberStatusOptions = [
  { value: "Yes", label: "YES" },
  { value: "No", label: "NO" },
];

export const AdvisorType = [
  { value: "Manager", label: "Manager" },
  { value: "Advisor", label: "Advisor" },
  { value: "Board Member", label: "Board Member" },
];

export const LockInPeriod = [
  { value: "6", label: "6 Months" },
  { value: "12", label: "12 Months" },
  { value: "18", label: "18 Months" },
];

export const ProjectPeriod = [
  { value: "6", label: "6 Months" },
  { value: "12", label: "12 Months" },
  { value: "18", label: "18 Months" },
];

export const nature = [
  { value: "OwnerShip", label: "Owner Ship" },
  { value: "RevenueSharing", label: "Revenue Sharing " },
];

export const durations = [
  { value: "OneYear", label: "1 Year" },
  { value: "TwoYear", label: "2 Years" },
  { value: "ThreeYear", label: "3 Years" },
];

export const ORDER_STATUS = [
  { label: "Booked", value: "Booked" },
  { label: "Receipt", value: "Receipt" },
  {
    label: "Awaiting payment confirmation",
    value: "Awaiting payment confirmation",
  },
  { label: "Invested", value: "Invested" },
  { label: "Token Transfer Success", value: "Token Transfer Success" },
  { label: "Token Transfer Failed", value: "Token Transfer Failed" },
  { label: "Token Burn Failed", value: "Token Burn Failed" },
  { label: "Relist Request", value: "Relist Request" },
  { label: "Approve List", value: "Approve List" },
  { label: "Token Burn & Refunded", value: "Token Burn & Refunded" },
  { label: "Partial Payment", value: "Partial Payment" },
  { label: "Full payment pending", value: "Full payment pending" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Failed", value: "Failed" },
];

export const ORDER_STATUS_OPTIONS = [
  { label: "Booked", value: "Booked" },
  {
    label: "Document Signature Pending",
    value: "Document_Signature_Pending",
  },
  { label: "Full Payment Pending", value: "Full_Payment_Pending" },
  { label: "Full Payment Done", value: "Full_Payment_Done" },
  { label: "Token Transfer", value: "Token_Transfer" },
  { label: "Cancelled Request", value: "Cancel_Request_Raised" },
  { label: "Refunded", value: "Refunded" },
];

export const IndustryOptions = [
  { value: "Technology", label: "Technology" },
  { value: "Energy", label: "Energy" },
  { value: "Digital Marketing", label: "Digital Marketing" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Education", label: "Education" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "Transportation", label: "Transportation" },
  { value: "Retail", label: "Retail" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Construction", label: "Construction" },
  { value: "Hospitality", label: "Hospitality" },
  { value: "Telecommunications", label: "Telecommunications" },
];

export const ASSET_STEPS_TABS = [
  {
    id: "asset-information",
    title: "Asset Information",
    tabs: [
      { id: "asset-type", title: "Asset Type" },
      { id: "investment-details", title: "Investment Details" },
      { id: "rent-information", title: "Rent Information" },
      { id: "escrow-legal", title: "Escrow & Legal Details" },
    ],
  },
  {
    id: "fee-structure",
    title: "Fee Structure",
  },
  {
    id: "token-information",
    title: "Token Information",
  },
  {
    id: "media-documents",
    title: "Media & Documents",
    tabs: [
      { id: "gallery", title: "Asset Gallery" },
      { id: "documents", title: "Asset Documents" },
    ],
  },
  {
    id: "issues-due-diligence",
    title: "Issuer & Due-diligence",
    tabs: [
      { id: "asseet-hosted-by", title: "Asset Hosted By" },
      { id: "asseet-due-diligence", title: "Asset Due Diligence" },
    ],
  },
  {
    id: "features-amenities",
    title: "Features & Amenities",
    tabs: [
      { id: "features", title: "Features" },
      { id: "amenities", title: "Amenities" },
    ],
  },
  {
    id: "location-places",
    title: "Location & Places",
  },
  {
    id: "additional-details",
    title: "Additional Details",
    tabs: [
      { id: "risk-factors", title: "Risk Factors" },
      { id: "exit-opportunities", title: "Exit Opportunities" },
      { id: "risk-disclosure", title: "Risk Disclosure" },
      { id: "additional-tax", title: "Additional Tax" },
      { id: "embedded-finance", title: "Embedded Finance" },
    ],
  },
  {
    id: "tandc-faq",
    title: "T&C, FAQ",
    tabs: [
      { id: "terms-and-conditions", title: "Terms & Conditions" },
      { id: "faqs", title: "FAQ" },
    ],
  },
];

export const SPV_TABS = [
  {
    id: "basic-information",
    title: "Basic Information",
    icon: <Building2 className="text-[#6C2BD9] " size={16} />,
  },
  {
    id: "memo-terms",
    title: "Memo & Terms",
    icon: <File className="text-[#6C2BD9] " size={16} />,
  },
  {
    id: "escrow-bank-details",
    title: "Escrow Bank Details",
    icon: <Banknote className="text-[#6C2BD9] " size={16} />,
  },
  {
    id: "legal-documents",
    title: "Legal Documents",
    icon: <Files className="text-[#6C2BD9] " size={16} />,
  },
  {
    id: "board-members",
    title: "Board Members",
    icon: <Users className="text-[#6C2BD9] " size={16} />,
  },
  {
    id: "dao-integration",
    title: "DAO Integration",
    icon: <Layers className="text-[#6C2BD9] " size={16} />,
  },
];

export const CURRENCY_OPTIONS = [
  { label: "₹ INR", value: "INR" },
  // { label: "$ USD", value: "USD" },
];

export const INSTRUMENT_TYPE = [
  { label: "Equity", value: "equity" },
  { label: "Direct Ownership", value: "direct-ownership" },
  { label: "Debt", value: "debt" },
  { label: "Fund", value: "fund" },
];

export const ASSET_STYLE = [
  // Traditional Categories
  { label: "Tower", value: "tower" },
  { label: "Villa", value: "villa" },
  { label: "Building", value: "building" },
  { label: "Developed Land", value: "developed-land" },
  { label: "Individual Land", value: "individual-land" },
  
  // Data Centers & Edge Locations
  { label: "Hyperscale Data Center", value: "hyperscale-data-center" },
  { label: "Edge Computing Facility", value: "edge-computing-facility" },
  { label: "5G Network Node", value: "5g-network-node" },
  
  // Cold Storage Hubs
  { label: "Refrigerated Warehouse", value: "refrigerated-warehouse" },
  { label: "Temperature-Controlled Vault", value: "temperature-controlled-vault" },
  { label: "Blast-Freezer Facility", value: "blast-freezer-facility" },
  
  // Last-Mile Logistics
  { label: "Fulfillment Center", value: "fulfillment-center" },
  { label: "Multi-Level Warehouse", value: "multi-level-warehouse" },
  { label: "Cold-Chain Pod", value: "cold-chain-pod" },
  
  // Co-Working & Flexible Office
  { label: "Hot-Desk Network", value: "hot-desk-network" },
  { label: "Incubator Suite", value: "incubator-suite" },
  { label: "Managed Office Floor", value: "managed-office-floor" },
  
  // Renewable Industrial Parks
  { label: "Solar Manufacturing Park", value: "solar-manufacturing-park" },
  { label: "Battery Storage Yard", value: "battery-storage-yard" },
  { label: "Hydrogen Production Plant", value: "hydrogen-production-plant" },
  
  // High-Street Flagship Retail
  { label: "Flagship Store", value: "flagship-store" },
  { label: "Corner Lot F&B", value: "corner-lot-fb" },
  { label: "Experiential Showroom", value: "experiential-showroom" },
  
  // Hotels & Resorts
  { label: "Luxury City Hotel", value: "luxury-city-hotel" },
  { label: "Resort Property", value: "resort-property" },
  { label: "Extended-Stay Suite", value: "extended-stay-suite" },
  
  // Mixed-Use Complexes
  { label: "Hybrid Tower", value: "hybrid-tower" },
  { label: "Transit-Oriented Development", value: "transit-oriented-development" },
  { label: "Vertical Mixed-Use Stack", value: "vertical-mixed-use-stack" },
];

export enum SPVType {
  LLC = "llc",
  PrivateLimited = "private-limited",
  DAOLLC = "dao-llc",
  Corporation = "corporation",
  PublicEntity = "public-entity",
  Partnership = "partnership",
}

export const SPV_TYPES = [
  { label: "LLC", value: SPVType.LLC },
  { label: "Private Limited", value: SPVType.PrivateLimited },
  { label: "DAO LLC", value: SPVType.DAOLLC },
  { label: "Corporation", value: SPVType.Corporation },
  { label: "Public Entity", value: SPVType.PublicEntity },
  { label: "Partnership", value: SPVType.Partnership },
];

export const COUNTRIES = [
  { label: "India", value: "IN" },
  // { label: "USA", value: "US" },
];

export const TENANT_TYPE = [
  { label: "Corporate", value: "corporate" },
  { label: "Individual", value: "individual" },
  { label: "Government", value: "government" },
  { label: "Educational", value: "educational" },
  { label: "Retail", value: "retail" },
  { label: "Other", value: "other" },
];

export enum EOrderTrackingStatus {
  ORDER_CREATED = "order-created",
  AWAITING_FOR_FULL_INVESTMENT = "awaiting-100%-investment",
  FULLY_INVESTED = "fully-invested",
  AWAITING_FOR_DOCUMENTS_TO_BE_SIGNED = "awaiting-documents-to-be-signed",
  DOCUMENTS_SENT_FOR_SIGNATURE_TO_BE_SIGNED = "documents-sent-for-signature-to-be-signed",
  DOCUMENTS_SIGNED = "documents-signed",
  FULL_PAYMENT_PENDING = "full-payment-pending",
  FULLY_PAID = "fully-paid",
  PROPERTY_TOKENS_TRANSFER_PENDING = "property-tokens-transfer-pending",
  PROPERTY_TOKENS_TRANSFERRED_AND_ORDER_SUCCESSFULLY_COMPLETED = "property-tokens-transferred-and-order-successfully-completed",
  ORDER_CANCELLED = "order-cancelled",
  ORDER_FAILED = "order-failed",
  REFUNDED = "refunded",
  unknown = "unknown",
}

export const ORDER_TRACKING_STATUS = [
  { label: "Order Created", value: EOrderTrackingStatus.ORDER_CREATED },
  {
    label: "Awaiting for full investment",
    value: EOrderTrackingStatus.AWAITING_FOR_FULL_INVESTMENT,
  },
  {
    label: "Fully Invested",
    value: EOrderTrackingStatus.FULLY_INVESTED,
  },
  {
    label: "Awaiting for documents to be signed",
    value: EOrderTrackingStatus.AWAITING_FOR_DOCUMENTS_TO_BE_SIGNED,
  },
  {
    label: "Documents sent for signature to be signed",
    value: EOrderTrackingStatus.DOCUMENTS_SENT_FOR_SIGNATURE_TO_BE_SIGNED,
  },
  {
    label: "Documents signed",
    value: EOrderTrackingStatus.DOCUMENTS_SIGNED,
  },
  {
    label: "Full payment pending",
    value: EOrderTrackingStatus.FULL_PAYMENT_PENDING,
  },
  {
    label: "Fully paid",
    value: EOrderTrackingStatus.FULLY_PAID,
  },
  {
    label: "Property tokens transfer pending",
    value: EOrderTrackingStatus.PROPERTY_TOKENS_TRANSFER_PENDING,
  },
  {
    label: "Property tokens transferred and order successfully completed",
    value:
      EOrderTrackingStatus.PROPERTY_TOKENS_TRANSFERRED_AND_ORDER_SUCCESSFULLY_COMPLETED,
  },
  {
    label: "Order cancelled",
    value: EOrderTrackingStatus.ORDER_CANCELLED,
  },
  {
    label: "Order failed",
    value: EOrderTrackingStatus.ORDER_FAILED,
  },
  {
    label: "Refunded",
    value: EOrderTrackingStatus.REFUNDED,
  },
  {
    label:'Pending',
    value:"pending"
  }
];

export enum EPaymentType {
  FULL_PAYMENT = "full-payment",
  EOI_PAYMENT = "eoi-payment",
}

export const PAYMENT_TYPE = [
  { label: "Full Payment", value: EPaymentType.FULL_PAYMENT },
  { label: "EOI Payment", value: EPaymentType.EOI_PAYMENT },
];

export enum AccountType {
  Individual = "individual",
  Institutional = "institutional",
}

export const INVESTOR_TYPE = [
  { label: "Individual", value: AccountType.Individual },
  { label: "Institutional", value: AccountType.Institutional },
];

export const EMPTY_TABLE_DATA = [
  {
    id: "asset",
    title: "No asset available",
    description: "There are no assets available at the moment.",
    icon: <Container size={44} />,
    actionButton: {
      label: "Add New Asset",
      location: "/add-asset",
    },
  },
  {
    id: "order",
    title: "No order available",
    description: "There are no orders available at the moment.",
    icon: <ListOrdered size={44} />,
  },
  {
    id: "spv",
    title: "No SPV available",
    description: "There are no SPVs available at the moment.",
    icon: <Building2 size={44} />,
    actionButton: {
      label: "Add New SPV",
      location: "/add-spv",
    },
  },

  {
    id: "investor",
    title: "No investor available",
    description: "There are no investors available at the moment.",
    icon: <Users size={44} />,
  },
  {
    id:"template",
    title: "No template available",
    description: "There are no templates available at the moment.",
    icon: <File size={44} />,
  },
  {
    id:'tenant',
    title: "No tenant available",
    description: "There are no tenants available at the moment.",
    icon: <Users size={44} />,
  },
  {
    id: "document",
    title: "No document available",
    description: "There are no documents available at the moment.",
    icon: <File size={44} />,
  },
  {
    id: "feature",
    title: "No feature available",
    description: "There are no features available at the moment.",
    icon: <Star size={44} />,
  },
  {
    id: "amenity",
    title: "No amenity available",
    description: "There are no amenities available at the moment.",
    icon: <Star size={44} />,
  },

];
