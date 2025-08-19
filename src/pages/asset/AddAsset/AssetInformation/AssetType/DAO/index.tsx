import FormGenerator from "@/components/UseForm/FormGenerator";
import { useFormContext } from "react-hook-form";
import { formConfig } from "./formConfig";
import SelectCompany from "./SelectCompany";
import NoCompanySelected from "./NoCompanySelected";
import DAOConfigurationDetails from "./DAOConfigurationDetails";

const Index = ({ asset }: { asset: any }) => {
  const { watch } = useFormContext();
  const company = watch("company");
  const { daoConfiguration: daoConfig } = company || {};

  return (
    <div>
      <SelectCompany />
      {FormGenerator(formConfig({asset}))}
      {!company ? (
        <NoCompanySelected />
      ) : (
        <DAOConfigurationDetails daoConfig={daoConfig} />
      )}
    </div>
  );
};

export default Index;
