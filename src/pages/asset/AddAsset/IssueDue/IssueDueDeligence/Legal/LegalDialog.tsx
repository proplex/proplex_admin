import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../components/ui/dialog";
import FormGenerator from "../../../../../../components/UseForm/FormGenerator";
import { formConfig } from "./formConfig";
import { Scale, Loader2, Save, X, FileText } from "lucide-react";

interface LegalDialogProps {
  isOpen: boolean;
  isEdit: boolean;
  index: number | null;
  onSubmit: () => void;
  onOpenChange: () => void;
  isLoading?: boolean;
}

// Animation variants
const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const contentVariants = {
  initial: { opacity: 0, scale: 0.9, y: 50 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50,
    transition: {
      duration: 0.3
    }
  }
};

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay: 0.2,
      staggerChildren: 0.1
    }
  }
};

export const LegalDialog: React.FC<LegalDialogProps> = ({
  isOpen,
  isEdit,
  index,
  onSubmit,
  onOpenChange,
  isLoading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="w-[600px] max-w-4xl max-h-[90vh] overflow-hidden">
            <motion.div
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col h-full"
            >
              {/* Enhanced Header */}
              <DialogHeader className="border-b border-gray-100 pb-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Scale className="w-5 h-5 text-indigo-600" />
                  </motion.div>
                  <div>
                    <DialogTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      {isEdit ? "Edit Legal Document" : "Add Legal Document"}
                    </DialogTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {isEdit 
                        ? "Update the legal document information" 
                        : "Add a new legal document to your portfolio"
                      }
                    </p>
                  </div>
                </div>
              </DialogHeader>

              {/* Form Content */}
              <motion.div 
                className="flex-1 overflow-y-auto py-6"
                variants={formVariants}
                initial="initial"
                animate="animate"
              >
                <div className="space-y-6">
                  {/* Form Fields */}
                  <motion.div 
                    className="grid grid-cols-1 gap-6"
                    variants={formVariants}
                  >
                    {FormGenerator(formConfig(index ?? -1))}
                  </motion.div>
                  
                  {/* Additional Information */}
                  <motion.div
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Document Guidelines
                        </h4>
                        <p className="text-sm text-blue-700">
                          Ensure all legal documents are properly signed, dated, and contain necessary compliance information. Upload high-quality scans or PDFs for best results.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Footer */}
              <DialogFooter className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <motion.div
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {isEdit ? "Last updated: Today" : "New document"}
                </motion.div>
                
                <div className="flex gap-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onOpenChange}
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      type="button" 
                      onClick={onSubmit}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white flex items-center gap-2 min-w-[120px] justify-center"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {isEdit ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          {isEdit ? "Update" : "Add Document"}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
