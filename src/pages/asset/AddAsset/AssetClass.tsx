import type React from "react";
import { useState } from "react";
import {
  X,
  ChevronRight,
  Diamond,
  Monitor,
  Building2,
  Landmark,
  Building,
  BarChart3,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type AssetClass =
  | "commodity"
  | "hardware"
  | "equity"
  | "debt"
  | "real-estate"
  | "fund"
  | "goods"
  | "ip-licences";

interface AssetOption {
  id: AssetClass;
  title: string;
  description: string;
  icon: React.ReactNode;
  isDisabled: boolean;
}

export default function AssetClass({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [selectedAsset, setSelectedAsset] = useState<AssetClass>("real-estate");
  const navigate = useNavigate();

  const assetOptions: AssetOption[] = [
    {
      id: "commodity",
      title: "Commodity",
      description: "Metals, energy, agriculture",
      icon: <Diamond className="h-5 w-5" />,
      isDisabled: true,
    },
    {
      id: "hardware",
      title: "Hardware",
      description: "Physical computing",
      icon: <Monitor className="h-5 w-5" />,
      isDisabled: true,
    },
    {
      id: "equity",
      title: "Equity",
      description: "Ownership in a company",
      icon: <Building2 className="h-5 w-5" />,
      isDisabled: true,
    },
    {
      id: "debt",
      title: "Debt",
      description: "Loans or bonds representing obligations",
      icon: <Landmark className="h-5 w-5" />,
      isDisabled: true,
    },
    {
      id: "real-estate",
      title: "Real Estate",
      description: "Stake in land, property",
      icon: <Building className="h-5 w-5" />,
      isDisabled: false,
    },
    {
      id: "fund",
      title: "Fund",
      description: "Pooled capital for diversified investments",
      icon: <BarChart3 className="h-5 w-5" />,
      isDisabled: true,
    },
    {
      id: "goods",
      title: "Goods",
      description: "Products, luxury items, fashion",
      icon: <ShoppingBag className="h-5 w-5" />,
      isDisabled: true,
    },
    {
      id: "ip-licences",
      title: "IP and licences",
      description: "Rights to intellectual property",
      icon: <FileText className="h-5 w-5" />,
      isDisabled: true,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assetOptions.map((option) => (
            <Button
              key={option.id}
              variant="outline"
              disabled={option.isDisabled}
              className={`p-4 h-full cursor-pointer flex items-start gap-3 transition-all  ${
                selectedAsset === option.id
                  ? "ring-1 ring-violet-500 bg-violet-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setSelectedAsset(option.id)}
            >
              <div
                className={`${
                  selectedAsset === option.id
                    ? "text-violet-500 bg-violet-100 "
                    : "text-gray-500 bg-gray-100 "
                } mt-1 p-2 rounded-full`}
              >
                {option.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <div className="flex items-center justify-center h-5 w-5 rounded-full border border-gray-300 ml-2">
                {selectedAsset === option.id && (
                  <div className="h-3 w-3 rounded-full bg-violet-500" />
                )}
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            className="bg-violet-500 hover:bg-violet-600 text-white"
            onClick={() => navigate(`/add-asset`)}
          >
            Next Step
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
