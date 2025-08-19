import FormGenerator from "@/components/UseForm/FormGenerator";
import { feeFormConfig, formConfig } from "./formConfig";
import { useFormContext } from "react-hook-form";
import InfoTag from "@/components/cards/asset/InfoTag";
import Registration from "./Registration";
import Legal from "./Legal";
import Platform from "./Platform";
import Brokerage from './Brokerage'

const index = () => {
  const { watch } = useFormContext();
  const currnecy = watch("currency");
  const numberOfSfts = watch("totalNumberOfSfts");
  const perSQFT = watch("pricePerSft");
  const registrationFees = watch("fees.registration");
  const legalFees = watch("fees.legal");
  const platformFees = watch("fees.platform");
  const brokerageFees = watch("fees.brokerage");
  const basePropertyValue = Number(numberOfSfts) * Number(perSQFT);

  const registrationFeesValue = registrationFees?.reduce(
    (acc: number, fee: any) => {
      if (fee.status) {
        if (fee.isPercentage) {
          return acc + (basePropertyValue * fee.value) / 100;
        }
        return acc + fee.value;
      }
      return acc;
    },
    0
  );

  const legalFeesValue = legalFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const platformFeesValue = platformFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

    const brokerageFeeValue = brokerageFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const totalFees = registrationFeesValue + legalFeesValue + platformFeesValue + brokerageFeeValue;
  const totalPropertyValue = basePropertyValue + totalFees;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Asset Price</h1>
        {/* <Button type='button' variant='outline'>
          <RefreshCw /> Sync Fee
        </Button> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {FormGenerator(feeFormConfig())}
      </div>
      <InfoTag
        info="Base Property Value"
        amount={`${currnecy === "INR" ? "₹" : "$"}${basePropertyValue || 0}`}
        icon={<div />}
      />
      <div className="my-4">
        <Registration />
        <Legal />
        <Platform />
        <Brokerage />
      </div>
      <InfoTag
        info="Gross Total Property Value"
        amount={`${currnecy === "INR" ? "₹" : "$"}${totalPropertyValue}`}
        icon={<div />}
      />
    </div>
  );
};

export default index;
