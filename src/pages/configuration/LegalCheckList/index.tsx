import React from "react";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/TableComponent";
import { Edit } from "lucide-react";
const index = () => {
  const columns = [
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Total Nos",
      accessorKey: "totalNo",
    },
    {
      header: "Action",
      accessorKey: "action",
    },
  ];
  const data = [
    {
      type: "Type 1",
      totalNo: 10,
    },
    {
      type: "Type 2",
      totalNo: 10,
    },
    {
      type: "Type 3",
      totalNo: 10,
    },
  ];
  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      icon: <Edit />,
      onClick: () => {
        console.log("Edit");
      },
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Legal Check List</h1>
        <Button>Add Legal Check List</Button>
      </div>
      <div className="mt-4 max-h-[300px] overflow-y-auto">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
};

export default index;
