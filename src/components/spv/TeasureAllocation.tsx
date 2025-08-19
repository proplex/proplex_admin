  import { Building2, ChartPie, ChevronRight, Ellipsis } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

type PropertyCardProps = {
  update?: string;
};

const TeasureAllocation = ({ update}: PropertyCardProps) => {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-[#EEF2FF] to-[#F9FAFB] p-4 rounded-t-xl border-b">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-yellow-100 text-yellow-500 rounded-full">
          <ChartPie size={20} />
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">Teasure Allocation</h2>
          <p className="text-sm text-gray-500">Updated {update}</p>
        </div>
      </div>
     <div className="flex items-center gap-4">
         <span className="text-sm bg-green-100 text-green-500 flex items-center gap-1 px-2 py-1 rounded-xl ">
            +5.2% MTD
      </span>
      <Button variant="default" className="bg-transperent hover:bg-white text-black border-none shadow-none flex items-center gap-2 cursor-pointer">
        <Ellipsis size={16} />
      </Button>
     </div>
    </div>
  );
};

export default TeasureAllocation;
