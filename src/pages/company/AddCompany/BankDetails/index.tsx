import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EscrowDetails from './EscrowDetails';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AddBank from './AddBank';
import { motion } from 'framer-motion';
import { CreditCard, Building2, ShieldCheck, Info } from 'lucide-react';

const Index = () => {
  const { control, getValues } = useFormContext();
  const [index, setIndex] = useState<any>(null);
  const { fields, remove, append, update } = useFieldArray({
    control,
    name: 'bankAccounts',
    keyName: 'bank_id',
  });

  const handleBankAccount = () => {
    setIndex(-1);
  };

  const escrowDetails = getValues('escrowDetails');
  const escrow_user_id = getValues('escrow_user_id');

  // Animation variants for entrance effects
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AddBank
        escrow_user_id={escrow_user_id}
        append={append}
        fields={fields}
        index={index}
        setIndex={setIndex}
      />
      
      {/* Header Section with Enhanced Styling */}
     

      <div className="space-y-6">
        {/* Escrow Details Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          variants={itemVariants}
        >
          <div className="pb-4 border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-50/30 to-indigo-50/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-md">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Escrow Details</h2>
            </div>
            <p className="text-gray-600 text-sm mt-2 ml-11">
              Secure account information for royalty distributions
            </p>
          </div>
          <div className="p-6">
            <EscrowDetails userInfo={escrowDetails} />
          </div>
        </motion.div>
        
        {/* Bank Accounts Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 px-6 py-4 bg-gradient-to-r from-green-50/30 to-emerald-50/30 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-md">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Bank Accounts</h2>
                <p className="text-gray-600 text-sm mt-1">
                  List of all bank accounts associated with your company
                </p>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleBankAccount}
              disabled={!escrow_user_id}
              className="whitespace-nowrap bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              Add Bank Account
            </Button>
          </div>
          
          <div className="p-6">
            {/* Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <h3 className="font-medium text-blue-800">Account Verification</h3>
                </div>
                <p className="text-sm text-blue-700">
                  All bank accounts must be verified before they can receive distributions
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-amber-600" />
                  <h3 className="font-medium text-amber-800">Processing Time</h3>
                </div>
                <p className="text-sm text-amber-700">
                  New accounts may take 2-3 business days for verification
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-purple-600" />
                  <h3 className="font-medium text-purple-800">Security</h3>
                </div>
                <p className="text-sm text-purple-700">
                  Your banking information is encrypted and securely stored
                </p>
              </div>
            </div>
            
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <Table>
                <TableHeader className="bg-gray-50/80">
                  <TableRow>
                    <TableHead className="font-semibold text-gray-700 py-3">ID</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-3">Account Holder</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-3">Bank Name</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-3">Account Number</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-3">IFSC</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-3">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 py-3">Verification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.length > 0 ? (
                    fields.map((item: any, index: number) => (
                      <TableRow 
                        key={item.id} 
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="py-4 font-medium text-gray-900">{item.id || '-'}</TableCell>
                        <TableCell className="py-4 font-medium">{item.name || '-'}</TableCell>
                        <TableCell className="py-4 text-gray-700">{item.bank_name || '-'}</TableCell>
                        <TableCell className="py-4 text-gray-700">{item.bank_account || '-'}</TableCell>
                        <TableCell className="py-4 text-gray-700">{item.bank_ifsc || '-'}</TableCell>
                        <TableCell className="py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            item.bank_status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {item.bank_status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            item.verified 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.verified ? 'Verified' : 'Pending'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="py-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <CreditCard className="h-12 w-12 text-gray-300 mb-3" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No bank accounts added</h3>
                          <p className="text-gray-500">Get started by adding your first bank account</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;