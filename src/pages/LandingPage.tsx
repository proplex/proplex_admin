import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Clock,
  UserCheck,
  LogIn,
  Zap,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Send
} from 'lucide-react';

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

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Early access form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', newsletterEmail);
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterSubmitted(false);
      setNewsletterEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 relative overflow-hidden"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
    

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
                  onClick={() => document.getElementById('join-early')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Join Early Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 text-lg transition-all duration-200"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            {/* Animated Illustration - Investment Growth */}
            <motion.div 
              variants={itemVariants}
              className="mt-16 relative"
            >
              <div className="max-w-4xl mx-auto">
                <svg viewBox="0 0 800 400" className="w-full h-auto">
                  {/* Building illustration */}
                  <motion.g
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {/* Building 1 */}
                    <motion.rect
                      x="100" y="200" width="80" height="150"
                      fill="url(#building1Gradient)"
                      rx="4"
                      animate={{ y: [200, 195, 200] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Windows */}
                    {[0, 1, 2, 3].map((row) => (
                      <g key={row}>
                        {[0, 1].map((col) => (
                          <motion.rect
                            key={`${row}-${col}`}
                            x={115 + col * 25} y={220 + row * 30}
                            width="15" height="20"
                            fill="#FFF"
                            opacity="0.8"
                            animate={{ opacity: [0.8, 0.3, 0.8] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: Math.random() * 2 
                            }}
                          />
                        ))}
                      </g>
                    ))}
                  </motion.g>

                  {/* Building 2 */}
                  <motion.g
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    <motion.rect
                      x="200" y="170" width="100" height="180"
                      fill="url(#building2Gradient)"
                      rx="4"
                      animate={{ y: [170, 165, 170] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {[0, 1, 2, 3, 4].map((row) => (
                      <g key={row}>
                        {[0, 1, 2].map((col) => (
                          <motion.rect
                            key={`${row}-${col}`}
                            x={215 + col * 25} y={190 + row * 30}
                            width="15" height="20"
                            fill="#FFF"
                            opacity="0.8"
                            animate={{ opacity: [0.8, 0.3, 0.8] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: Math.random() * 2 
                            }}
                          />
                        ))}
                      </g>
                    ))}
                  </motion.g>

                  {/* Building 3 */}
                  <motion.g
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  >
                    <motion.rect
                      x="320" y="190" width="90" height="160"
                      fill="url(#building3Gradient)"
                      rx="4"
                      animate={{ y: [190, 185, 190] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {[0, 1, 2, 3].map((row) => (
                      <g key={row}>
                        {[0, 1].map((col) => (
                          <motion.rect
                            key={`${row}-${col}`}
                            x={340 + col * 30} y={210 + row * 30}
                            width="18" height="20"
                            fill="#FFF"
                            opacity="0.8"
                            animate={{ opacity: [0.8, 0.3, 0.8] }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity, 
                              delay: Math.random() * 2 
                            }}
                          />
                        ))}
                      </g>
                    ))}
                  </motion.g>

                  {/* Floating coins */}
                  <motion.g
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <motion.circle
                      cx="500" cy="150" r="25"
                      fill="url(#coinGradient)"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <text x="500" y="157" textAnchor="middle" fill="#FFF" fontSize="24" fontWeight="bold">$</text>
                  </motion.g>

                  <motion.g
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    <motion.circle
                      cx="600" cy="200" r="20"
                      fill="url(#coinGradient)"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <text x="600" y="206" textAnchor="middle" fill="#FFF" fontSize="20" fontWeight="bold">$</text>
                  </motion.g>

                  <motion.g
                    animate={{ y: [0, -25, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <motion.circle
                      cx="550" cy="100" r="18"
                      fill="url(#coinGradient)"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <text x="550" y="105" textAnchor="middle" fill="#FFF" fontSize="18" fontWeight="bold">$</text>
                  </motion.g>

                  {/* Growth arrow */}
                  <motion.g
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.2 }}
                  >
                    <motion.path
                      d="M 450 320 Q 500 280, 550 240 Q 600 200, 650 160"
                      stroke="url(#arrowGradient)"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray="5,5"
                      animate={{ strokeDashoffset: [0, -10] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.polygon
                      points="645,155 655,160 650,170"
                      fill="#3B82F6"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.g>

                  {/* Blockchain nodes */}
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    {[
                      { cx: 680, cy: 280 },
                      { cx: 720, cy: 250 },
                      { cx: 700, cy: 220 }
                    ].map((node, i) => (
                      <g key={i}>
                        <motion.circle
                          cx={node.cx} cy={node.cy} r="15"
                          fill="url(#nodeGradient)"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                        <motion.circle
                          cx={node.cx} cy={node.cy} r="20"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          opacity="0.3"
                          animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      </g>
                    ))}
                    <motion.line x1="680" y1="280" x2="720" y2="250" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
                    <motion.line x1="720" y1="250" x2="700" y2="220" stroke="#3B82F6" strokeWidth="2" opacity="0.5" />
                  </motion.g>

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="building1Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                    <linearGradient id="building2Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                    <linearGradient id="building3Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#4F46E5" />
                    </linearGradient>
                    <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FCD34D" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                    <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                    <radialGradient id="nodeGradient">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
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
                color: "blue",
                illustration: (
                  <svg viewBox="0 0 200 200" className="w-full h-32 mb-4">
                    <motion.g
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.rect x="50" y="60" width="100" height="80" rx="8" fill="#EFF6FF" />
                      <motion.circle
                        cx="100" cy="85" r="15"
                        fill="#3B82F6"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.path
                        d="M 85 90 L 95 100 L 115 80"
                        stroke="#FFF"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      />
                      <motion.rect x="65" y="110" width="70" height="4" rx="2" fill="#DBEAFE" />
                      <motion.rect x="65" y="120" width="50" height="4" rx="2" fill="#DBEAFE" />
                    </motion.g>
                  </svg>
                )
              },
              {
                step: "02", 
                icon: Building2,
                title: "Browse Premium Assets",
                description: "Explore curated real estate, infrastructure, and commodity investments with detailed analytics.",
                color: "blue",
                illustration: (
                  <svg viewBox="0 0 200 200" className="w-full h-32 mb-4">
                    <motion.g
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.rect
                        x="40" y="80" width="40" height="60" fill="#3B82F6"
                        animate={{ y: [80, 75, 80] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <motion.rect
                        x="85" y="60" width="50" height="80" fill="#8B5CF6"
                        animate={{ y: [60, 55, 60] }}
                        transition={{ duration: 3.5, repeat: Infinity }}
                      />
                      <motion.rect
                        x="140" y="70" width="45" height="70" fill="#6366F1"
                        animate={{ y: [70, 65, 70] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      {[0, 1, 2].map((i) => (
                        <motion.rect
                          key={i}
                          x={50 + i * 15} y={95 + i * 15}
                          width="8" height="10" fill="#FFF" opacity="0.8"
                          animate={{ opacity: [0.8, 0.3, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                    </motion.g>
                  </svg>
                )
              },
              {
                step: "03",
                icon: Coins,
                title: "Invest & Earn",
                description: "Purchase fractional tokens, track performance, and receive regular distributions securely.",
                color: "blue",
                illustration: (
                  <svg viewBox="0 0 200 200" className="w-full h-32 mb-4">
                    <motion.g>
                      <motion.circle
                        cx="100" cy="80" r="25" fill="#FCD34D"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.text
                        x="100" y="88" textAnchor="middle" fill="#92400E" fontSize="24" fontWeight="bold"
                      >
                        $
                      </motion.text>
                      <motion.path
                        d="M 50 120 L 100 110 L 150 120"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                      <motion.path
                        d="M 100 110 L 100 130"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeDasharray="4,4"
                        animate={{ strokeDashoffset: [0, -8] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <motion.circle
                        cx="100" cy="135" r="8" fill="#10B981"
                        animate={{ scale: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.g>
                  </svg>
                )
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                variants={itemVariants}
                custom={index}
                className="relative text-center group"
              >
                <div className="p-8">
                  {/* Animated Illustration */}
                  {step.illustration}
                  
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
        className="py-20 bg-gray-50"
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
                className="bg-white rounded-xl p-6 text-center group hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 mb-4 mx-auto rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Join Early Access Section */}
      <motion.section
        id="join-early"
        className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-10"
            animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-white opacity-10"
            animate={{ scale: [1.5, 1, 1.5], rotate: [360, 180, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our Early Access Program
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Be among the first to experience the future of RWA investing. Get exclusive early access benefits and special pricing.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
              <CardContent className="p-8">
                {formSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">We'll be in touch soon with your early access details.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your Company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us about your investment goals
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="What types of assets are you interested in? What's your investment range?"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-6"
                    >
                      Request Early Access
                      <Send className="w-5 h-5 ml-2" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                icon: Star,
                title: "Priority Access",
                description: "Be first to access new investment opportunities"
              },
              {
                icon: DollarSign,
                title: "Special Pricing",
                description: "Exclusive discounts on platform fees"
              },
              {
                icon: Users,
                title: "Dedicated Support",
                description: "Direct line to our investment team"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center text-white">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold mb-2">{benefit.title}</h4>
                <p className="text-sm text-blue-100">{benefit.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="py-16 bg-gray-900"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center">
            <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-8">
              Subscribe to our newsletter for the latest updates on RWA investments, market insights, and platform news.
            </p>

            {newsletterSubmitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 text-green-400 bg-green-400/10 px-6 py-3 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Successfully subscribed!</span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Proplex</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Democratizing access to real world assets through blockchain technology. 
                Invest in premium real estate, infrastructure, and commodities with confidence.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Investment Options</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Market Insights</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <div className="text-white font-medium mb-1">Email</div>
                  <a href="mailto:hello@proplex.io" className="hover:text-blue-400 transition-colors">
                    hello@proplex.io
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <div className="text-white font-medium mb-1">Phone</div>
                  <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <div className="text-white font-medium mb-1">Location</div>
                  <p>San Francisco, CA 94102</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              © 2025 Proplex. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
