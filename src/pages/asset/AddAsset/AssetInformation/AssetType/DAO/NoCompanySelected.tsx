import { Building } from "lucide-react";

const NoCompanySelected = () => {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-10 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-200 rounded-full p-5 mb-4">
        <Building className="h-8 w-8 text-gray-600" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        Select a Company to Continue
      </h3>
      <p className="text-gray-500 max-w-md">
        Choose a company from the dropdown above to view its DAO configuration details.
      </p>
    </div>
  );
};

export default NoCompanySelected;
