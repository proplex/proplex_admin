// =========================================================================
//  FeeStructure.tsx – Tokenisation Cost Calculator (Fully Updated)
//  Built with React 18, Framer-motion, TailwindCSS, shadcn/ui
// =========================================================================
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
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------------
// Animation presets
// -------------------------------------------------------------------------
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// -------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------
const FeeStructure: React.FC = () => {
  const { watch } = useFormContext();
  const category = watch('category');
  const basePropertyValue = watch('basePropertyValue');

  const benefitCards = [
    {
      Icon: TrendingUp,
      title: 'Transparent Pricing',
      desc: 'Category-specific fee structures',
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
    },
    {
      Icon: Shield,
      title: 'Regulatory Compliant',
      desc: 'All legal & compliance costs included',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      Icon: Calculator,
      title: 'Real-Time Calculation',
      desc: 'Instant updates on value change',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
    {
      Icon: CheckCircle2,
      title: 'All-Inclusive',
      desc: 'Zero hidden or surprise fees',
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
  ];

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col w-full space-y-8"
    >

      {/* ------------------------------------------------------------------ */}
      {/* Hero Header */}
      {/* ------------------------------------------------------------------ */}
      <motion.header
        variants={fadeUp}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 shadow-sm border border-blue-100"
      >
        {/* subtle animated blobs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
          >
            <Calculator className="w-7 h-7 text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tokenisation Fee Structure
            </h1>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Understand the total cost of digitalising your real-estate asset.
            </p>
          </div>
        </div>
      </motion.header>

      {/* ------------------------------------------------------------------ */}
      {/* Key Benefits */}
      {/* ------------------------------------------------------------------ */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {benefitCards.map(({ Icon, title, desc, color, bg }, idx) => (
          <motion.div
            key={title}
            variants={fadeUp}
            whileHover={{ scale: 1.03, y: -2 }}
            className={`p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all ${bg}`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-6 h-6 ${color}`} />
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
                <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Missing Category Alert */}
      {/* ------------------------------------------------------------------ */}
      {!category && (
        <motion.div variants={fadeUp}>
          <Alert className="bg-amber-50 border-amber-300 text-amber-800">
            <AlertTriangle className="w-5 h-5" />
            <AlertDescription>
              <strong>Asset category required.</strong>
              Please select the asset category in the previous step to load the correct fee schedule.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Core Fee Component */}
      {/* ------------------------------------------------------------------ */}
      {category && (
        <motion.div variants={fadeUp}>
          <FeeStructureComponent
            showComparison
            allowCustomization={false}
            compactMode={false}
          />
        </motion.div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Important Information Card */}
      {/* ------------------------------------------------------------------ */}
      {category && (
        <motion.div variants={fadeUp}>
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                Need-to-Know
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Token Supply Basis</h4>
                  <p className="text-sm text-gray-600">
                    Tokens are issued against the <strong>Gross Total Property Value</strong>,
                    i.e. purchase price plus all fees—no surprises.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Payment Milestones</h4>
                  <p className="text-sm text-gray-600">
                    Registration & legal fees are due at closing; platform fees are settled at token issuance.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg border">
                <Badge className="bg-blue-100 text-blue-700 mb-2">Pro Tip</Badge>
                <p className="text-sm text-gray-700">
                  Fee percentages are pre-optimised per asset category and jurisdiction; adjust base value to see live updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.section>
  );
};

export default FeeStructure;