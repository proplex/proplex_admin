import { formatCompactNumber } from "@/helpers/global";
import { Info, TrendingUp } from "lucide-react";

export function TokenInformation({
  assetOverview,
}: {
  assetOverview: {
    tokenInformation: {
      tokenSymbol: string;
      tokenSupply: number;
      minimumTokensToBuy: number;
      maximumTokensToBuy: number;
      tokenPrice: number;
    };
    totalPropertyValueAfterFees: number;
  };
}) {
  const { tokenSupply, minimumTokensToBuy, maximumTokensToBuy, tokenPrice } =
    assetOverview?.tokenInformation || {};
  const { totalPropertyValueAfterFees } = assetOverview || {};
  
  const tokenMetrics = [
    {
      icon: <Info className="h-4 w-4 text-blue-500" />,
      title: "Total Token Supply",
      value: tokenSupply,
      subtitle: "Total number of tokens",
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      title: "Minimum Tokens to Buy",
      value: minimumTokensToBuy,
      subtitle: "Minimum order size",
    },
    {
      icon: <Info className="h-4 w-4 text-purple-500" />,
      title: "Token Price",
      value: tokenPrice ? `$${tokenPrice.toFixed(2)}` : "N/A",
      subtitle: "Price per token in USD",
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-yellow-500" />,
      title: "Total Asset Gross Value",
      value: formatCompactNumber(
        totalPropertyValueAfterFees || 0
      ),
      subtitle: "",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-4">
        <Info className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-medium ml-2">Token Information</h3>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Key token metrics and details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tokenMetrics.map((metric, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center text-gray-500 mb-1">
              {metric.icon}
              <span className="text-sm ml-2">{metric.title}</span>
            </div>
            <div className="text-xl font-bold">{metric.value}</div>
            <div className="text-sm text-gray-500">{metric.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
