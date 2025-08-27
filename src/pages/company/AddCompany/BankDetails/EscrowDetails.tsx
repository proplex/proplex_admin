import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Mail, Phone, User, MapPin, Calendar, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface UserInfo {
  name: string;
  acccount_number: string;
  balance: string;
  bank_name: string;
  ifsc_code: string;
  id: number;
  country_code: number;
  mobile_no: number;
  email: string;
  status: number;
  created_at: string;
  pan_status: string;
}

export default function EscrowDetails({ userInfo }: { userInfo: UserInfo }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
      className="bg-gradient-to-br rounded-xl p-6 border border-gray-200 shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200"
        variants={itemVariants}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{userInfo?.name || '-'}</h3>
            <p className="text-gray-600">Escrow Account Holder</p>
          </div>
        </div>
        <Badge 
          variant={userInfo?.status === 1 ? 'default' : 'destructive'}
          className="px-4 py-2 text-base rounded-full shadow-sm"
        >
          <ShieldCheck className="w-4 h-4 mr-1.5" />
          {userInfo?.status === 1 ? 'Active' : 'Inactive'}
        </Badge>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
        <motion.div 
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="text-base font-semibold text-gray-800">Account Details</h4>
          </div>
          <div className="space-y-3.5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-600">Account Number</p>
              <p className="text-sm font-medium text-gray-900">{userInfo?.acccount_number || '-'}</p>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-sm font-medium text-gray-900">{userInfo?.balance || '-'}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">PAN Status</p>
              <p className="text-sm font-medium text-gray-900">{userInfo?.pan_status || '-'}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-base font-semibold text-gray-800">Bank Information</h4>
          </div>
          <div className="space-y-3.5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-600">Bank Name</p>
              <p className="text-sm font-medium text-gray-900">{userInfo?.bank_name || '-'}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">IFSC Code</p>
              <p className="text-sm font-medium text-gray-900">{userInfo?.ifsc_code || '-'}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          variants={itemVariants}
        >
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
                +{userInfo?.country_code || '-'} {userInfo?.mobile_no || '-'}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">{userInfo?.email || '-'}</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <h4 className="text-base font-semibold text-gray-800">Account Information</h4>
          </div>
          <div className="space-y-3.5">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <p className="text-sm text-gray-600">Account ID</p>
              <p className="text-sm font-medium text-gray-900">{userInfo?.id || '-'}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Created At</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(userInfo?.created_at) || '-'}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}