import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { Button } from '@/components/ui/button';
import { FileText, Plus, Edit3, Save, X } from 'lucide-react';

interface DocumentsDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index?: number | null;
  formConfig: (args: { index: number }) => any;
  onSubmit: () => void;
  onOpenChange: () => void;
}

// Animation variants
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { delay: 0.1, duration: 0.3 }
  }
};

const contentVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delay: 0.2, 
      duration: 0.4,
      staggerChildren: 0.1
    }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

const DocumentsDialog: React.FC<DocumentsDialogProps> = ({
  isOpen,
  isEdit,
  index,
  formConfig,
  onSubmit,
  onOpenChange,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className='w-full max-w-3xl max-h-[90vh] overflow-hidden'>
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              {/* Enhanced Header */}
              <motion.div variants={headerVariants}>
                <DialogHeader className="pb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-3 rounded-xl shadow-lg ${
                        isEdit 
                          ? 'bg-gradient-to-br from-orange-500 to-red-600' 
                          : 'bg-gradient-to-br from-blue-500 to-purple-600'
                      }`}
                      whileHover={{ scale: 1.05, rotate: isEdit ? -5 : 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isEdit ? (
                        <Edit3 className="w-6 h-6 text-white" />
                      ) : (
                        <Plus className="w-6 h-6 text-white" />
                      )}
                    </motion.div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-gray-900">
                        {isEdit ? 'Edit Document' : 'Add New Document'}
                      </DialogTitle>
                      <p className="text-gray-600 mt-1">
                        {isEdit 
                          ? 'Update the document information below' 
                          : 'Fill in the details for your new document'
                        }
                      </p>
                    </div>
                  </div>
                </DialogHeader>
              </motion.div>

              {/* Enhanced Content */}
              <motion.div 
                variants={contentVariants}
                className="max-h-[60vh] overflow-y-auto px-1"
              >
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                  <motion.div 
                    className="grid gap-6"
                    variants={contentVariants}
                  >
                    {formConfig({ index: index ?? -1 }).map((field: any, fieldIndex: number) => (
                      <motion.div
                        key={fieldIndex}
                        variants={fieldVariants}
                        className="bg-white rounded-xl p-4 shadow-sm border border-white/50"
                      >
                        {FormGenerator([field])}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <DialogFooter className='flex justify-end gap-3 pt-6 border-t border-gray-100'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type='button' 
                      variant='outline' 
                      onClick={onOpenChange}
                      className="px-6 py-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type='button' 
                      onClick={onSubmit}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isEdit ? 'Update Document' : 'Add Document'}
                    </Button>
                  </motion.div>
                </DialogFooter>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default DocumentsDialog;
