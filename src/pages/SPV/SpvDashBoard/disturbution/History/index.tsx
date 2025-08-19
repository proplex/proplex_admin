import TableComponent from "@/components/TableComponent";
import { Input } from "@/components/ui/input";
import { Download, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
const index = () => {

  const columns= [
    {
      header: "Distribution Id",
      accessorKey: "distributionId",
    },
    {
      header: "Date",
      accessorKey: "date",
      type: "date",
    },
    {
      header: "Amount",
      accessorKey: "amount",
      type: "number",
    },
    {
      header: "Investor",
      accessorKey: "investor",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
   
  ];

  const distributionData = [
    {
      distributionId: "DIST-001",
      date: "2023-06-15",
      amount: 50000,
      investor: "John Smith",
      status: "Completed",
      action: "View Details",
    },
    {
      distributionId: "DIST-002",
      date: "2023-05-22",
      amount: 75000,
      investor: "Jane Doe",
      status: "Pending",
      action: "View Details",
    },
    {
      distributionId: "DIST-003",
      date: "2023-04-10",
      amount: 100000,
      investor: "Acme Investments",
      status: "Processing",
      action: "View Details",
    },
  ];
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold"> Distribution History</h1>
          <p className="text-sm text-gray-500">
            View the history of distributions for your portfolio
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search" type="search" />
          <Button variant="outline" className="p-2">
            <Save />
          </Button>
        </div>
      </div>
      <div className="mt-5">
        <TableComponent columns={columns} data={distributionData} />
      </div>
    </div>
  );
};

export default index;
