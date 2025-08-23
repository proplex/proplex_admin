import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useUpdateDirector } from '@/hooks/useAddBoardMember';
import { useParams } from 'react-router-dom';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { formConfig } from './formConfig';
import toast from 'react-hot-toast';
import { Loader2, User, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModalProps {
  update: any;
  append: any;
  fields: any;
  index: number;
  setIndex: any;
}

const Index: React.FC<ModalProps> = ({
  update,
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
  const { id: companyIdParam } = useParams<{ id: string }>();
  const companyId = companyIdParam ? parseInt(companyIdParam, 10) : undefined;
  const { loading, error, updateDirector } = useUpdateDirector();

  const getPreviousValues = () => {
    if (index !== null) {
      return fields[index];
    }
    return null;
  };

  const onSubmit = () => {
    trigger(`LLPBoardMembers.${index}`).then((isValid) => {
      if (isValid) {
        const data = formGetValues();
        const { LLPBoardMembers } = data;
        const values = LLPBoardMembers[index];
        if (index !== -1) {
          if (companyId !== undefined) {
            updateDirector(companyId, values).then((response: any) => {
              if (response) {
                update(index, values);
                toast.success('Board Member updated successfully');
              }
            });
          }
        } else {
          if (companyId !== undefined) {
            updateDirector(companyId, values).then((response: any) => {
              if (response) {
                append({ ...values, updated_at: new Date().toISOString() });
                toast.success('Board Member added successfully');
              }
            });
          }
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const handleOnClose = () => {
    setIndex(null);
    setFiledValue(`LLPBoardMembers.${index}`, getPreviousValues());
    clearErrors();
  };
  const isOpen = index !== null;
  const isUpdate = index !== -1;

  return (
    <Dialog open={!!isOpen} onOpenChange={(open) => !open && handleOnClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl shadow-xl">
        <DialogHeader className="mb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                {isUpdate ? 'Edit Board Member' : 'Add Board Member'}
              </DialogTitle>
              <p className="text-gray-600">
                {isUpdate 
                  ? 'Update the details for this board member' 
                  : 'Enter the details for the new board member'}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        {/* Information Banner */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-800 mb-1">Important Information</h4>
              <p className="text-sm text-blue-700">
                All board members must be verified and will receive important company notifications.
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
                  {isUpdate ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                isUpdate ? 'Update Member' : 'Add Member'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Index;