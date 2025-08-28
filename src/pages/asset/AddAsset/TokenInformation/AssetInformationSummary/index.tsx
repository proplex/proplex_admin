import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, FileText } from 'lucide-react';
import Loading from '@/components/ui/Loading';
import FormGenerator from '@/components/UseForm/FormGenerator';
import useLocations from '@/hooks/useLocations';
import { assetInfoConfig } from '../../AssetInformation/AssetType/assetInfoConfig';
import { useFormContext } from 'react-hook-form';

const AssetInformationSummary = ({ asset }: { asset?: any }) => {
  const { watch } = useFormContext();
  const locationHooks = useLocations();

  // Generate form config
  const assetFormConfig = React.useMemo(() => {
    return assetInfoConfig({ asset, locationHooks });
  }, [asset, locationHooks.countries, locationHooks.states, locationHooks.cities]);

  // Investment Details Form Config (simplified version)
  const investmentFormConfig = React.useMemo(() => {
    const { control } = useFormContext();
    return [
      {
        name: "totalNumberOfSfts",
        label: "Total Number of SFTs",
        type: "number",
        inputType: "number",
        control: control,
        rules: {
          required: "Total Number of SFTs is required",
          min: { value: 1, message: "Must be at least 1" }
        }
      },
      {
        name: "pricePerSft",
        label: "Price Per SFT",
        type: "number",
        inputType: "number",
        control: control,
        rules: {
          required: "Price Per SFT is required",
          min: { value: 0.01, message: "Must be greater than 0" }
        }
      },
      {
        name: "expectedAnnualReturn",
        label: "Expected Annual Return (%)",
        type: "number",
        inputType: "number",
        control: control,
        rules: {
          required: "Expected Annual Return is required",
          min: { value: 0, message: "Must be 0 or greater" },
          max: { value: 100, message: "Must be 100 or less" }
        }
      },
      {
        name: "investmentHorizon",
        label: "Investment Horizon (Years)",
        type: "number",
        inputType: "number",
        control: control,
        rules: {
          required: "Investment Horizon is required",
          min: { value: 1, message: "Must be at least 1 year" }
        }
      }
    ];
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Asset Type Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Building2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Asset Information</h3>
            <p className="text-sm text-gray-600">Basic property details and location</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense fallback={<Loading />}>
            {FormGenerator(assetFormConfig)}
          </Suspense>
        </div>
      </motion.div>

      {/* Investment Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Investment Details</h3>
            <p className="text-sm text-gray-600">Tokenization and return expectations</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FormGenerator(investmentFormConfig)}
        </div>
      </motion.div>

      {/* Asset Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Asset Summary</h3>
            <p className="text-sm text-gray-600">Key metrics and overview</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Summary Cards */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {watch('totalNumberOfSfts') || '0'}
            </div>
            <div className="text-sm text-gray-600">Total SFTs</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              ${watch('pricePerSft') || '0'}
            </div>
            <div className="text-sm text-gray-600">Price per SFT</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {watch('expectedAnnualReturn') || '0'}%
            </div>
            <div className="text-sm text-gray-600">Expected Return</div>
          </div>
        </div>
      </motion.div>

      {/* Information Note */}
     
    </div>
  );
};

export default AssetInformationSummary;