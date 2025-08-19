import Disturbution from "@/components/spv/Disturbution";
import PropertyData from "@/components/spv/propertyData";
import PropertyValue from "@/components/spv/propertyValue";
import SpvOverviewTabs from "@/components/spv/SpvTabs";
import SpvProperty from "@/components/spv/SpvProperty";
import TerasusryValue from "@/components/spv/TerasusryValue";
import { Button } from "@/components/ui/button";
import { DollarSign, Ellipsis } from "lucide-react";
import SpvTabs from "@/components/spv/SpvTabs";
import TeasureAllocation from "@/components/spv/TeasureAllocation";
import SpvteasureTabs from "@/components/spv/SpvteasureTabs";
import IncomeDistribution from "@/components/spv/IncomeDistribution";
import InvestorsandActivity from "@/components/spv/InvestorsandActivity";

type spvDashboardRoute = {
  title?: string;
  createdDate?: string;
};
const Index = ({ title, createdDate }: spvDashboardRoute) => {
  return (
    <div>
      <div className="m-4 flex justify-between ">
        <div>
          <h1 className="text-2xl font-bold">
            {title || "Horizon Property SPV"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Equity SPV • Created on {createdDate || "2023-10-15"}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            className="bg-white text-black hover:bg-black hover:text-white flex items-center gap-2"
          >
            <Ellipsis size={16} />
            <span>Actions</span>
          </Button>

          <Button
            variant="default"
            className="bg-violet-600 hover:bg-violet-800 flex items-center gap-2"
          >
            <DollarSign size={16} />
            <span>Add Funds</span>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        <PropertyData
          title="Property Data"
          currentFunding={5000}
          fundingTarget={10000}
        />
        <TerasusryValue
          value={100000}
          title="Terasusry Value"
          blockChain={[
            { id: "1", name: "ETH" },
            { id: "2", name: "USDF" },
          ]}
        />
        <PropertyValue title="Property Value" value={100000} />
        <Disturbution
          title="Disturbution Rate"
          value={70}
          date="June 30, 2023"
        />
      </div>
      <div className="m-4 flex flex-col gap-2 shadow-md rounded-xl">
        <SpvProperty
          name="Skyline Towers"
          address="123 Main Street, New York, NY 10001"
          onViewDetails={() => console.log("Navigating to details...")}
        />

        <div className="p-4 ">
          <SpvTabs />
        </div>
      </div>
      <div className="m-4 flex flex-col gap-2 shadow-md rounded-b-xl">
        <TeasureAllocation update="Today" />
        <div className="p-4">
          <SpvteasureTabs />
        </div>
      </div>
      <div className="m-4 flex items-center  justify-between gap-5 w-full">
        <IncomeDistribution />
        <InvestorsandActivity />
      </div>
    </div>
  );
};

export default Index;