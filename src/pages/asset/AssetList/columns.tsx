import { Copy, Edit, Eye } from "lucide-react";
import { handleCopy } from "@/helpers/global";
import { ColumnDef } from "@tanstack/react-table";

interface Asset {
  _id: string;
  name: string;
  logo?: string;
  location: string;
  class: string;
  category: string;
  stage: string;
  status: 'Active' | 'Inactive' | 'Pending';
  value: string;
  roi: string;
  lastUpdated: string;
  [key: string]: any;
}

const getColumns = (setAsset: (asset: Asset | null) => void): ColumnDef<Asset>[] => [
  {
    header: "ID",
    accessorKey: "_id",
    cell: (info) => {
      const id = info.getValue() as string;
      return (
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => handleCopy(id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy ID"
          >
            <Copy size={14} />
          </button>
          <span className="text-sm font-mono text-gray-700">
            {id.split('_').pop()}
          </span>
        </div>
      );
    },
    size: 120
  },
  {
    header: "Asset",
    accessorKey: "name",
    cell: (info) => {
      const name = info.getValue() as string;
      const logo = info.row.original?.logo;
      const location = info.row.original?.location as string;
      const fallbackLogo = "https://placehold.co/40/3b82f6/white?text=" + (name || '').charAt(0);

      return (
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden">
            <img
              src={logo || fallbackLogo}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackLogo;
              }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
            <p className="text-xs text-gray-500 truncate">{location}</p>
          </div>
        </div>
      );
    },
    size: 250
  },
  {
    header: "Class",
    accessorKey: "class",
    cell: (info) => {
      const value = info.getValue() as string;
      return (
        <span className="text-sm text-gray-700">
          {value}
        </span>
      );
    },
    size: 100,
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: (info) => {
      const value = info.getValue() as string;
      return (
        <span className="text-sm text-gray-700">
          {value}
        </span>
      );
    },
    size: 120,
  },
  {
    header: "Stage",
    accessorKey: "stage",
    cell: (info) => {
      const stage = info.getValue() as string;
      const stageMap: Record<string, { color: string; bg: string }> = {
        'Fully Rented': { color: 'text-green-800', bg: 'bg-green-100' },
        'Under Construction': { color: 'text-blue-800', bg: 'bg-blue-100' },
        'Pre-Construction': { color: 'text-yellow-800', bg: 'bg-yellow-100' },
        'Stabilized': { color: 'text-purple-800', bg: 'bg-purple-100' },
        'Value-Add': { color: 'text-orange-800', bg: 'bg-orange-100' },
      };
      
      const { color, bg } = stageMap[stage] || { color: 'text-gray-800', bg: 'bg-gray-100' };
      
      return (
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${color} ${bg}`}>
          {stage}
        </span>
      );
    },
    size: 140,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      const status = info.getValue() as string;
      const isActive = status === 'Active';
      return (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
          <span className="text-sm text-gray-700">{status}</span>
        </div>
      );
    },
    size: 100
  },
  {
    header: "Value",
    accessorKey: "value",
    cell: (info) => {
      const value = info.getValue() as string;
      return <span className="font-medium text-gray-900">{value}</span>;
    },
    size: 120,
  },
  {
    header: "ROI",
    accessorKey: "roi",
    cell: (info) => {
      const roi = info.getValue() as string;
      const isPositive = !roi.startsWith('-');
      return (
        <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {roi}
        </span>
      );
    },
    size: 100,
  },
  {
    header: "Last Updated",
    accessorKey: "lastUpdated",
    cell: (info) => {
      const date = new Date(info.getValue() as string);
      return (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">
            {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
          <span className="text-xs text-gray-500">
            {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      );
    },
    size: 120,
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const asset = row.original;
      return (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAsset(asset)}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
            title="View details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => console.log('Edit', asset._id)}
            className="p-2 text-gray-500 hover:text-green-600 transition-colors"
            title="Edit asset"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      );
    },
    size: 100
  }
];

export default getColumns;
