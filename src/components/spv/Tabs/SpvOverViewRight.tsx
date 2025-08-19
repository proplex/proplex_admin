import { Button } from "@/components/ui/button";
import {ArrowUp,CircleAlert,DollarSignIcon,Filter,} from "lucide-react";
const financialOverviewData = [
  {
    title: "Monthly Revenue",
    value: "$125,000",
    change: "+5.2%",
  },
  {
    title: "Monthly Expenses",
    value: "$45,000",
    change: "-2.1%",
  },
  {
    title: "Net Operating Income",
    value: "$80,000",
    change: "+8.4%",
  },
  {
    title: "Occupancy Rate",
    value: "92%",
    change: "+2%",
  },
  {
    title: "Cap Rate",
    value: "8.4%",
    change: "+0.5%",
  },
  {
    title: "Annual Return",
    value: "12.5%",
    change: "+1.2%",
  },
];

const linkedAssetsData = [
  {
    title: "Total Assets",
    value: "5",
  },
  {
    title: "Total Value",
    value: "$23.25M",
  },
  {
    title: "Avg ROI",
    value: "6.6%",
  },
];

type SpvOverViewRightProps = {
  title: string;
  currentFunding?: number;
  fundingTarget?: number;
};

const SpvOverViewRight = ({title,currentFunding = 0,fundingTarget = 0,}: SpvOverViewRightProps) => {
  const progressPercentage = fundingTarget > 0 ? (currentFunding / fundingTarget) * 100 : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Key Performance Indicators</h1>
        <Button variant="default" className="bg-white text-black hover:bg-gray-100">
          <Filter />
          Filter
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {financialOverviewData.map((data, idx) => (
          <div key={idx} className="w-full bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center text-gray-500">
              <h1 className="text-sm font-semibold">{data.title}</h1>
              <Button className="w-2 shadow-none bg-transparent text-black hover:bg-gray-100 cursor-pointer">
                <CircleAlert size={10} />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">{data.value}</h1>
              <span className="font-semibold flex items-center text-green-500">
                <ArrowUp size={16} />
                {data.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="font-semibold text-xl">Linked Assets Summary</h1>
        <div className="flex justify-between">
          {linkedAssetsData.map((item, idx) => (
            <div key={idx} className="flex flex-col justify-center items-center bg-gray-50 rounded-lg p-4 gap-2">
              <span className="text-2xl font-bold">{item.value}</span>
              <span className="text-sm text-gray-500">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <h1 className="font-semibold text-xl">Financial Highlights</h1>
        <div className="border bg-gradient-to-r from-[#F9FAFB] to-[#EEF2FF] rounded-xl flex flex-col gap-4 p-4">
          <div className="flex gap-3 items-center">
            <div className="p-2 bg-gray-100 rounded-full">
              <DollarSignIcon className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{title}</p>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">${currentFunding}</h1>
                <p className="text-sm text-green-500 flex items-center font-semibold">
                  <ArrowUp size={14} />
                  +5.2% YoY
                </p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-xs">
                Target: {fundingTarget}
              </span>
              <span className="text-purple-600 text-xs">
                {progressPercentage.toFixed(2)}%
              </span>
            </div>
            <div className="w-full h-[6px] bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpvOverViewRight;
