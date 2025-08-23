import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import {
  Building2, User, FileText, Wallet, Shield, CheckCircle,
  ArrowRight, ArrowLeft, Download, Copy, Key, Eye, EyeOff, AlertCircle
} from 'lucide-react';

interface KYBWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  selectedPlan: string | null;
}

const steps = [
  { id: 'business', title: 'Business Info', icon: Building2 },
  { id: 'contact', title: 'Contact Details', icon: User },
  { id: 'documents', title: 'Documents', icon: FileText },
  { id: 'wallet', title: 'Wallet', icon: Wallet },
  { id: 'policy', title: 'Policy', icon: Shield },
  { id: 'complete', title: 'Complete', icon: CheckCircle }
];

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

const stepVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const contentVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: 0.3 }
  }
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

export function KYBWizard({ isOpen, onClose, onComplete, selectedPlan }: KYBWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessInfo, setBusinessInfo] = useState({
    companyName: '', businessType: '', registrationNumber: ''
  });
  const [contactInfo, setContactInfo] = useState({
    firstName: '', lastName: '', email: ''
  });
  const [walletInfo, setWalletInfo] = useState({
    address: '', privateKey: '', mnemonic: '', isGenerated: false
  });
  const [policyInfo, setPolicyInfo] = useState({
    investmentPolicy: '', riskTolerance: '', complianceAgreement: false, termsAgreement: false
  });
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const generateWallet = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockWallet = {
      address: '0x742d35Cc6634C0532925a3b8D91BdDD51b80d01c',
      privateKey: '0x8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f',
      mnemonic: 'abandon ability able about above absent absorb abstract absurd abuse access accident',
      isGenerated: true
    };
    
    setWalletInfo(mockWallet);
    setIsGenerating(false);
    toast({ title: 'Wallet Generated Successfully' });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to Clipboard', description: `${label} copied.` });
  };

  const downloadWalletInfo = () => {
    const walletData = { ...walletInfo, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(walletData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'proplex-wallet-backup.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Wallet Backup Downloaded' });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    console.log('KYB Data:', { businessInfo, contactInfo, walletInfo, policyInfo, selectedPlan });
    toast({ title: 'KYB Verification Complete' });
    onComplete();
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return businessInfo.companyName && businessInfo.businessType;
      case 1: return contactInfo.firstName && contactInfo.lastName && contactInfo.email;
      case 2: return true;
      case 3: return walletInfo.isGenerated;
      case 4: return policyInfo.complianceAgreement && policyInfo.termsAgreement;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Company Name *</Label>
                <Input
                  value={businessInfo.companyName}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <Label>Business Type *</Label>
                <Select
                  value={businessInfo.businessType}
                  onValueChange={(value) => setBusinessInfo(prev => ({ ...prev, businessType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Registration Number</Label>
                <Input
                  value={businessInfo.registrationNumber}
                  onChange={(e) => setBusinessInfo(prev => ({ ...prev, registrationNumber: e.target.value }))}
                  placeholder="Enter registration number"
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input
                  value={contactInfo.firstName}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input
                  value={contactInfo.lastName}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Enter last name"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Email Address *</Label>
                <Input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold">Upload Required Documents</h3>
              <p className="text-gray-600">Please upload verification documents</p>
            </div>
            <div className="space-y-4">
              {['Certificate of Incorporation', 'Business License', 'Tax ID Document'].map((doc, index) => (
                <Card key={index} className="border-dashed border-2 border-gray-300">
                  <CardContent className="p-4 flex items-center justify-between">
                    <span className="font-medium">{doc}</span>
                    <Button variant="outline" size="sm">Upload</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <motion.div className="space-y-6" variants={contentVariants}>
            <motion.div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200" whileHover={{ scale: 1.01 }}>
              <div className="text-center mb-8">
                <motion.div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg mb-4" whileHover={{ rotate: 5, scale: 1.05 }}>
                  <Wallet className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Generate Your Secure Wallet</h3>
                <p className="text-gray-600">Create a blockchain wallet for secure asset management</p>
              </div>

              {!walletInfo.isGenerated ? (
                <div className="text-center">
                  <motion.button
                    onClick={generateWallet}
                    disabled={isGenerating}
                    className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-blue-700 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: isGenerating ? 1 : 1.05 }}
                    whileTap={{ scale: isGenerating ? 1 : 0.95 }}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Wallet'}
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <motion.div className="bg-green-50 p-4 rounded-lg border border-green-200" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-700 font-medium">Wallet Generated Successfully</span>
                    </div>
                  </motion.div>
                  <Card>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Wallet Address</Label>
                        <div className="flex gap-2">
                          <Input value={walletInfo.address} readOnly className="bg-gray-50 font-mono text-sm" />
                          <motion.button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" whileHover={{ scale: 1.05 }} onClick={() => copyToClipboard(walletInfo.address, 'Address')}>
                            <Copy className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">Private Key</Label>
                        <div className="flex gap-2">
                          <Input type={showPrivateKey ? 'text' : 'password'} value={walletInfo.privateKey} readOnly className="bg-gray-50 font-mono text-sm" />
                          <motion.button className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600" whileHover={{ scale: 1.05 }} onClick={() => setShowPrivateKey(!showPrivateKey)}>
                            {showPrivateKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </motion.button>
                          <motion.button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" whileHover={{ scale: 1.05 }} onClick={() => copyToClipboard(walletInfo.privateKey, 'Private Key')}>
                            <Copy className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                      <motion.button onClick={downloadWalletInfo} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md" whileHover={{ scale: 1.02 }}>
                        <Download className="w-4 h-4 mr-2 inline" />
                        Download Backup
                      </motion.button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </motion.div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
              <h3 className="text-lg font-semibold">Investment Policy & Compliance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Investment Policy</Label>
                <Select
                  value={policyInfo.investmentPolicy}
                  onValueChange={(value) => setPolicyInfo(prev => ({ ...prev, investmentPolicy: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Risk Tolerance</Label>
                <Select
                  value={policyInfo.riskTolerance}
                  onValueChange={(value) => setPolicyInfo(prev => ({ ...prev, riskTolerance: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk</SelectItem>
                    <SelectItem value="medium">Medium Risk</SelectItem>
                    <SelectItem value="high">High Risk</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="compliance"
                    checked={policyInfo.complianceAgreement}
                    onChange={(e) => setPolicyInfo(prev => ({ ...prev, complianceAgreement: e.target.checked }))}
                    className="mt-1"
                  />
                  <Label htmlFor="compliance" className="text-sm">
                    I agree to comply with all regulations and reporting requirements.
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={policyInfo.termsAgreement}
                    onChange={(e) => setPolicyInfo(prev => ({ ...prev, termsAgreement: e.target.checked }))}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the Terms of Service and Privacy Policy.
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <motion.div className="text-center space-y-8" variants={contentVariants}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
              <div className="inline-flex p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">KYB Verification Complete!</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Your application has been submitted successfully. We'll review within 1-2 business days.
              </p>
            </motion.div>
            <motion.div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h4 className="font-semibold text-green-900 mb-4 text-lg">What's Next?</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-green-800 font-medium">Email confirmation sent</p>
                </motion.div>
                <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-green-800 font-medium">Document verification in progress</p>
                </motion.div>
                <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                  <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-3">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-green-800 font-medium">Access activated upon approval</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">KYB Verification</DialogTitle>
          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                </div>
                {index < steps.length - 1 && <div className="w-8 h-0.5 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between p-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button onClick={handleComplete} className="bg-green-500 hover:bg-green-600">
              Complete KYB
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}