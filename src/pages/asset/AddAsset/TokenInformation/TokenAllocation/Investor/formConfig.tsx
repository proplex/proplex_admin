import { FormFieldConfig } from "@/components/UseForm/ControllerMap";
import {
  INVESTOR_ACREDITATION,
  KYC_OR_AML_REQUIREMENTS,
} from "@/config/constants";
import { useFormContext } from "react-hook-form";

const formConfig = (): FormFieldConfig[] => {
  const { control, watch } = useFormContext();
  const totalPropertyValueAfterFees = watch("totalPropertyValueAfterFees");
  const totalNumberOfSfts = watch("totalNumberOfSfts");
  const vacancyRate = watch("rentalInformation.vacancyRate");
  const rentPerSft = watch("rentalInformation.rentPerSft");
  const fields = watch("expenses") || [];

  let rentNumberOfSfts =
    totalNumberOfSfts - (vacancyRate / 100) * totalNumberOfSfts || 0;

  rentNumberOfSfts = parseFloat(rentNumberOfSfts.toFixed(2));

  let grossRent = rentPerSft * rentNumberOfSfts || 0;
  grossRent = parseFloat(grossRent.toFixed(2));

  const expenses = fields
    .filter((item: any) => {
      if (item.status) {
        return item;
      }
    })
    .map((item: any) => {
      const value = item.isPercentage
        ? (item.value / 100) * grossRent
        : item.value;
      return {
        ...item,
        value: value,
      };
    })
    .reduce((acc: number, item: any) => {
      return acc + item.value;
    }, 0);

  let netRent = grossRent - expenses || 0;
  const netAnnualRent = netRent * 12 || 0;

  console.log(
    "totalPropertyValueAfterFees",
    totalPropertyValueAfterFees,
    "netAnnualRent",
    netAnnualRent
  );

  const rentalYield = parseFloat(
    totalPropertyValueAfterFees && netAnnualRent
      ? ((netAnnualRent / totalPropertyValueAfterFees) * 100).toFixed(2)
      : "0"
  );

  return [
    {
      name: "investorRequirementsAndTimeline.investorAcreditation",
      label: "Investor Accredited",
      type: "select",
      control: control,
      options: INVESTOR_ACREDITATION,
    },
    {
      name: "investorRequirementsAndTimeline.kycOrAmlRequirements",
      label: "KYC/AML Requirements",
      type: "select",
      control: control,
      options: KYC_OR_AML_REQUIREMENTS,
    },
    {
      name: "investorRequirementsAndTimeline.lockupPeriod",
      label: "Lockup Period",
      type: "inputGroup",
      inputType: "number",
      control: control,
      position: "left",
      selectName: "investorRequirementsAndTimeline.lockupPeriodType",
      options: [
        { value: "months", label: "Months"  },
        { value: "years", label: "Years" },
      ],
    },
    {
      name: "investorRequirementsAndTimeline.distributionStartDate",
      label: "Listing Start Date",
      type: "date",
      control: control,
    },
    {
      name: "investorRequirementsAndTimeline.distributionEndDate",
      label: "Listing End Date",
      type: "date",
      control: control,
    },
  ];
};

export default formConfig;
