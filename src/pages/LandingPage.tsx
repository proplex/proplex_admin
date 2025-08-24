import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
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
  UserCheck,
  LogIn
} from 'lucide-react';
import { KYBWizard } from '@/components/wizard/KYBWizard';
import { useWeb3AuthConnect } from "@web3auth/modal/react";
import { useNavigate } from 'react-router-dom';

// Counter Animation Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
}) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

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
  const { connect, loading } = useWeb3AuthConnect();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await connect();
      // Redirect to home page after successful login
      navigate('/');
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-white"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Background Elements - Removed for clean white design */}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none px-6 py-2 shadow-lg">
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
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg shadow-lg"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg transition-all duration-200"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Watch Demo
                </Button>
              </div>
            </motion.div>

            {/* Powered by Avalanche */}
            <div className="relative py-12 px-4">
              <motion.div variants={itemVariants} className="text-center">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Powered by Avalanche
                  </h3>

                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  {/* Avalanche Logo/Icon */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-xl text-gray-900">Avalanche</div>
                      <div className="text-sm text-gray-600">Blockchain Platform</div>
                    </div>
                  </div>
                  
                  {/* Key Benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Sub-Second</div>
                      <div className="text-sm text-gray-600">Finality</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Low Fees</div>
                      <div className="text-sm text-gray-600">Transactions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">Eco-Friendly</div>
                      <div className="text-sm text-gray-600">Consensus</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
                color: "blue"
              },
              {
                step: "03",
                icon: Coins,
                title: "Invest & Earn",
                description: "Purchase fractional tokens, track performance, and receive regular distributions securely.",
                color: "blue"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                custom={index}
                className="relative text-center group"
              >
                <div className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-sm font-bold text-blue-500 mb-2">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20"
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
                color: "blue"
              },
              {
                icon: TrendingUp,
                title: "Real-Time Analytics",
                description: "Advanced portfolio tracking with live performance metrics and insights.",
                color: "blue"
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
                color: "blue"
              },
              {
                icon: Clock,
                title: "24/7 Platform",
                description: "Round-the-clock access to your investments and portfolio management.",
                color: "blue"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                custom={index}
                className="text-center group"
              >
                <div className="p-6">
                  <div className="w-12 h-12 mb-4 mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
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
                    <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <div className={`h-full border border-gray-200 bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg relative ${
                  plan.popular 
                    ? 'ring-2 ring-blue-200 shadow-lg scale-105' 
                    : 'hover:border-blue-300'
                }`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                    
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
                  </div>
                  
                  <div>
                    <ul className="space-y-3 mb-8">
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
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Subscribe Now
                    </Button>
                  </div>
                </div>
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
        className="py-20 bg-white border-t border-gray-200"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Investing?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of investors who trust Proplex for their RWA investment needs. 
              Start your journey today with our streamlined onboarding process.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 text-lg font-semibold shadow-lg"
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