import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../../../../../../components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useLegal } from "@/hooks/asset/useLegal";
import { LegalDialog } from "./LegalDialog";
import { DeleteDialog } from "./DeleteDialog";
import { LegalTable } from "./LegalTable";
import { 
  Scale, 
  FileText, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  FileCheck,
  Clock,
  Shield
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

// Enhanced Header Component
const LegalHeader = ({ onAdd, documentsCount }: { onAdd: () => void; documentsCount: number }) => {
  return (
    <motion.div
      variants={headerVariants}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 shadow-sm"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Scale className="w-6 h-6 text-white" />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Legal Documentation
            </h1>
            <p className="text-gray-600 text-sm font-medium mt-1">
              Manage legal documents and compliance materials
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div
            variants={statsVariants}
            className="text-right"
          >
            <div className="text-lg font-bold text-indigo-600">{documentsCount}</div>
            <div className="text-xs text-gray-500">Documents</div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              onClick={onAdd}
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add Document</span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
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
        <FileText className="w-8 h-8 text-gray-400" />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No Legal Documents Yet
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Start building your legal documentation portfolio by adding contracts, agreements, and compliance documents.
      </p>
      <Button
        onClick={onAdd}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add First Document
      </Button>
    </motion.div>
  );
};

const Index = () => {
  const { createLegal, updateLegal, deleteLegal } = useLegal();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "dueDiligence.legal",
    keyName: "legal_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = index !== null;
  const isEdit = index !== -1;
  const documentsCount = fields.length;

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const isValid = await trigger(`dueDiligence.legal.${index}`);
      if (isValid) {
        const data = formGetValues();
        const values = data.dueDiligence.legal[index ?? -1];
        if (isEdit) {
          await updateLegal(values._id, { ...values });
          update(index ?? -1, { ...values });
        } else {
          const res = await createLegal({ ...values, assetId: id });
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
    const values = data.dueDiligence.legal[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteLegal(values._id);
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
      <LegalHeader onAdd={handleAdd} documentsCount={documentsCount} />
      
      {/* Quick Stats */}
      {documentsCount > 0 && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
        >
          <StatsCard
            icon={FileCheck}
            label="Total Documents"
            value={documentsCount}
            color="indigo"
            trend="up"
          />
          <StatsCard
            icon={Clock}
            label="Recent Activity"
            value="Today"
            color="purple"
          />
          <StatsCard
            icon={Shield}
            label="Compliance"
            value="Up to Date"
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
          {documentsCount === 0 ? (
            <EmptyState onAdd={handleAdd} />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6"
            >
              <LegalTable
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
          <LegalDialog
            isOpen={isOpen}
            isEdit={isEdit}
            index={index}
            onSubmit={onSubmit}
            onOpenChange={onOpenChange}
            isLoading={isLoading}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {deleteIndex !== null && (
          <DeleteDialog
            isOpen={deleteIndex !== null}
            onConfirm={handleOnDelete}
            onCancel={() => setDeleteIndex(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Index;
