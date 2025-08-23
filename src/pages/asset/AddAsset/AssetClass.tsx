import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle2,
  Info,
  Server,
  Snowflake,
  Truck,
  Coffee,
  Zap,
  Hotel,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  comingSoon?: boolean;
  recommended?: boolean;
}

// Animation variants - Simplified to avoid TypeScript errors
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  selected: {
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

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
      description: "Metals, energy, agriculture, natural resources",
      icon: <Diamond className="h-6 w-6" />,
      isDisabled: true,
      comingSoon: true,
    },
    {
      id: "hardware",
      title: "Hardware",
      description: "Physical computing equipment and technology",
      icon: <Monitor className="h-6 w-6" />,
      isDisabled: true,
      comingSoon: true,
    },
    {
      id: "equity",
      title: "Equity",
      description: "Ownership stakes in companies and startups",
      icon: <Building2 className="h-6 w-6" />,
      isDisabled: true,
      comingSoon: true,
    },
    {
      id: "debt",
      title: "Debt",
      description: "Loans, bonds and debt instruments",
      icon: <Landmark className="h-6 w-6" />,
      isDisabled: true,
      comingSoon: true,
    },
    {
      id: "real-estate",
      title: "Real Estate",
      description: "High-IRR tokenizable properties: Data Centers, Cold Storage, Logistics, Co-Working, Renewable Parks, Flagship Retail, Hotels & Mixed-Use",
      icon: <Building className="h-6 w-6" />,
      isDisabled: false,
      recommended: true,
    },
    {
      id: "fund",
      title: "Fund",
      description: "Pooled capital for diversified investments",
      icon: <BarChart3 className="h-6 w-6" />,
      isDisabled: true,
      comingSoon: true,
    },
    {
      id: "goods",
      title: "Goods",
      description: "Products, luxury items, collectibles",
      icon: <ShoppingBag className="h-6 w-6" />,
      isDisabled: true,
      comingSoon: true,
    },
    {
      id: "ip-licences",
      title: "IP & Licences",
      description: "Intellectual property and licensing rights",
      icon: <FileText className="h-6 w-6" />,
      isDisabled: true,
      comingSoon: true,
    },
  ];

  const handleAssetSelect = (assetId: AssetClass) => {
    if (!assetOptions.find(option => option.id === assetId)?.isDisabled) {
      setSelectedAsset(assetId);
    }
  };

  const handleContinue = () => {
    // Pass the selected asset class to the add-asset page
    navigate(`/add-asset?class=${selectedAsset}`);
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/50 fixed inset-0 z-50">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Choose Asset Class</h2>
              <p className="text-gray-600 mt-1">
                Select the type of asset you want to tokenize and list
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Alert */}
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Real Estate tokenization now supports 8 high-IRR categories including Data Centers, Cold Storage, Logistics, Co-Working, Renewable Parks, Flagship Retail, Hotels & Mixed-Use developments. Other asset classes are coming soon!
            </AlertDescription>
          </Alert>

          {/* Asset Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            {assetOptions.map((option) => {
              const isSelected = selectedAsset === option.id;
              
              return (
                <motion.div
                  key={option.id}
                  variants={cardVariants}
                  whileHover={!option.isDisabled ? "hover" : undefined}
                  animate={isSelected ? "selected" : "animate"}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      option.isDisabled
                        ? "opacity-60 cursor-not-allowed bg-gray-50"
                        : "hover:shadow-lg"
                    } ${
                      isSelected
                        ? "ring-2 ring-violet-500 bg-violet-50 shadow-lg"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleAssetSelect(option.id)}
                  >
                    <CardContent className="p-6">
                      {/* Badges */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-2">
                          {option.recommended && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Recommended
                            </Badge>
                          )}
                          {option.comingSoon && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                        
                        {/* Selection Indicator */}
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected 
                            ? 'border-violet-500 bg-violet-500' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <CheckCircle2 className="w-4 h-4 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Icon */}
                      <div className={`inline-flex p-3 rounded-full mb-4 ${
                        isSelected
                          ? "bg-violet-100 text-violet-600"
                          : option.isDisabled
                          ? "bg-gray-100 text-gray-400"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {option.icon}
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {option.description}
                        </p>
                      </div>

                      {/* Selected Overlay */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-violet-500/5 pointer-events-none"
                        />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="px-6"
            >
              Cancel
            </Button>
            
            <div className="flex items-center gap-3">
              {selectedAsset && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-gray-600"
                >
                  Selected: <span className="font-medium">
                    {assetOptions.find(opt => opt.id === selectedAsset)?.title}
                  </span>
                </motion.div>
              )}
              
              <Button
                onClick={handleContinue}
                disabled={!selectedAsset || assetOptions.find(opt => opt.id === selectedAsset)?.isDisabled}
                className="bg-violet-600 hover:bg-violet-700 text-white px-6"
              >
                Continue
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
