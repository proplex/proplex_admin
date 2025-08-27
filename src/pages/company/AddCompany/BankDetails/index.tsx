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
       
         <div className="p-6">
            <EscrowDetails userInfo={escrowDetails} />
          </div>
        
        {/* Bank Accounts Section */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 px-6 py-4  to-emerald-50/30 border-b border-gray-200">
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