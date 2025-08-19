import TableComponent from "@/components/TableComponent";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { CheckCircle, Eye, SquarePen, X } from "lucide-react";
const columns: any = [
  {
    accessorKey: "id",
    header: "ID",
    type: "string",
  },
  {
    accessorKey: "title",
    header: "Title",
    type: "string",
  },
  {
    accessorKey: "proposer",
    header: "Proposer",
    type: "string",
  },
  {
    accessorKey: "status",
    header: "Status",
    type: "string",
    cell: ({ row }: any) => {
      const value = row.original.status;
      const badgeClass = clsx("text-xs font-medium px-2 py-1 rounded-full", {
        "bg-green-100 text-green-800": value === "Passed",
        "bg-red-100 text-red-800": value === "Rejected",
      });
      const Icon = value === "Passed" ? CheckCircle : X;
      return (
        <Badge className={badgeClass}>
          <Icon size={13} className="mr-1" />
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: "timeReamaining",
    header: "Time Remaining",
    type: "string",
  },
  {
    accessorKey: "action",
    header: "Action",
    type: "action",
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

const Past = () => {
  const data: {
    id: string;
    title: string;
    proposer: string;
    timeReamaining: string;
    status: string;
  }[] = [
    {
      id: "1",
      title: "Proposa 1",
      proposer: "0x1234567890abcdef",
      timeReamaining: "2 days",
      status: "Rejected",
    },
  ];
  return <TableComponent columns={columns} data={data} />;
};
export default Past;
