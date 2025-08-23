import { motion } from 'framer-motion';
import FormGenerator from "@/components/UseForm/FormGenerator";
import { feeFormConfig, formConfig } from "./formConfig";
import { useFormContext } from "react-hook-form";
import InfoTag from "@/components/cards/asset/InfoTag";
import Registration from "./Registration";
import Legal from "./Legal";
import Platform from "./Platform";
import Brokerage from './Brokerage';
import { Calculator, DollarSign, TrendingUp, Receipt } from 'lucide-react';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const feeCardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const index = () => {
  const { watch } = useFormContext();
  const currnecy = watch("currency");
  const numberOfSfts = watch("totalNumberOfSfts");
  const perSQFT = watch("pricePerSft");
  const registrationFees = watch("fees.registration");
  const legalFees = watch("fees.legal");
  const platformFees = watch("fees.platform");
  const brokerageFees = watch("fees.brokerage");
  const basePropertyValue = Number(numberOfSfts) * Number(perSQFT);

  const registrationFeesValue = registrationFees?.reduce(
    (acc: number, fee: any) => {
      if (fee.status) {
        if (fee.isPercentage) {
          return acc + (basePropertyValue * fee.value) / 100;
        }
        return acc + fee.value;
      }
      return acc;
    },
    0
  );

  const legalFeesValue = legalFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const platformFeesValue = platformFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

    const brokerageFeeValue = brokerageFees?.reduce((acc: number, fee: any) => {
    if (fee.status) {
      if (fee.isPercentage) {
        return acc + (basePropertyValue * fee.value) / 100;
      }
      return acc + fee.value;
    }
    return acc;
  }, 0);

  const totalFees = registrationFeesValue + legalFeesValue + platformFeesValue + brokerageFeeValue;
  const totalPropertyValue = basePropertyValue + totalFees;

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Enhanced Header */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 bg-blue-100 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Calculator className="w-5 h-5 text-blue-600" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Pricing Calculator</h1>
        </div>
      </motion.div>

      {/* Enhanced Form Grid */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Base Property Configuration</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {FormGenerator(feeFormConfig())}
        </div>
      </motion.div>

      {/* Enhanced Base Property Value */}
      <motion.div variants={itemVariants}>
        <InfoTag
          info="Base Property Value"
          amount={`${currnecy === "INR" ? "₹" : "$"}${basePropertyValue || 0}`}
          icon={<TrendingUp className="w-5 h-5 text-green-600" />}
        />
      </motion.div>

      {/* Enhanced Fee Sections */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <Receipt className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-semibold text-gray-900">Fee Structure</h3>
          </div>
          <p className="text-sm text-amber-700 mt-1">Configure all applicable fees and charges</p>
        </div>
        <div className="p-6 space-y-6">
          <motion.div variants={feeCardVariants}>
            <Registration />
          </motion.div>
          <motion.div variants={feeCardVariants}>
            <Legal />
          </motion.div>
          <motion.div variants={feeCardVariants}>
            <Platform />
          </motion.div>
          <motion.div variants={feeCardVariants}>
            <Brokerage />
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Final Total */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200"
      >
        <InfoTag
          info="Gross Total Property Value"
          amount={`${currnecy === "INR" ? "₹" : "$"}${totalPropertyValue}`}
          icon={<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">₹</div>}
        />
      </motion.div>
    </motion.div>
  );
};

export default index;
