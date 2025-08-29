import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Wallet,
  TrendingUp,
  Shield,
  CreditCard,
  Coins,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  getFinanceSolutionsByCategory,
  getSolutionsByType,
  calculateRiskScore,
  type FinanceSolution,
  type CategoryFinanceConfig,
} from '@/config/embeddedFinance';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const categoryIcons = {
  defi: Coins,
  credit: CreditCard,
  insurance: Shield,
  yield: TrendingUp,
  payments: Wallet,
  trading: BarChart3,
};

const riskColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

const riskProfileColors = {
  conservative: 'bg-blue-100 text-blue-800',
  moderate: 'bg-purple-100 text-purple-800',
  aggressive: 'bg-orange-100 text-orange-800',
};

interface EmbeddedFinanceComponentProps {
  showConfiguration?: boolean;
}

export const EmbeddedFinanceComponent: React.FC<EmbeddedFinanceComponentProps> = ({
  showConfiguration = false,
}) => {
  const { watch } = useFormContext();
  const [expandedSolutions, setExpandedSolutions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');

  const category = watch('category');
  const financeConfig = getFinanceSolutionsByCategory(category);

  const toggleSolution = (solutionId: string) => {
    setExpandedSolutions(prev =>
      prev.includes(solutionId)
        ? prev.filter(id => id !== solutionId)
        : [...prev, solutionId]
    );
  };

  if (!category || !financeConfig) {
    return (
      <Card className="border-2 m-4 border-dashed border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Wallet className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Select Asset Category
          </h3>
          <p className="text-sm text-gray-500 text-center">
            Choose an asset category to view available embedded finance solutions
          </p>
        </CardContent>
      </Card>
    );
  };

  const solutionsByType = {
    all: financeConfig.solutions,
    defi: getSolutionsByType(category, 'defi'),
    credit: getSolutionsByType(category, 'credit'),
    insurance: getSolutionsByType(category, 'insurance'),
    yield: getSolutionsByType(category, 'yield'),
    payments: getSolutionsByType(category, 'payments'),
    trading: getSolutionsByType(category, 'trading'),
  };

  const activeSolutions = solutionsByType[activeTab as keyof typeof solutionsByType] || [];
  const riskScore = calculateRiskScore(financeConfig.solutions);

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Wallet className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Embedded Finance Solutions
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    {financeConfig.categoryName} - {financeConfig.totalSolutions} Solutions Available
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className={riskProfileColors[financeConfig.riskProfile]}>
                  {financeConfig.riskProfile.charAt(0).toUpperCase() + financeConfig.riskProfile.slice(1)} Risk
                </Badge>
                <Badge variant="outline">
                  Risk Score: {riskScore.toFixed(1)}/3
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Primary Features Overview */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {financeConfig.primaryFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Solutions Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="all">All ({financeConfig.solutions.length})</TabsTrigger>
            <TabsTrigger value="defi">DeFi ({solutionsByType.defi.length})</TabsTrigger>
            <TabsTrigger value="credit">Credit ({solutionsByType.credit.length})</TabsTrigger>
            <TabsTrigger value="insurance">Insurance ({solutionsByType.insurance.length})</TabsTrigger>
            <TabsTrigger value="yield">Yield ({solutionsByType.yield.length})</TabsTrigger>
            <TabsTrigger value="payments">Payments ({solutionsByType.payments.length})</TabsTrigger>
            <TabsTrigger value="trading">Trading ({solutionsByType.trading.length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="space-y-4">
              {activeSolutions.map((solution, index) => {
                const isExpanded = expandedSolutions.includes(solution.id);
                const Icon = categoryIcons[solution.category] || Wallet;

                return (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader
                        className="cursor-pointer"
                        onClick={() => toggleSolution(solution.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <Icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                              <CardTitle className="text-base font-semibold">
                                {solution.name}
                              </CardTitle>
                              <CardDescription className="mt-1">
                                {solution.description}
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={riskColors[solution.riskLevel]}>
                              {solution.riskLevel} risk
                            </Badge>
                            <Badge variant="outline">
                              {solution.category}
                            </Badge>
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </CardHeader>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent className="pt-0">
                              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Features */}
                                <div className="lg:col-span-2">
                                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <Info className="w-4 h-4" />
                                    Features
                                  </h4>
                                  <ul className="space-y-2">
                                    {solution.features.map((feature, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-gray-700">{feature}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Technical Details */}
                                <div>
                                  <h4 className="font-semibold mb-3">Technical Details</h4>
                                  <div className="space-y-3">
                                    {solution.maximumLTV && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Max LTV:</span>
                                        <span className="font-medium">{solution.maximumLTV}%</span>
                                      </div>
                                    )}
                                    {solution.interestRate && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Interest:</span>
                                        <span className="font-medium text-xs">{solution.interestRate}</span>
                                      </div>
                                    )}
                                    {solution.paymentFrequency && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Frequency:</span>
                                        <span className="font-medium text-xs">{solution.paymentFrequency}</span>
                                      </div>
                                    )}
                                    {solution.lockupPeriod && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Lockup:</span>
                                        <span className="font-medium">{solution.lockupPeriod}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Status:</span>
                                      <Badge 
                                        variant={solution.enabled ? "default" : "secondary"}
                                        className={solution.enabled ? "bg-green-100 text-green-800" : ""}
                                      >
                                        {solution.enabled ? 'Active' : 'Disabled'}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default EmbeddedFinanceComponent;