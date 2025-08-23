import { useState } from "react";
import PieChartConfig from "@/config/PieChartConfig";
import FormGenerator from "@/components/UseForm/FormGenerator";
import formConfig from "./formConfig";
import TokenAllocation from "./tokenAllocation";
import Investor from "./Investor";
import CustomTabs from "@/components/ui/custom-tab";
import TokenSymbolReservation from "../TokenSymbolReservation"
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
    <div className="min-h-[600px] bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <div className="p-3 md:p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Token Information
              </h1>
              <p className="text-gray-600 flex items-center gap-2 text-sm md:text-base">
                Configure token allocation and blockchain integration for your asset
              </p>
            </div>
          </div>
        </div>

        {/* Content without extra card wrapper */}
        {tokenSymbol ? (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FormGenerator(formConfig())}
              </div>
            </div>
            <div className="w-full">
              <Investor />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <TokenSymbolReservation />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
