import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Shield,
  Coins,
  Globe,
  TrendingUp,
  Users,
  Lock,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  DollarSign,
  CreditCard,
  Zap,
  Clock,
  UserCheck
} from 'lucide-react';
import { KYBWizard } from '@/components/wizard/KYBWizard';

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

// Subscription plans
const subscriptionPlans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for individual investors starting their RWA journey',
    monthly: 29,
    yearly: 290,
    yearlyDiscount: 17,
    features: [
      'Access to 5 investment opportunities',
      'Basic portfolio analytics',
      'Standard support',
      'Mobile app access',
      'Email notifications'
    ],
    color: 'blue',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Ideal for active investors and small institutions',
    monthly: 79,
    yearly: 790,
    yearlyDiscount: 17,
    features: [
      'Access to all investment opportunities',
      'Advanced portfolio analytics',
      'Priority support',
      'API access',
      'Real-time notifications',
      'Custom reports',
      'Dedicated account manager'
    ],
    color: 'purple',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Comprehensive solution for large institutions',
    monthly: 199,
    yearly: 1990,
    yearlyDiscount: 17,
    features: [
      'Unlimited investment opportunities',
      'White-label solutions',
      '24/7 premium support',
      'Advanced API access',
      'Custom integrations',
      'Multi-user management',
      'Regulatory compliance tools',
      'Custom reporting dashboard'
    ],
    color: 'emerald',
    popular: false
  }
];

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showKYBWizard, setShowKYBWizard] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    // Here you would integrate with Stripe
    // For now, we'll proceed to KYB wizard
    setShowKYBWizard(true);
  };

  const handleKYBComplete = () => {
    setShowKYBWizard(false);
    // Handle successful KYB completion
    // Redirect to dashboard or show success message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            variants={floatingVariants}
            className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 2 }}
            className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Revolutionary RWA Platform
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Welcome to Proplex
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Unlock the future of investment with fractional Real World Assets (RWA). 
                Democratizing access to premium real estate, infrastructure, and commodities through blockchain technology.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-gray-300 hover:border-blue-500 px-8 py-3 text-lg"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { icon: Shield, label: "Bank-Grade Security", value: "256-bit SSL" },
                { icon: Users, label: "Active Investors", value: "10,000+" },
                { icon: DollarSign, label: "Assets Under Management", value: "$500M+" },
                { icon: Globe, label: "Global Markets", value: "25 Countries" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold text-2xl text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        id="how-it-works"
        className="py-20 bg-white"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How Proplex Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform simplifies real world asset investment through cutting-edge blockchain technology, 
              making premium investments accessible to everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: UserCheck,
                title: "Complete KYB Verification",
                description: "Streamlined Know Your Business process with automated compliance checks and instant verification.",
                color: "blue"
              },
              {
                step: "02", 
                icon: Building2,
                title: "Browse Premium Assets",
                description: "Explore curated real estate, infrastructure, and commodity investments with detailed analytics.",
                color: "purple"
              },
              {
                step: "03",
                icon: Coins,
                title: "Invest & Earn",
                description: "Purchase fractional tokens, track performance, and receive regular distributions securely.",
                color: "emerald"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                custom={index}
                className="relative"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${
                      step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-emerald-500 to-emerald-600'
                    } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-sm font-bold text-gray-400 mb-2">{step.step}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Proplex?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of investing with our comprehensive platform designed for the modern investor.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Regulatory Compliant",
                description: "Full compliance with global regulations and automated KYB/AML processes.",
                color: "blue"
              },
              {
                icon: Lock,
                title: "Institutional Security",
                description: "Bank-grade security with multi-signature wallets and cold storage solutions.",
                color: "purple"
              },
              {
                icon: TrendingUp,
                title: "Real-Time Analytics",
                description: "Advanced portfolio tracking with live performance metrics and insights.",
                color: "emerald"
              },
              {
                icon: Globe,
                title: "Global Access",
                description: "Invest in premium assets worldwide from anywhere, anytime.",
                color: "blue"
              },
              {
                icon: Zap,
                title: "Instant Liquidity",
                description: "Trade tokens on secondary markets with instant settlement.",
                color: "purple"
              },
              {
                icon: Clock,
                title: "24/7 Platform",
                description: "Round-the-clock access to your investments and portfolio management.",
                color: "emerald"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                custom={index}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${
                      feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      'from-emerald-500 to-emerald-600'
                    } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="py-20 bg-white"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Select the perfect plan for your investment journey. All plans include access to our secure platform and expert support.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'yearly' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 17%</Badge>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                custom={index}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-purple-200 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          ${billingCycle === 'monthly' ? plan.monthly : plan.yearly}
                        </span>
                        <span className="text-gray-600 ml-2">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className="text-sm text-green-600 mt-1">
                          Save ${plan.monthly * 12 - plan.yearly} per year
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handleSubscribe(plan.id)}
                      className={`w-full py-3 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-gray-600">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Investing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of investors who trust Proplex for their RWA investment needs. 
              Start your journey today with our streamlined onboarding process.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* KYB Wizard Modal */}
      {showKYBWizard && (
        <KYBWizard
          isOpen={showKYBWizard}
          onClose={() => setShowKYBWizard(false)}
          onComplete={handleKYBComplete}
          selectedPlan={selectedPlan}
        />
      )}
    </div>
  );
}