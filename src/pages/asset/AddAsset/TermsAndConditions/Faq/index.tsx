import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { formConfig } from "./formConfig";
import { useFaqApi } from "@/hooks/asset/useFqsApi";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  Plus, 
  MessageSquare, 
  Info, 
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Users,
  Clock,
  Save,
  X,
  Lightbulb
} from "lucide-react";

// Animation variants
const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const headerVariants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const statsVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4 }
  }
};

const dialogVariants = {
  initial: { opacity: 0, scale: 0.9, y: 50 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50,
    transition: { duration: 0.2 }
  }
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: string;
}) => {
  return (
    <motion.div
      variants={statsVariants}
      className={`bg-gradient-to-br from-white to-${color}-50 rounded-xl p-4 border border-${color}-200 shadow-sm hover:shadow-md transition-all duration-300`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <Icon className={`w-5 h-5 text-${color}-600`} />
        </div>
        <div className="flex-1">
          <div className="text-lg font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};
const Faq = memo(() => {
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const { createFaq, updateFaq, deleteFaq } = useFaqApi();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "faqs",
    keyName: "faq_id",
  });
  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleEdit = (item: number) => setIndex(item);
  const handleAdd = () => {
    setIndex(-1);
  };

  const isOpen = index !== null;
  const isEdit = index !== -1;
  const faqCount = fields.length;

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger(`faqs.${index}`);
      if (isValid) {
        const data = formGetValues();
        const values = data.faqs[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateFaq(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          const res = await createFaq({ ...values, assetId: id });
          append({ ...values, _id: res._id });
        }
        setIndex(null);
        clearErrors();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.faqs[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteFaq(values._id);
    }
  };

  const handleDelete = (item: any) => {
    setDeleteIndex(item);
  };

  return (
    <motion.div
      className="flex flex-col w-full space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        className="rounded-xl p-6 border  shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
       
        
        <div className="relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <HelpCircle className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  Frequently  Asked Questions
                </h1>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  Comprehensive Q&A to address investor inquiries and enhance transparency
                </p>
              </div>
            </div>
            
            {/* Add Button */}
            <motion.button
              onClick={handleAdd}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add FAQ</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Quick Stats */}
      {faqCount > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <StatsCard
            icon={MessageSquare}
            label="FAQ Entries"
            value={faqCount}
            color="cyan"
          />
          <StatsCard
            icon={Users}
            label="User Support"
            value={faqCount > 5 ? "Comprehensive" : "Basic"}
            color="blue"
          />
          <StatsCard
            icon={BookOpen}
            label="Knowledge Base"
            value={faqCount > 10 ? "Rich" : faqCount > 5 ? "Moderate" : "Growing"}
            color="indigo"
          />
        </motion.div>
      )}
      
     
      
      {/* Enhanced Content Area */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          <Suspense
            fallback={
              <motion.div
                className="flex flex-col items-center justify-center py-12 space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div
                  className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <div className="text-center">
                  <p className="text-gray-600 font-medium">Loading FAQ Management...</p>
                  <p className="text-sm text-gray-400 mt-1">Preparing question and answer interface</p>
                </div>
              </motion.div>
            }
          >
            <VerticleTable
              items={fields}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              title={`FAQ Management`}
              addButtonText={`Add New FAQ`}
              emptyStateMessage={`No FAQ entries found. Start building your knowledge base by adding frequently asked questions.`}
            />
          </Suspense>
        </div>
      </motion.div>
      
      {/* Enhanced Add/Edit Dialog */}
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <motion.div variants={dialogVariants} initial="initial" animate="animate" exit="exit">
              <DialogContent className="max-w-2xl">
                <DialogHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 -m-6 mb-4 p-6 border-b border-cyan-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                      {isEdit ? (
                        <MessageSquare className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold text-gray-900">
                        {isEdit ? "Edit FAQ Entry" : "Add New FAQ"}
                      </DialogTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {isEdit ? "Update the FAQ question and answer" : "Create a new frequently asked question entry"}
                      </p>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6">
                  {isLoading ? (
                    <motion.div
                      className="flex flex-col items-center justify-center py-8 space-y-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-8 h-8 border-3 border-cyan-500 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="text-center">
                        <p className="text-gray-600 font-medium">
                          {isEdit ? "Updating FAQ entry..." : "Creating FAQ entry..."}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {isEdit ? "Saving your changes" : "Adding to knowledge base"}
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <div className="bg-gray-50 rounded-lg p-4">
                        {FormGenerator(formConfig({ index: index ?? -1 }))}
                      </div>
                      
                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={onOpenChange}
                          className="px-6 hover:bg-gray-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          onClick={onSubmit}
                          className="px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                          disabled={isLoading}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isEdit ? "Update FAQ" : "Add FAQ"}
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
      
      {/* Enhanced Delete Dialog */}
      <AnimatePresence>
        {deleteIndex !== null && (
          <Dialog open={deleteIndex !== null} onOpenChange={() => setDeleteIndex(null)}>
            <motion.div variants={dialogVariants} initial="initial" animate="animate" exit="exit">
              <DialogContent>
                <DialogHeader className="bg-gradient-to-r from-red-50 to-orange-50 -m-6 mb-4 p-6 border-b border-red-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold text-gray-900">
                        Delete FAQ Entry
                      </DialogTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        This action cannot be undone
                      </p>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-red-800 font-medium">
                          Are you sure you want to delete this FAQ entry?
                        </p>
                        <p className="text-red-600 text-sm mt-1">
                          This will permanently remove the question and answer from your knowledge base.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDeleteIndex(null)}
                      className="px-6 hover:bg-gray-50"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleOnDelete}
                      className="px-6 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Delete FAQ
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default Faq;
