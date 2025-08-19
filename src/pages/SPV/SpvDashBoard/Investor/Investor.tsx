import React from "react";
import { ColumnProps } from "@/types/company";
import TableComponent from "@/components/TableComponent";
import { data } from "./data";
import {
  EditIcon,
  DownloadIcon,
  UserPlusIcon,
  DollarSignIcon,
  CoinsIcon,
  Calendar,
  Eye,
  SquarePen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ceil } from "lodash";
const Investor = () => {
  const columns = [
    {
      header: "Investor",
      accessorKey: "investor",
      cell: ({ row }: any) => {
        const investor = row.original.investor;
        return (
          <div className="flex flex-col items-start  gap-2">
            {/* {investor?.image && (
              <img
                src={investor.image}
                alt={investor.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )} */}

            <p className="font-medium">{investor?.name}</p>
            <p className="text-sm text-muted-foreground">{investor?.email}</p>

            <Badge className="bg-white shadow-none border text-black border-gray-300 rounded-lg ">
              {investor?.type}
            </Badge>
          </div>
        );
      },
    },
    {
      header: "Investment",
      accessorKey: "investment",
      cell: ({ row }: { row: { getValue: (key: string) => any } }) => {
        const value = row.getValue("investment");
        const currency = value?.currency || "USD";
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
      cell: ({ row }: any) => {
        const tokens = row.original.tokens;
        return (
          <div className="flex items-center gap-2">
            <CoinsIcon className="w-4 h-4 text-yellow-500" />
            <span>{tokens}</span>
          </div>
        );
      },
    },
    {
      header: "OwnerShip %",
      accessorKey: "ownershipPercentage",
      cell: ({ row }: any) => {
        const value = row.original.ownershipPercentage;
        return (
          <div className="">
            <h1>{value}%</h1>
            <Progress className="h-1 w-[70%] mt-2" value={value} />
          </div>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const value = row.original.status;
        return <Badge className="rounded-lg">{value}</Badge>;
      },
    },
    {
      header: "Join Date",
      accessorKey: "joinDate",
      cell: ({ row }: any) => {
        const value = row.original.joinDate;
        return (
          <h1 className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {value}
          </h1>
        );
      },
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
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4 w-full">
        <Input
          placeholder="Search"
          type="search"
          className="flex-1 shadow-none"
        />
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2">
          {" "}
          <DownloadIcon /> Export
        </Button>
        <Button className="gap-2" variant="default">
          {" "}
          <UserPlusIcon /> Add Investor
        </Button>
      </div>
      <TableComponent columns={columns} data={data} />
    </div>
  );
};

export default Investor;
