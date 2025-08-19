import { formatCompactNumber } from "@/helpers/global";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  Building,
  PercentCircle,
} from "lucide-react";
import React from "react";

interface InvestmentStats {
  totalRaised: number;
  numberOfInvestors: number;
}

interface AssetOverview {
  investmentStats: InvestmentStats;
  totalPropertyValueAfterFees: number;
  annualRentalYield: number;
  currency?: string; // Added the missing property
}

interface Metric {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: string | number;
  target?: string;
  trend?: "up" | "down";
  trendColor?: string;
  trendValue?: string;
  progressPercentage?: number;
  progressColor?: string;
  percentage?: string; // Added the missing property
  currency?: string; // Added the missing property
}

export function OverviewMetrics({
  assetOverview,
}: {
  assetOverview: AssetOverview;
}) {
  const {
    investmentStats = { totalRaised: 0, numberOfInvestors: 0 },
    totalPropertyValueAfterFees = 0,
    annualRentalYield = 0,
  } = assetOverview || {};

  const { totalRaised, numberOfInvestors } = investmentStats;

  const raiseProgress = totalPropertyValueAfterFees
    ? (totalRaised / totalPropertyValueAfterFees) * 100
    : 0;
  const currency = assetOverview?.currency ?? "USD";

  const metrics: Metric[] = [
    {
      icon: (
        <div className="w-4 h-4 flex items-center justify-center text-xl text-amber-600">
          {currency === "USD" ? "$" : "₹"}
        </div>
      ),
      title: "Total Raised",
      subtitle: "Progress towards target",
      value: `$${formatCompactNumber(totalRaised)}`,
      target: `of $${formatCompactNumber(totalPropertyValueAfterFees)} target`,
      percentage: `${raiseProgress.toFixed(2)}%`,
      trend: "up",
      progressColor: "bg-green-500",
      progressPercentage: raiseProgress,
    },
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      title: "Number of Investors",
      subtitle: "Total active investors",
      value: numberOfInvestors,
      trend: "up",
    },
    {
      icon: <Building className="h-5 w-5 text-purple-500" />,
      title: "Property Value",
      subtitle: "Current market valuation",
      value: `$${formatCompactNumber(totalPropertyValueAfterFees)}`,
      trend: "up",
      trendColor: "text-green-500",
    },
    {
      icon: <PercentCircle className="h-5 w-5 text-green-500" />,
      title: "Annual Rental Yield",
      subtitle: "Return on investment",
      value: `${formatCompactNumber(annualRentalYield)}%`,
      trend: "up",
      trendColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
        >
          <div className="flex items-center mb-2">
            {metric.icon}
            <span className="ml-2 text-sm font-medium text-gray-600">
              {metric.title}
            </span>
          </div>
          <div className="text-sm text-gray-500">{metric.subtitle}</div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-gray-800">
              {metric.value}
            </span>
            {metric.trend === "up" && (
              <ArrowUpRight className="h-5 w-5 text-green-500" />
            )}
            {metric.trend === "down" && (
              <ArrowDownRight className="h-5 w-5 text-red-500" />
            )}
          </div>
          {metric.target && (
            <div className="text-sm text-gray-400 mt-1">{metric.target}</div>
          )}
          {metric.trendValue && (
            <div className={`text-sm ${metric.trendColor ?? ""} mt-1`}>
              {metric.trendValue}
            </div>
          )}
          {typeof metric.progressPercentage === "number" && (
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className={`${
                  metric.progressColor ?? "bg-green-500"
                } h-2 rounded-full`}
                style={{ width: `${metric.progressPercentage}%` }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
