import { Building } from "lucide-react";

const SelectCompany = () => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <Building className="h-6 w-6 text-gray-800" />
      <h2 className="text-xl font-semibold text-gray-900">
        Select Company (SPV)
      </h2>
    </div>
  );
};

export default SelectCompany;
