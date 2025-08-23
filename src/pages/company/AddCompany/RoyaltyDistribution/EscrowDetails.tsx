import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Mail, Phone, User, Building, Calendar, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import CreateRoyalyAccount from './CreateRoyaltyAccount';
import { motion } from 'framer-motion';

interface UserInfo {
  name?: string;
  acccount_number?: string;
  balance?: string;
  bank_name?: string;
  ifsc_code?: string;
  id?: number;
  country_code?: number;
  mobile_no?: number;
  email?: string;
  status?: number;
  created_at?: string;
  pan_status?: string;
}

export default function EscrowDetails({
  userInfo,
  setValue,
}: {
  userInfo: UserInfo | null | undefined;
  setValue: any;
}) {
  const [user, setUser] = useState<any>(null);
  
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const createAccount = () => {
    setUser({});
  };

  // Handle case where userInfo is null or undefined
  const safeUserInfo = userInfo || {};

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 rounded-2xl p-6 border border-gray-200 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <CreateRoyalyAccount user={user} setUser={setUser} setValue={setValue} />
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{safeUserInfo.name || 'No Account Created'}</h3>
            <p className="text-gray-600">Royalty Escrow Account</p>
          </div>
        </div>
        {!safeUserInfo?.ifsc_code ? (
          <Button 
            type="button" 
            onClick={createAccount}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Create Account
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-600" />
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        )}
      </motion.div>
      
      {safeUserInfo?.ifsc_code ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6"
          variants={itemVariants}
        >
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="text-base font-semibold text-gray-800">Account Details</h4>
            </div>
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="text-sm font-medium text-gray-900">{safeUserInfo.acccount_number || '-'}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-sm font-medium text-gray-900">{safeUserInfo.balance || '-'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Building className="w-5 h-5 text-indigo-600" />
              </div>
              <h4 className="text-base font-semibold text-gray-800">Bank Information</h4>
            </div>
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="text-sm font-medium text-gray-900">{safeUserInfo.bank_name || '-'}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">IFSC Code</p>
                <p className="text-sm font-medium text-gray-900">{safeUserInfo.ifsc_code || '-'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <h4 className="text-base font-semibold text-gray-800">Contact Information</h4>
            </div>
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-sm font-medium text-gray-900">
                  +{safeUserInfo.country_code || '-'} {safeUserInfo.mobile_no || '-'}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">{safeUserInfo.email || '-'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <h4 className="text-base font-semibold text-gray-800">Account Information</h4>
            </div>
            <div className="space-y-3.5">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <p className="text-sm text-gray-600">Account ID</p>
                <p className="text-sm font-medium text-gray-900">{safeUserInfo.id || '-'}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Created At</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(safeUserInfo.created_at) || '-'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-12 text-center"
          variants={itemVariants}
        >
          <div className="p-4 bg-gray-100 rounded-full mb-4">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Escrow Account Created</h3>
          <p className="text-gray-600 mb-4 max-w-md">
            Create a royalty escrow account to manage distributions and track transactions.
          </p>
          <Button 
            type="button" 
            onClick={createAccount}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Create Escrow Account
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}