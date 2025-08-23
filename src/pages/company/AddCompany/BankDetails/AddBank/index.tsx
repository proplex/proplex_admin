import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { formConfig } from './formConfig';
import { useAddBank } from '@/hooks/useAddBank';
import { Loader2, CreditCard, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModalProps {
  escrow_user_id: any;
  append: any;
  fields: any;
  index: number;
  setIndex: any;
}

const Index: React.FC<ModalProps> = ({
  escrow_user_id,
  append,
  fields,
  index,
  setIndex,
}) => {
  const {
    getValues: formGetValues,
    trigger,
    setValue: setFiledValue,
    clearErrors,
  } = useFormContext<any>();
  const { addBank, isLoading, error } = useAddBank();

  const getPreviousValues = () => {
    if (index !== null) {
      return fields[index];
    }
    return null;
  };

  const onSubmit = () => {
    trigger(`bankAccounts.${index}`).then((isValid) => {
      if (isValid) {
        const data = formGetValues();
        const { bankAccounts } = data;
        const values = bankAccounts[index];
        addBank({ ...values, escrow_user_id }).then((response) => {
          if (response) {
            append({
              ...response.data,
              bank_account: response.data.account_number,
              bank_ifsc: response.data.ifsc_code,
              bank_status: 'active',
            });
            setIndex(null);
            clearErrors();
          }
        });
      }
    });
  };

  const handleOnClose = () => {
    setIndex(null);
    setFiledValue(`bankAccounts.${index}`, getPreviousValues());
    clearErrors();
  };
  const isOpen = index !== null;

  return (
    <Dialog open={!!isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl shadow-xl">
        <DialogHeader className="mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Add Bank Account
              </DialogTitle>
              <p className="text-gray-600">
                Enter the details for the new bank account
              </p>
            </div>
          </div>
        </DialogHeader>
        
        {/* Information Banner */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Important Information</h4>
              <p className="text-sm text-blue-700">
                All bank accounts must be verified before they can receive royalty distributions. 
                Please ensure all details match your bank records.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-5 py-2">
          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {FormGenerator(formConfig({ index }))}
          </motion.div>
          
          {error && (
            <motion.div 
              className="bg-red-50 rounded-lg p-3 border border-red-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-sm text-red-700">{error}</p>
            </motion.div>
          )}
          
          <div className="flex justify-end gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleOnClose}
              className="px-5"
            >
              Cancel
            </Button>
            <Button 
              onClick={onSubmit} 
              type="button" 
              disabled={isLoading}
              className="px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding Account...
                </>
              ) : (
                'Add Bank Account'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;