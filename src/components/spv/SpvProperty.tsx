  import { Building2, ChevronRight } from "lucide-react";
import React from "react";

type PropertyCardProps = {
  name?: string;
  address?: string;
  onViewDetails?: () => void; // Optional click handler
};

const SpvProperty = ({ name, address, onViewDetails }: PropertyCardProps) => {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-[#F9FAFB] to-[#EEF2FF] p-4 rounded-t-xl border-b">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-[#ede9fe] text-[#7c3aed] rounded-full">
          <Building2 size={20} />
        </div>
        <div>
          <h2 className="font-semibold text-lg text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{address}</p>
        </div>
      </div>

      <button
        onClick={onViewDetails}
        className="text-sm text-[#7c3aed] flex items-center gap-1 hover:underline"
      >
        View Details <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default SpvProperty;
