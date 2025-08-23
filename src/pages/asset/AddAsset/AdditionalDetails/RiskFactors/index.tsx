import { lazy, Suspense, memo, useState } from "react";
const VerticleTable = lazy(() => import("@/components/ui/VerticleTable"));
import { useFieldArray, useFormContext } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/CustomDialog";
import { Button } from "@/components/ui/button";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { useParams } from "react-router-dom";
import { formConfig } from "./fomrConfig";
import { useRiskFactorApi } from "@/hooks/asset/useRiskFactorApi";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  Plus, 
  Shield, 
  TrendingDown, 
  CheckCircle2,
  BarChart3,
  Activity,
  Target,
  Save,
  X,
  FileWarning
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
const RiskFactor = memo(() => {
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();
  const { createRiskFactor, updateRiskFactor, deleteRiskFactor } =
    useRiskFactorApi();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "riskFactors",
    keyName: "riskFactors_id",
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
  const riskFactorsCount = fields.length;

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
      const isValid = await trigger(`riskFactors.${index}`);
      if (isValid) {
        const data = formGetValues();
        const values = data.riskFactors[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateRiskFactor(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          const res = await createRiskFactor({ ...values, assetId: id });
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
    const values = data.riskFactors[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteRiskFactor(values._id);
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
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border border-red-100 shadow-sm overflow-hidden relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 w-32 h-32 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-orange-500 rounded-full blur-2xl" />
        </div>
        
        <div className="relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                <AlertTriangle className="w-6 h-6 text-white relative z-10" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  Risk Factors
                </h1>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  Identify and analyze potential investment risks and market factors
                </p>
              </div>
            </div>
            
            {/* Add Button */}
            <motion.button
              onClick={handleAdd}
              className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add Risk Factor</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Quick Stats */}
      {riskFactorsCount > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <StatsCard
            icon={AlertTriangle}
            label="Risk Factors"
            value={riskFactorsCount}
            color="red"
          />
          <StatsCard
            icon={Activity}
            label="Risk Analysis"
            value={riskFactorsCount > 0 ? 'Active' : 'Pending'}
            color="orange"
          />
          <StatsCard
            icon={BarChart3}
            label="Assessment Status"
            value={riskFactorsCount > 0 ? 'Complete' : 'Incomplete'}
            color="yellow"
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
                className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span className="text-gray-600 font-medium">Loading risk factors...</span>
            </div>
          </div>
        }>
          <div className="p-6">
            <VerticleTable
              items={fields}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
              title={`Risk Factors`}
              addButtonText={`Add Risk Factor`}
              emptyStateMessage={`No Risk Factors found`}
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
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <DialogTitle className="text-lg font-bold text-gray-800">
                      {isEdit ? "Edit" : "Add"} Risk Factor
                    </DialogTitle>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {isEdit ? "Update risk factor details" : "Add a new risk factor with name and detailed description"}
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
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
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
                      {isLoading ? 'Saving...' : 'Save Risk Factor'}
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
                      <FileWarning className="w-5 h-5 text-red-600" />
                    </div>
                    <DialogTitle className="text-lg font-bold text-gray-800">
                      Delete Risk Factor
                    </DialogTitle>
                  </div>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-gray-700">
                      Are you sure you want to delete this Risk Factor? This action cannot be undone.
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
                      <FileWarning className="w-4 h-4" />
                      Delete Risk Factor
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

export default RiskFactor;
