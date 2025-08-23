import React from "react";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import TableComponent from "@/components/TableComponent";
import { Edit3, Trash2, FileText, Shield, Eye } from 'lucide-react';

interface DocumentsTableProps {
  fields: any[];
  setIndex: (index: number) => void;
  setDeleteIndex: (index: number) => void;
  update: (index: number, value: any) => void;
}

// Animation variants
const tableVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const rowVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  fields,
  setIndex,
  setDeleteIndex,
  update,
}) => {
  const columns = [
    { 
      header: "Document", 
      accessorKey: "name",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">{rowData.name}</div>
              <div className="text-sm text-gray-500">{rowData.type?.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}</div>
            </div>
          </motion.div>
        );
      }
    },
    { 
      header: "Description", 
      accessorKey: "description",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="max-w-xs">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
              {rowData.description}
            </p>
          </div>
        );
      }
    },
    {
      header: "Protection",
      accessorKey: "isProtected",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Switch
              checked={rowData.isProtected}
              onCheckedChange={(e) =>
                update(row.index, { ...rowData, isProtected: e })
              }
            />
            <div className="flex items-center gap-1">
              <Shield className={`w-4 h-4 ${
                rowData.isProtected ? 'text-green-600' : 'text-gray-400'
              }`} />
              <span className={`text-xs font-medium ${
                rowData.isProtected ? 'text-green-700' : 'text-gray-500'
              }`}>
                {rowData.isProtected ? 'Protected' : 'Public'}
              </span>
            </div>
          </motion.div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "isActive",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Switch
              checked={rowData.isActive}
              onCheckedChange={(e) =>
                update(row.index, { ...rowData, isActive: e })
              }
            />
            <div className="flex items-center gap-1">
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  rowData.isActive ? 'bg-green-500' : 'bg-gray-400'
                }`}
                animate={rowData.isActive ? {
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
              <span className={`text-xs font-medium ${
                rowData.isActive ? 'text-green-700' : 'text-gray-500'
              }`}>
                {rowData.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </motion.div>
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const findIndex = fields.findIndex(
                    (field) => field.document_id === rowData.document_id
                  );
                  setIndex(findIndex);
                }}
                className="h-8 px-3 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const findIndex = fields.findIndex(
                    (field) => field.document_id === rowData.document_id
                  );
                  setDeleteIndex(findIndex);
                }}
                className="h-8 px-3 hover:bg-red-50 hover:border-red-300 text-red-600 hover:text-red-700 transition-all duration-200 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span className="hidden sm:inline">Delete</span>
              </Button>
            </motion.div>
          </motion.div>
        );
      },
      size: 400,
      maxSize: 400,
    },
  ];

  return (
    <motion.div
      variants={tableVariants}
      initial="initial"
      animate="animate"
    >
      <TableComponent 
        columns={columns} 
        data={fields} 
        model="document" 
      />
    </motion.div>
  );
};

export default DocumentsTable;
