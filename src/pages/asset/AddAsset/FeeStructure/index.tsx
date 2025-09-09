import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FeeStructureComponent } from '@/components/FeeStructure';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Info, 
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

// Feature Card Component
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 shadow-sm bg-white">
    <div className={`p-2 rounded-lg ${Icon === TrendingUp ? 'bg-green-100' : 
                              Icon === Shield ? 'bg-blue-100' :
                              Icon === Calculator ? 'bg-purple-100' :
                              'bg-orange-100'}`}>
      <Icon className={`w-4 h-4 ${Icon === TrendingUp ? 'text-green-600' : 
                              Icon === Shield ? 'text-blue-600' :
                              Icon === Calculator ? 'text-purple-600' :
                              'text-orange-600'}`} />
    </div>
    <div>
      <div className="font-medium text-sm">{title}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  </div>
);

const FeeStructure: React.FC = () => {
  const { watch, setValue } = useFormContext();
  const category = watch('category');
  const [propertyValue, setPropertyValue] = useState("");

  const handlePropertyValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPropertyValue(value);
    setValue('basePropertyValue', value ? Number(value) : 0);
  };


  return (
    <div className="flex flex-col w-full space-y-6 ">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 m-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calculator className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Tokenisation Fee Structure</h1>
            <p className="text-sm text-gray-600">$ Understand the total cost of digitalising your real-estate asset.</p>
          </div>
        </div>
      </div>


      {/* Fee Structure */}
      <div className="bg-white rounded-xl p-6 m-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <DollarSign className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Fee Structure</h2>
          <Badge className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-200">Asset Category Fees</Badge>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-gray-500" />
            <h3 className="text-base font-medium text-gray-800">Base Property Value</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-700 w-32">Property Value (USD)</div>
            <Input 
              type="text"
              value={propertyValue}
              onChange={handlePropertyValueChange}
              placeholder="Enter property value"
              className="w-full max-w-md"
            />
          </div>
        </div>
        
        {/* Fee Structure Component */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-blue-100 flex items-center justify-center rounded-full">
              <span className="text-blue-600 text-sm font-semibold">$</span>
            </div>
            <h3 className="text-base font-medium text-gray-800">Fee Structure</h3>
            <Badge className="ml-1 bg-blue-50 text-blue-700">Asset Category Fees</Badge>
          </div>
          
          {category && (
            <FeeStructureComponent
              showComparison={false}
              allowCustomization={false}
              compactMode={true}
            />
          )}
        </div>
      </div>

     
    </div>
  );
};

export default FeeStructure;