import { useState } from "react";
import TableComponent from "@/components/TableComponent";
import {
  EditIcon,
  DownloadIcon,
  DollarSignIcon,
  CoinsIcon,
  CheckCircle,
  CircleAlert,
  Calendar,
  Clock,
  Eye,
  SquarePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

type OrderData = {
  investor?: string;
  amount?: { currency: string; value: number };
  tokens?: number;
  orderDate?: string;
  status?: string;
  transactionId?: string;
  action?: any;
};

const data: OrderData[] = [];
const Order = () => {
  const [filter, setFilter] = useState("all");
  const columns = [
    {
      header: "Investor",
      accessorKey: "investor",
      type: "multipledata",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
        const value = row.getValue("amount");
        const currency = value?.currency || "usd";
        return (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded-full text-2xl text-amber-600">
              {currency === "usd" ? "$" : "₹"}
            </div>{" "}
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      header: "Tokens",
      accessorKey: "tokens",
      icon: <CoinsIcon />,
    },
    {
      header: "Date",
      accessorKey: "orderDate",
      cell: ({ row }: any) => {
        const value = row.original.orderDate;
        return (
          <h1 className="flex items-center">
            <Calendar size={13} className="mr-1" />
            {value}
          </h1>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const value = row.original.status;
        const badgeClass = clsx(
          "text-xs font-medium px-2 py-1 rounded-full bg-white shadow-none ",
          {
            "text-white bg-black": value === "Completed",
            " text-black border bg-white/60 border-gray-200":
              value === "Pending",
            " text-black border bg-gray-200 border-gray-200":
              value === "Processing",
          }
        );
        const Icon =
          value === "Completed"
            ? CheckCircle
            : value === "Pending"
            ? CircleAlert
            : Clock;
        return (
          <Badge className={badgeClass}>
            <Icon size={13} className="mr-1" />
            {value}
          </Badge>
        );
      },
    },
    {
      header: "Transaction ID",
      accessorKey: "transactionId",
    },
    {
      header: "Action",
      accessorKey: "action",
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
  const actions = [
    {
      label: "Edit",
      icon: <EditIcon />,
      onClick: () => {},
    },
  ];
  const filteredData = data.filter((item) => {
    if (filter === "all") return true;
    return item.status === filter;
  });
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4 w-full">
        <Input
          placeholder="Search"
          type="search"
          className="flex-1 shadow-none"
        />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          <DownloadIcon /> Export Orders
        </Button>
      </div>
      <TableComponent columns={columns} data={filteredData} />
    </div>
  );
};

export default Order;
