// import { useMemo } from "react"
// import {
//   Check,
//   Info,
//   DollarSign,
//   BarChart,
//   Link,
//   ArrowRightIcon,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { ASSET_STEPS_TABS } from "@/constants/global";
// import { maskString } from "@/helpers/global";
// import { Badge } from "@/components/ui/badge";

// interface AssetStagesProps {
//   currentStep?: string;
//   asset?: any;
//   formData?: any;
// }

// // Utility functions
// const isFilled = (val: any): boolean => {
//   if (val === null || val === undefined) return false;
//   if (typeof val === "string") return val.trim().length > 0;
//   if (typeof val === "number") return val > 0;
//   if (Array.isArray(val)) return val.length > 0;
//   if (typeof val === "object") return Object.keys(val).length > 0;
//   return true;
// };

// const isValidValue = (val: any) => val !== undefined && val !== null;

// const hasFields = (fields: string[], data: Record<string, any>) =>
//   fields.every((field) => isFilled(data[field]));

// export default function AssetStages({
//   currentStep = "asset-information",
//   asset = {},
//   formData = {},
// }: AssetStagesProps) {
//   const hasStepData = (stepId: string) => {
//     const data = { ...asset, ...formData };

//     switch (stepId) {
//       case "asset-information":
//         return hasFields(
//           [
//             "name", "class", "category", "stage", "currency", "about",
//             "landmark", "style", "instrumentType", "companyId", "blockchain",
//           ],
//           data
//         );

//       case "token-information":
//         return (
//           isFilled(data.tokenInformation?.tokenSupply) ||
//           isFilled(data.tokenInformation?.tokenPrice) ||
//           isFilled(data.tokenInformation?.tokenSymbol) ||
//           isFilled(data.totalNumberOfSfts) ||
//           isFilled(data.pricePerSft)
//         );

//       case "media-documents":
//         return (
//           isFilled(data.gallery) ||
//           isFilled(data.documents) ||
//           isFilled(data.assetDocuments)
//         );

//       case "issues-due-diligence":
//         return (
//           isFilled(data.issuer) ||
//           isFilled(data.dueDiligence) ||
//           isFilled(data.assetHostedBy)
//         );

//       case "features-amenities":
//         return (
//           isFilled(data.features) ||
//           isFilled(data.amenities) ||
//           isFilled(data.assetFeatures)
//         );

//       case "location-places":
//         return (
//           isFilled(data.location) ||
//           isFilled(data.nearByLocations) ||
//           isFilled(data.assetLocation)
//         );

//       case "additional-details":
//         return (
//           isFilled(data.riskFactors) ||
//           isFilled(data.exitOpportunities) ||
//           isFilled(data.riskDisclosure) ||
//           isFilled(data.additionalTax)
//         );

//       case "tandc-faq":
//         return (
//           isFilled(data.termsAndConditions) ||
//           isFilled(data.faqs) ||
//           isFilled(data.assetTerms) ||
//           isFilled(data.assetFaqs)
//         );

//       default:
//         return false;
//     }
//   };

//   const { stepIndex, progress, totalSteps, completedSteps } = useMemo(() => {
//     const index = ASSET_STEPS_TABS.findIndex((step) => step.id === currentStep);
//     const totalSteps = ASSET_STEPS_TABS.length;

//     const completedSteps = ASSET_STEPS_TABS.filter((step) =>
//       hasStepData(step.id)
//     ).length;

//     const progress = Math.round((completedSteps / totalSteps) * 100);

//     return {
//       stepIndex: index >= 0 ? index : 0,
//       progress,
//       totalSteps,
//       completedSteps,
//     };
//   }, [currentStep, asset, formData]);

//   const assetData = useMemo(() => {
//     const data = { ...asset, ...formData };
//       console.log(data?.rentalYield, 'asasa')

//     return {
//       assetId: data._id || data.id || "******",
//       pricePerToken:
//         data.tokenInformation?.tokenPrice || data.pricePerSft || "******",
//       totalSupply:
//         data.tokenInformation?.tokenSupply ||
//         data.totalNumberOfSfts ||
//         "******",
//       investmentValue:
//         data.totalPropertyValueAfterFees || data.totalInvestment || "******",
//       expectedIncome:
//         data.rentalInformation?.rentPerSft || data.monthlyRent || "******",
//       expectedROI: data.rentalYield || data.roi || "******",
//       offeringChain: data.blockchain || data.offeringChain || "******",
//       assetName: data.name || "Property",
//       assetType: data.class || "real-estate",
//       category: data.category || "commercial",
//       stage: data.stage || "fully-rented",
//     };
//   }, [asset, formData]);

//   return (
//     <div className="flex h-[90px]">
//       <div className="flex-1 flex">
//         <div className="w-72 mx-auto p-6">
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-2">
//               <Badge className="text-[10px] rounded-full">
//                 STEP {completedSteps} OF {totalSteps}
//               </Badge>
//               <div className="text-end text-xs font-medium">
//                 {progress}% Complete
//               </div>
//             </div>
//             <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className="h-full bg-black rounded-full transition-all duration-300"
//                 style={{ width: `${progress}%` }}
//               />
//             </div>
//           </div>

//           <div className="flex justify-between items-center mb-2">
//             <div className="flex flex-col items-center">
//               <div className="w-24 h-24 rounded-md flex items-center justify-center">
//                 <img
//                   src={"/svg/assets/token.svg"}
//                   alt="tokens"
//                   className="w-16 h-16 object-contain"
//                 />
//               </div>
//               <span className="text-sm text-gray-600">
//                 {assetData.assetName}
//               </span>
//             </div>
//             <ArrowRightIcon />
//             <div className="flex flex-col items-center">
//               <div className="w-24 h-24 rounded-md flex items-center justify-center">
//                 <img
//                   src={"/svg/assets/building.svg"}
//                   alt="property"
//                   className="w-16 h-16 object-contain"
//                 />
//               </div>
//               <span className="text-sm text-gray-600">Tokens</span>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <FormField
//               label="Asset ID"
//               value={maskString(assetData.assetId)}
//               icon={<Info className="w-4 h-4" />}
//             />
//             <FormField
//               label="Price Per Token"
//               value={
//                 typeof assetData.pricePerToken === "number"
//                   ? `₹${assetData.pricePerToken.toLocaleString()}`
//                   : assetData.pricePerToken
//               }
//               icon={<Info className="w-4 h-4" />}
//             />
//             <FormField
//               label="Total Supply"
//               value={
//                 typeof assetData.totalSupply === "number"
//                   ? assetData.totalSupply.toLocaleString()
//                   : assetData.totalSupply
//               }
//               icon={<Info className="w-4 h-4" />}
//             />
//             <FormField
//               label="Investment Value"
//               value={
//                 typeof assetData.investmentValue === "number"
//                   ? `₹${assetData.investmentValue.toLocaleString()}`
//                   : assetData.investmentValue
//               }
//               icon={<DollarSign className="w-4 h-4" />}
//             />
//             <FormField
//               label="Expected Income"
//               value={
//                 typeof assetData.expectedIncome === "number"
//                   ? `₹${assetData.expectedIncome.toLocaleString()}`
//                   : assetData.expectedIncome
//               }
//               icon={<DollarSign className="w-4 h-4" />}
//             />
//             <FormField
//               label="Expected ROI"
//               value={
//                 typeof assetData.expectedROI === "number"
//                   ? `${assetData.expectedROI}%`
//                   : assetData.expectedROI
//               }
//               icon={<BarChart className="w-4 h-4" />}
//             />
//             <FormField
//               label="Offering Chain"
//               value={assetData.offeringChain}
//               icon={<Link className="w-4 h-4" />}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StepIndicator({ number, label, active, completed }: any) {
//   return (
//     <div className="flex flex-col items-center">
//       <div
//         className={cn(
//           "w-10 h-10 rounded-full flex items-center justify-center border-2",
//           completed
//             ? "bg-black border-black text-white"
//             : active
//             ? "border-black text-black"
//             : "border-gray-300 text-gray-400"
//         )}
//       >
//         {completed ? <Check className="w-5 h-5" /> : number}
//       </div>
//       <span className="text-xs mt-1 text-center">{label}</span>
//     </div>
//   );
// }

// function FormField({ label, value, icon, className = "" }: any) {
//   return (
//     <div className={`flex items-center justify-between ${className}`}>
//       <div className="flex items-center gap-2">
//         {icon}
//         <span className="text-xs">{label}</span>
//       </div>
//       <div className="text-xs font-medium">{value}</div>
//     </div>
//   );
// }
