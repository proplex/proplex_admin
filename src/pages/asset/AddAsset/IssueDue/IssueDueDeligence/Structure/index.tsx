import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StructureTable } from "./StructureTable";
import { formConfig } from "./formConfig";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useStructure } from "@/hooks/asset/useStructure";
import StructureDialog from "./StructureDialog";
import DeleteStructureDialog from "./DeleteStructureDialog";
import StructureHeader from "./StructureHeader";
import { 
  Building, 
  FileText, 
  Plus, 
  BarChart3,
  Shield,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle
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

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color, trend }: { 
  icon: any; 
  label: string; 
  value: string | number; 
  color: string;
  trend?: 'up' | 'down' | 'neutral';
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
        {trend === 'up' && (
          <TrendingUp className="w-4 h-4 text-emerald-500" />
        )}
      </div>
    </motion.div>
  );
};

// Empty State Component
const EmptyState = ({ onAdd }: { onAdd: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-xl p-12 text-center border-2 border-dashed border-gray-300"
    >
      <motion.div
        className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Building className="w-8 h-8 text-gray-400" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Structure Reports Yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Add structural analysis reports, engineering assessments, and architectural documentation to provide comprehensive asset structure insights.
      </p>
      <motion.button
        onClick={onAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-4 h-4" />
        Add First Report
      </motion.button>
    </motion.div>
  );
};

const Index = () => {
  const { createStructure, updateStructure, deleteStructure } = useStructure();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.structure",
    keyName: "structure_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = index !== null;
  const isEdit = index !== -1;
  const reportsCount = fields.length;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger(`dueDiligence.structure.${index}`);
      if (isValid) {
        const data = formGetValues();
        const values = data.dueDiligence.structure[index ?? -1];
        if (isEdit) {
          await updateStructure(values._id, { ...values });
          update(index ?? -1, { ...values });
        } else {
          const res = await createStructure({ ...values, assetId: id });
          append({ ...values, _id: res._id });
        }
        setIndex(null);
        clearErrors();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.dueDiligence.structure[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteStructure(values._id);
    }
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
        className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100 shadow-sm"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Building className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Asset Structure Analysis
              </h1>
              <p className="text-gray-600 text-sm font-medium mt-1">
                Engineering reports, structural assessments, and architectural documentation
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.div
              variants={statsVariants}
              className="text-right"
            >
              <div className="text-lg font-bold text-blue-600">{reportsCount}</div>
              <div className="text-xs text-gray-500">Reports</div>
            </motion.div>
            
            <motion.button
              onClick={handleAdd}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add Report</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Quick Stats */}
      {reportsCount > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <StatsCard
            icon={Building}
            label="Structure Reports"
            value={reportsCount}
            color="blue"
            trend="up"
          />
          <StatsCard
            icon={BarChart3}
            label="Analysis Status"
            value="Current"
            color="cyan"
          />
          <StatsCard
            icon={Shield}
            label="Compliance"
            value="Verified"
            color="emerald"
          />
        </motion.div>
      )}

      {/* Content Area */}
      <motion.div
        variants={contentVariants}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {reportsCount === 0 ? (
            <EmptyState onAdd={handleAdd} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <StructureTable
                fields={fields}
                setIndex={setIndex}
                setDeleteIndex={setDeleteIndex}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Enhanced Dialogs */}
      <AnimatePresence>
        {isOpen && (
          <StructureDialog
            isOpen={isOpen}
            isEdit={isEdit}
            index={index}
            formConfig={formConfig}
            onSubmit={onSubmit}
            onOpenChange={onOpenChange}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {deleteIndex !== null && (
          <DeleteStructureDialog
            deleteIndex={deleteIndex}
            onCancel={() => setDeleteIndex(null)}
            onDelete={handleOnDelete}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
