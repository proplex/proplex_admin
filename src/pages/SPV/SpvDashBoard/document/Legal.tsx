import React from "react";
import { ColumnProps } from "@/types/company";
import TableComponent from "@/components/TableComponent";
// import { data } from './data'
import {
  EditIcon,
  DownloadIcon,
  UserPlusIcon,
  DollarSignIcon,
  CoinsIcon,
  Upload,
  SquarePen,
  Eye,
  CheckCircle,
  CircleAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { data } from "./data";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
const Legal = () => {
  const columns = [
    {
      header: "Document",
      accessorKey: "document",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }: any) => {
        const value = row.original.category;

        return (
          <Badge className="rounded-xl bg-white text-black shadow-none border border-gray-300">
            {value}
          </Badge>
        );
      },
    },
    {
      header: "Uploaded By",
      accessorKey: "uploadedBy",
    },

    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Size",
      accessorKey: "size",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const value = row.original.status;
        const badgeClass = clsx(
          "text-xs font-medium px-2 py-1 rounded-full bg-white shadow-none hover:bg-inherit",
          {
            "text-green-600": value === "Approved",
            " text-yellow-600": value === "Pending",
          }
        );
        const Icon = value === "Approved" ? CheckCircle : CircleAlert;

        return (
          <Badge className={badgeClass}>
            {/* {value === "Approved" ? (
              <CheckCircle className="mr-1" size={13} />
            ) : (
              <CircleAlert />
            )} */}
            <Icon className="w-4 h-4 mr-1" />
            {value}
          </Badge>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: any) => {
        const value = row.original.status;

        return (
          <div className="flex items-center gap-2">
            <Eye
              onClick={() => alert("View Clicked")}
              className="cursor-pointer hover:bg-gray-200 rounded-full h-9 w-9 p-2"
            />{" "}
            <SquarePen className="cursor-pointer hover:bg-gray-200 rounded-full h-9 w-9 p-2" />
          </div>
        );
      },
    },
  ];
  const actions = [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: () => {},
    },
  ];
  const filteredData = data.filter((item) => item.category === "Legal");
  return (
    <div className="space-y-4">
      <TableComponent columns={columns} data={filteredData} />
    </div>
  );
};

export default Legal;
