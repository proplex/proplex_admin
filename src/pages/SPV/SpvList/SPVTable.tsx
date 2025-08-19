import React from "react";
import TableComponent from "@/components/TableComponent";
import { Switch } from "@/components/ui/switch";
import { SPV_TYPES } from "@/constants/global";
import { formatCompactNumber, handleCopy } from "@/helpers/global";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { Copy, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SPVTableProps {
  data: any[];
  setSpv: (spv: any) => void;
}

const SPVTable: React.FC<SPVTableProps> = ({ data, setSpv }) => {
  const navigate = useNavigate();
  const columns: ColumnDef<any, any>[] = [
    {
      header: "Spv Id",
      accessorKey: "_id",
      cell: (info: any) => {
        const id = info.getValue();
        return (
          <div className="flex gap-2">
            <Copy
              onClick={() => handleCopy(id)}
              size={4}
              className="text-gray-500 cursor-pointer min-h-4 min-w-4"
            />
            <span className="text-sm truncate">{id}</span>
          </div>
        );
      },
    },
    {
      header: "Name",
      accessorKey: "logo",
      cell: (info: any) => {
        const fallbackLogo =
          "https://andreaslloyd.dk/wp-content/themes/koji/assets/images/default-fallback-image.png";
        const logo = info.getValue() || fallbackLogo;
        const fullName = String(info.row.original?.name ?? "SPV Name");
        return (
          <div
            className="flex items-center gap-2 max-w-[220px]"
            title={fullName}
          >
            <img
              src={logo}
              alt="logo"
              className="w-8 h-8 rounded-full object-cover shrink-0"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackLogo;
              }}
            />
            <span className="truncate text-sm">{fullName}</span>
          </div>
        );
      },
      enableResizing: true,
      size: 150,
      minSize: 100,
      maxSize: 150,
    },
    {
      header: "Type",
      accessorKey: "type",
      enableResizing: true,
      size: 100,
      cell(info: any) {
        const type = info.getValue();
        return (
          <>
            {SPV_TYPES.map((option) => {
              if (option.value === type) {
                return <>{option.label}</>;
              }
              return null;
            })}
          </>
        );
      },
    },
    {
      header: "Total Investors",
      accessorKey: "totalInvestors",
      enableResizing: true,
      size: 100,
      cell: (info: any) => {
        const row = info.getValue();
        const value = formatCompactNumber(row || 0);
        return <span>{value}</span>;
      },
    },
    {
      header: "AUM",
      accessorKey: "aum",
      enableResizing: true,
      size: 100,
      cell: (info: any) => {
        const aum = info.getValue();
        const value = formatCompactNumber(aum || 0);
        return <span>$ {value}</span>;
      },
    },
    {
      header: "Last Activity",
      accessorKey: "updatedAt",
      enableResizing: true,
      size: 100,
      cell: (info: any) => {
        const date = new Date(info.getValue());
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
    {
      header: "Active",
      accessorKey: "status",
      enableResizing: true,
      size: 100,
      maxSize: 100,
      minSize: 100,
      cell: (info: any) => {
        const status = info.getValue();
        const isActive = status === "active";
        return (
          <Switch
            checked={isActive}
            onCheckedChange={() => setSpv(info.row.original)}
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      enableResizing: false,
      size: 80,
      cell: (info: any) => {
        return (
          <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            type="button"
            onClick={() => navigate(`/edit-spv/${info.row.original._id}`)}
          >
            <Edit className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer"
            type="button"
            onClick={() => navigate(`/spv/${info.row.original._id}`)}
          >
            <Eye className="h-5 w-5" />
          </Button>
          </div>
        );
      },
    },
  ];

  return <TableComponent columns={columns} data={data} model="spv" />;
};

export default SPVTable;
