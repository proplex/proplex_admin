import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAssetDocument } from "@/hooks/asset/useAssetDocument";
import formConfig from "./formConfig";
import DocumentsDialog from "./DocumentsDialog";
import DeleteDocumentsDialog from "./DeleteDocumentsDialog";
import DocumentsHeader from "./DocumentsHeader";
import DocumentsTable from "./DocumentsTable";
import { FileText, Plus, Upload } from 'lucide-react';

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

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const tableVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, delay: 0.2 }
  }
};

const Index = () => {
  const { createDocument, updateDocument, deleteDocument } = useAssetDocument();
  const { id } = useParams<{ id: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "documents",
    keyName: "document_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

  const onSubmit = async () => {
    trigger(`documents.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.documents[index ?? -1];
        if (isEdit) {
          if (index !== null) {
            await updateDocument(values._id, {
              ...values,
            });
          }
          update(index ?? -1, { ...values });
        } else {
          await createDocument({ ...values, assetId: id }).then((res) => {
            append({ ...values, _id: res._id });
          });
        }
        setIndex(null);
        clearErrors();
      }
    });
  };

  const isOpen = index !== null;
  const isEdit = index !== -1;

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
    const values = data.documents[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      await deleteDocument(values._id);
      remove(deleteIndex);
    }
  };

  return (
    <motion.div 
      className="w-full space-y-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl p-6 border"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Asset Documents</h2>
              <p className="text-gray-600 mt-1">Manage important documents for your asset</p>
            </div>
          </div>
          
          <motion.button
            onClick={handleAdd}
            className="flex items-center gap-2 px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl bg-white  text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Plus className="w-5 h-5" />
            <span>Add  Document</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Table Container */}
      <motion.div 
        variants={tableVariants}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-6">
          <AnimatePresence mode="wait">
            {fields.length > 0 ? (
              <motion.div
                key="table-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DocumentsTable
                  fields={fields}
                  setIndex={setIndex}
                  setDeleteIndex={setDeleteIndex}
                  update={update}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Upload className="w-10 h-10 text-gray-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Documents Added</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  Start by adding your first document. You can upload pitch decks, legal documents, valuation reports, and more.
                </p>
                <motion.button
                  onClick={handleAdd}
                  className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:border-gray-400 shadow-sm  shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Document</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Enhanced Dialogs */}
      <AnimatePresence>
        {isOpen && (
          <DocumentsDialog
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
          <DeleteDocumentsDialog
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
