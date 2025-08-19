import FormGenerator from "@/components/UseForm/FormGenerator";
import { Banknote, Info, Upload } from "lucide-react";
import React from "react";
import { formConfig } from "./formConfig";

const index = () => {
  return (
    <div className="p-4 bg-white  border-gray-100">
      <div className="flex items-center gap-3 rounded-lg">
        <Upload className="text-black " />
        <h1 className="text-xl font-extrabold text-gray-800">
          Legal Documents
        </h1>
      </div>
      <span className="block text-md text-gray-600 ">
        Upload legal documents for the SPV
      </span>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {FormGenerator(formConfig())}
      </div>
    </div>
  );
};

export default index;
