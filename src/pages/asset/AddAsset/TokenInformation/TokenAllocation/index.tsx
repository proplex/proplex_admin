import { useState } from "react";
import PieChartConfig from "@/config/PieChartConfig";
import FormGenerator from "@/components/UseForm/FormGenerator";
import formConfig from "./formConfig";
import TokenAllocation from "./tokenAllocation";
import Investor from "./Investor";
import CustomTabs from "@/components/ui/custom-tab";
import TokenSymbolRegistration from "../PropertyDIDReservation"
import { useFormContext } from "react-hook-form";

interface Category {
  category: string;
  tokens: number;
  vestingType: string;
  vestingStartDate: string;
  vestingEndDate: string;
  cliffPeriod: number;
  description: string;
}

const Index = () => {
  const { watch } = useFormContext();
  const categories = watch("allocationStats.categories") || [];
  const tokenSymbol = watch("tokenInformation.tokenSymbol") || "";
  const tabs = [
    {
      id: "1",
      title: "Token Allocation",
      component: <TokenAllocation />,
    },
    // { id: '2', title: 'Investor Requirements', component: <Investor /> },
  ];

  const labels = categories.map(
    (category: Category) => category.category
  ) as string[];
  const values = categories.map(
    (category: Category) => category.tokens
  ) as number[];

  return (
    <div className="">
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Token Information
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-between w-full bg-white">
        {tokenSymbol ? (
          <div className="flex-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FormGenerator(formConfig())}
            </div>
            <div>
             <Investor />
            </div>
          </div>
        ) : (
          <TokenSymbolRegistration />
        )}
        {/* 
        <div className='flex-1 space-y-4'>
          <h2 className='text-xl font-bold text-gray-900 border-b pb-2'>
            Distribution Structure
          </h2>
          <div className='bg-gray-50 rounded-lg p-4'>
            {categories.length > 0 ? (
              <PieChartConfig
                labels={labels}
                values={values}
                className='max-w-[400px] mx-auto'
              />
            ) : (
              <div className='flex items-center justify-center h-full'>
                <p className='text-gray-500'>No data available</p>
              </div>
            )}
          </div>
        </div> */}
      </div>
      {/* <div className=''>
        <CustomTabs
          defaultTab='1'
          tabs={tabs}
          aria-label='Asset information tabs'
        />
      </div> */}
    </div>
  );
};

export default Index;
