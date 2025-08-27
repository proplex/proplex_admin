import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import formConfig from './formConfig';
import { useUpdateAdvisor } from '@/hooks/useAddAdvisor';
import FormGenerator from '@/components/UseForm/FormGenerator';
import toast from 'react-hot-toast';
import { Loader2, Scale, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModalProps {
  fields: any;
  index: number;
  setIndex: any;
}

const Index: React.FC<ModalProps> = ({ fields, index, setIndex }) => {
  const { updateAdvisor } = useUpdateAdvisor();
  const {
    getValues: formGetValues,
    trigger,
    setValue: setFiledValue,
    clearErrors,
  } = useFormContext<any>();

  const onFormSubmit = async () => {
    trigger(`LLPAdvisorsMembers.${index}`).then((isValid) => {
      if (isValid) {
        const data = formGetValues();
        const { LLPAdvisorsMembers } = data;
        const values = LLPAdvisorsMembers[index];
        updateAdvisor(values).then((response) => {
          if (response) {
            setFiledValue('LLPAdvisorsMembers', response);
            if (index !== -1) {
              toast.success('Advisor updated successfully');
            } else {
              toast.success('Advisor added successfully');
            }
          }
        });
        setIndex(null);
        clearErrors();
      }
    });
  };

  const getPreviousValues = () => {
    if (index !== null) {
      return fields[index];
    }
    return null;
  };

  const handleOnClose = () => {
    setIndex(null);
    setFiledValue(`LLPAdvisorsMembers.${index}`, getPreviousValues());
    clearErrors();
  };

  const isOpen = index !== null;
  const isUpdate = index !== -1;
  return (
    <Dialog open={!!isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl shadow-xl">
        <DialogHeader className="mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Scale className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {isUpdate ? 'Edit Legal Advisor' : 'Add Legal Advisor'}
              </DialogTitle>
              <p className="text-gray-600">
                {isUpdate 
                  ? 'Update the details for this legal advisor' 
                  : 'Enter the details for the new legal advisor'}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        {/* Information Banner */}
       
        
        <div className="space-y-5 py-2">
          <motion.div 
            className="space-y-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {FormGenerator(formConfig({ index }))}
          </motion.div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={handleOnClose}>
              Cancel
            </Button>
            <Button 
              onClick={onFormSubmit} 
              type="button" 
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm"
            >
              {isUpdate ? 'Update Advisor' : 'Add Advisor'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;