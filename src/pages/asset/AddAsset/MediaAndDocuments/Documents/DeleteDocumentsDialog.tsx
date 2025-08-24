import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle, X } from 'lucide-react';

interface DeleteDocumentsDialogProps {
  deleteIndex: number | null;
  onCancel: () => void;
  onDelete: () => void;
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
      duration: 0.4,
      ease: "easeOut" as const
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

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { 
    scale: 1, 
    rotate: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.4
    }
  }
};

const DeleteDocumentsDialog: React.FC<DeleteDocumentsDialogProps> = ({
  deleteIndex,
  onCancel,
  onDelete,
}) => {
  return (
    <AnimatePresence>
      {deleteIndex !== null && (
        <Dialog open={deleteIndex !== null} onOpenChange={onCancel}>
          <DialogContent className="max-w-md">
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Enhanced Header with Warning Icon */}
              <motion.div variants={contentVariants}>
                <DialogHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <motion.div
                      variants={iconVariants}
                      className="relative"
                    >
                      {/* Pulsing background */}
                      <motion.div
                        className="absolute inset-0 bg-red-100 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                      
                      {/* Warning icon */}
                      <div className="relative p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full shadow-lg">
                        <AlertTriangle className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Small delete icon */}
                      <motion.div
                        className="absolute -bottom-1 -right-1 p-1 bg-red-700 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.3 }}
                      >
                        <Trash2 className="w-3 h-3 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  <DialogTitle className='text-xl font-bold text-gray-900 mb-2'>
                    Delete Document
                  </DialogTitle>
                </DialogHeader>
              </motion.div>

              {/* Enhanced Content */}
              <motion.div 
                variants={contentVariants}
                className='space-y-6'
              >
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                  <p className="text-gray-700 text-center leading-relaxed">
                    Are you sure you want to delete this document? 
                    <span className="block mt-2 text-sm text-red-600 font-medium">
                      This action cannot be undone.
                    </span>
                  </p>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className='flex justify-center gap-4'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type='button'
                      variant='outline'
                      onClick={onCancel}
                      className="px-6 py-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      type='button' 
                      onClick={onDelete}
                      className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Document
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default DeleteDocumentsDialog;
