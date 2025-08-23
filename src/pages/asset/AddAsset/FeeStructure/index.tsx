import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { FeeStructureComponent } from '@/components/FeeStructure';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

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

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const FeeStructure: React.FC = () => {
  const { watch } = useFormContext();
  const category = watch('category');
  const basePropertyValue = watch('basePropertyValue');
  
  return (
    <motion.div
      className=\"flex flex-col w-full space-y-6\"
      variants={containerVariants}
      initial=\"initial\"
      animate=\"animate\"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        className=\"bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-6 border border-blue-100 shadow-sm overflow-hidden relative\"
      >
        {/* Background Pattern */}
        <div className=\"absolute inset-0 opacity-5\">
          <div className=\"absolute top-4 right-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl\" />
          <div className=\"absolute bottom-4 left-4 w-24 h-24 bg-purple-500 rounded-full blur-2xl\" />
        </div>
        
        <div className=\"relative\">
          <div className=\"flex items-center gap-4\">
            <motion.div
              className=\"p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg relative overflow-hidden\"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className=\"absolute inset-0 bg-gradient-to-r from-white/20 to-transparent\"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: \"linear\" }}
              />
              <Calculator className=\"w-6 h-6 text-white relative z-10\" />
            </motion.div>
            <div>
              <h1 className=\"text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent\">
                Fee Structure & Costs
              </h1>
              <p className=\"text-gray-600 text-sm font-medium mt-1 flex items-center gap-2\">
                <DollarSign className=\"w-4 h-4\" />
                Calculate tokenization costs and fees for your asset category
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Key Benefits Overview */}
      <motion.div
        className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4\"
        variants={contentVariants}
      >
        {[
          { 
            icon: TrendingUp, 
            title: \"Transparent Pricing\", 
            desc: \"Category-specific fee structures\",
            color: \"text-green-600\",
            bg: \"bg-green-100\"
          },
          { 
            icon: Shield, 
            title: \"Regulatory Compliant\", 
            desc: \"All legal and compliance costs included\",
            color: \"text-blue-600\",
            bg: \"bg-blue-100\"
          },
          { 
            icon: Calculator, 
            title: \"Real-time Calculation\", 
            desc: \"Instant fee updates based on property value\",
            color: \"text-purple-600\",
            bg: \"bg-purple-100\"
          },
          { 
            icon: CheckCircle2, 
            title: \"All-inclusive\", 
            desc: \"No hidden fees or surprise costs\",
            color: \"text-orange-600\",
            bg: \"bg-orange-100\"
          },
        ].map((benefit, index) => (
          <motion.div
            key={benefit.title}
            className=\"bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300\"
            whileHover={{ scale: 1.02, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <div className=\"flex items-center gap-3\">
              <div className={`p-2 rounded-lg ${benefit.bg}`}>
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <div>
                <h3 className=\"font-semibold text-gray-900 text-sm\">{benefit.title}</h3>
                <p className=\"text-xs text-gray-600 mt-1\">{benefit.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Category Status Alert */}
      {!category && (
        <motion.div variants={contentVariants}>
          <Alert className=\"bg-amber-50 border-amber-200\">
            <AlertTriangle className=\"w-4 h-4 text-amber-600\" />
            <AlertDescription className=\"text-amber-800\">
              <strong>Asset category required:</strong> Please select an asset category in the previous step to view the applicable fee structure.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Fee Structure Component */}
      <motion.div variants={contentVariants}>
        <FeeStructureComponent 
          showComparison={true}
          allowCustomization={false}
          compactMode={false}
        />
      </motion.div>

      {/* Important Information */}
      {category && (
        <motion.div variants={contentVariants}>
          <Card className=\"border-l-4 border-l-blue-500 bg-blue-50/50\">
            <CardHeader>
              <CardTitle className=\"flex items-center gap-2 text-base\">
                <Info className=\"w-5 h-5 text-blue-600\" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className=\"space-y-4\">
              <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
                <div className=\"space-y-2\">
                  <h4 className=\"font-semibold text-gray-900\">Token Supply Basis</h4>
                  <p className=\"text-sm text-gray-600\">
                    The token supply will be issued against the <strong>Gross Total Property Value</strong>, 
                    which includes all fees and costs. This ensures complete transparency in tokenization.
                  </p>
                </div>
                <div className=\"space-y-2\">
                  <h4 className=\"font-semibold text-gray-900\">Payment Schedule</h4>
                  <p className=\"text-sm text-gray-600\">
                    Fees are typically paid at different stages of the transaction process. 
                    Registration and legal fees are due at closing, while platform fees are paid at token issuance.
                  </p>
                </div>
              </div>
              
              <div className=\"bg-white p-4 rounded-lg border\">
                <div className=\"flex items-center gap-2 mb-2\">
                  <Badge className=\"bg-blue-100 text-blue-700\">Pro Tip</Badge>
                </div>
                <p className=\"text-sm text-gray-700\">
                  Fee structures are optimized for each asset category based on regulatory requirements, 
                  due diligence complexity, and market standards. These transparent costs help investors 
                  understand the total investment required.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeeStructure;