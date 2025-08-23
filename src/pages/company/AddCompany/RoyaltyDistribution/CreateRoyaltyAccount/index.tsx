import React from 'react';
import { DialogHeader } from '@/components/ui/CustomDialog';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { formConfig } from './formConfig';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import useRoyaltyAccount from '@/hooks/useRoyaltyAccount';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Loader2, CreditCard, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface IndexProps {
  user: any;
  setUser: (user: any) => void;
  setValue: any;
}

interface FormData {
  name: string;
  email: string;
  mobile_no: string;
  pan_number: string;
}

const Index = ({ user, setUser, setValue }: IndexProps) => {
  const { control, trigger, getValues, reset } = useForm<FormData>({
    mode: 'onBlur',
  });
  const { id: company_id } = useParams<{ id: string }>();
  const isOpen = user !== null;
  
  const handleOnClose = () => {
    setUser(null);
    reset();
  };
  
  const { loading, createRoyaltyAccount, getRoyaltyAccount } =
    useRoyaltyAccount();

  const onSubmit = async () => {
    try {
      const isValid = await trigger();
      if (isValid && company_id) {
        const data = getValues();
        const response = await createRoyaltyAccount({ data, company_id });
        if (response) {
          getRoyaltyAccount(company_id).then((res) => {
            if (res?.data) {
              setValue('royaltyEscrowDetails', res.data);
            }
          });
          toast.success('Royalty Account Added Successfully');
          handleOnClose();
        }
      }
    } catch (error: any) {
      console.error('Error creating royalty account:', error);
      toast.error(error?.message || 'Something went wrong');
    }
  };

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
                Add Royalty Account
              </DialogTitle>
              <p className="text-gray-600">
                Enter the details for the royalty escrow account
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
                All details must match the official records. This account will be used for all royalty distributions.
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
            {FormGenerator(formConfig({ control }))}
          </motion.div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleOnClose}>
              Cancel
            </Button>
            <Button 
              onClick={onSubmit} 
              type="button" 
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;