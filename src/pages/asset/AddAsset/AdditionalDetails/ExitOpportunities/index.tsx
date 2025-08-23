import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { useParams } from "react-router-dom";
import { formConfig } from "./fomrConfig";
import { useExitOpportunity } from "@/hooks/asset/useExitOpportunity";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Plus, 
  TrendingUp, 
  DoorOpen, 
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2,
  Briefcase,
  FileText,
  Save,
  X,
  Calendar
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
const ExitOpportunity = memo(() => {
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const {
    createExitOpportunity,
    updateExitOpportunity,
    deleteExitOpportunity,
  } = useExitOpportunity();

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "exitOpportunities",
    keyName: "exitOpportunity_id",
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
  const opportunitiesCount = fields.length;

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
      const isValid = await trigger(`exitOpportunities.${index}`);
      if (isValid) {
        const data = formGetValues();
        const values = data.exitOpportunities[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateExitOpportunity(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          const res = await createExitOpportunity({ ...values, assetId: id });
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
    const values = data.exitOpportunities[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteExitOpportunity(values._id);
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
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-indigo-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <Target className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Exit Opportunities
                </h1>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  Define exit strategies and liquidity options for investors
                </p>
              </div>
            </div>
            
            {/* Add Button */}
            <motion.button
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add Opportunity</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Quick Stats */}
      {opportunitiesCount > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <StatsCard
            icon={DoorOpen}
            label="Exit Strategies"
            value={opportunitiesCount}
            color="blue"
          />
          <StatsCard
            icon={ArrowUpRight}
            label="Liquidity Options"
            value={opportunitiesCount > 0 ? 'Available' : 'None'}
            color="indigo"
          />
          <StatsCard
            icon={Calendar}
            label="Planning Status"
            value={opportunitiesCount > 0 ? 'Active' : 'Pending'}
            color="purple"
          />
        </motion.div>
      )}

      {/* Content */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
      >
        <Suspense fallback={
          <div className="flex items-center justify-center p-12">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-gray-600 font-medium">Loading exit opportunities...</span>
            </div>
          </div>
        }>
          <div className="p-6">
            <VerticleTable
              items={fields}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              title={`Exit Opportunities`}
              addButtonText={`Add Exit Opportunity`}
              emptyStateMessage={`No Exit Opportunities found`}
            />
          </div>
        </Suspense>
      </motion.div>

      {/* Enhanced Add/Edit Dialog */}
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
              <motion.div
                variants={dialogVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <DialogTitle className="text-lg font-bold text-gray-800">
                      {isEdit ? "Edit" : "Add"} Exit Opportunity
                    </DialogTitle>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {isEdit ? "Update exit strategy details" : "Add a new exit opportunity with name and detailed description"}
                  </p>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="space-y-4">
                    {FormGenerator(formConfig({ index: index ?? -1 }))}
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={onOpenChange}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={onSubmit}
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      {isLoading ? (
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {isLoading ? 'Saving...' : 'Save Opportunity'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Enhanced Delete Dialog */}
      <AnimatePresence>
        {deleteIndex !== null && (
          <Dialog
            open={deleteIndex !== null}
            onOpenChange={() => setDeleteIndex(null)}
          >
            <DialogContent className="max-w-md">
              <motion.div
                variants={dialogVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <DialogTitle className="text-lg font-bold text-gray-800">
                      Delete Exit Opportunity
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-gray-700">
                      Are you sure you want to delete this Exit Opportunity? This action cannot be undone.
                    </p>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDeleteIndex(null)}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                    <Button 
                      type="button" 
                      onClick={handleOnDelete}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Delete Opportunity
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

export default ExitOpportunity;
