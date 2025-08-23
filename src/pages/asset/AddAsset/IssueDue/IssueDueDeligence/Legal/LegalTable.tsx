import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../../../../../components/ui/button";
import TableComponent from "../../../../../../components/TableComponent";
import { Edit, TrashIcon, ExternalLink, FileText, Calendar, MapPin } from "lucide-react";

interface LegalField {
  legal_id: string;
  name?: string;
  location?: string;
  link?: string;
  logoUrl?: string;
  createdAt?: string;
  type?: string;
}

interface LegalTableProps {
  fields: LegalField[];
  setIndex: (index: number | null) => void;
  setDeleteIndex: (index: number | null) => void;
}

// Enhanced Action Buttons Component
const ActionButtons = ({ 
  index, 
  setIndex, 
  setDeleteIndex 
}: { 
  index: number; 
  setIndex: (index: number | null) => void; 
  setDeleteIndex: (index: number | null) => void; 
}) => {
  return (
    <div className="flex gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIndex(index)}
          className="h-8 w-8 p-0 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
        >
          <Edit className="w-3.5 h-3.5 text-blue-600" />
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDeleteIndex(index)}
          className="h-8 w-8 p-0 border-red-200 hover:border-red-300 hover:bg-red-50"
        >
          <TrashIcon className="w-3.5 h-3.5 text-red-600" />
        </Button>
      </motion.div>
    </div>
  );
};

// Enhanced Link Component
const DocumentLink = ({ link }: { link: string }) => {
  if (!link) return <span className="text-gray-400 text-sm">No link</span>;
  
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
      whileHover={{ scale: 1.02 }}
    >
      <ExternalLink className="w-3 h-3" />
      View Document
    </motion.a>
  );
};

// Enhanced Logo Component
const DocumentLogo = ({ logoUrl, name }: { logoUrl?: string; name?: string }) => {
  if (!logoUrl) {
    return (
      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
        <FileText className="w-6 h-6 text-gray-400" />
      </div>
    );
  }
  
  return (
    <motion.div 
      className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={logoUrl} 
        alt={name || "Document logo"} 
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="w-full h-full bg-gray-100 flex items-center justify-center hidden">
        <FileText className="w-6 h-6 text-gray-400" />
      </div>
    </motion.div>
  );
};

// Enhanced Name Component
const DocumentName = ({ name, type }: { name?: string; type?: string }) => {
  return (
    <div className="flex flex-col">
      <span className="font-medium text-gray-900 text-sm">
        {name || "Untitled Document"}
      </span>
      {type && (
        <span className="text-xs text-gray-500 mt-1">
          {type}
        </span>
      )}
    </div>
  );
};

// Enhanced Location Component
const DocumentLocation = ({ location }: { location?: string }) => {
  if (!location) return <span className="text-gray-400 text-sm">No location</span>;
  
  return (
    <div className="flex items-center gap-1 text-gray-600 text-sm">
      <MapPin className="w-3 h-3" />
      <span>{location}</span>
    </div>
  );
};

export const LegalTable: React.FC<LegalTableProps> = ({ fields, setIndex, setDeleteIndex }) => {
  const columns = [
    {
      header: "Document",
      accessorKey: "name",
      cell: (info: any) => {
        const row = info.row.original;
        return (
          <div className="flex items-center gap-3 py-2">
            <DocumentLogo logoUrl={row.logoUrl} name={row.name} />
            <DocumentName name={row.name} type={row.type} />
          </div>
        );
      },
      enableResize: true,
      size: 200,
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (info: any) => (
        <DocumentLocation location={info.getValue()} />
      ),
      enableResize: true,
      size: 150,
    },
    {
      header: "Document Link",
      accessorKey: "link",
      cell: (info: any) => (
        <DocumentLink link={info.getValue()} />
      ),
      enableResize: true,
      size: 150,
    },
    {
      header: "Date Added",
      accessorKey: "createdAt",
      cell: (info: any) => {
        const date = info.getValue();
        if (!date) return <span className="text-gray-400 text-sm">Unknown</span>;
        
        return (
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Calendar className="w-3 h-3" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
        );
      },
      enableResize: true,
      size: 120,
    },
    {
      header: "Actions",
      accessorKey: "action",
      cell: (info: any) => {
        const findIndex = fields.findIndex((field) => field.legal_id === info.row.original.legal_id);
        return (
          <ActionButtons 
            index={findIndex}
            setIndex={setIndex}
            setDeleteIndex={setDeleteIndex}
          />
        );
      },
      enableResize: false,
      size: 100,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      <TableComponent 
        columns={columns} 
        data={fields}
      />
    </motion.div>
  );
};
