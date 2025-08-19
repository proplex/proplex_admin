import { useState } from "react";

import { Button } from "@/components/ui/button";
import TableComponent from "@/components/TableComponent";
import { Pencil, Trash, Plus } from "lucide-react";
import AddSettingDialog from "./AddSettingDialog";
function Setting() {
  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: "NAME",
      accessorKey: "name",
    },
    {
      header: "VALUE",
      accessorKey: "value",
    },
    {
      header: "ACTIONS",
      accessorKey: "action",
    },
  ];

  const data = [
    {
      name: "Employee",
      value: "e",
    },
    {
      name: "mangaer",
      value: "20",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end items-center">
        <AddSettingDialog open={open} setOpen={setOpen} />
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-5 w-5" /> Add Setting
        </Button>
      </div>
      <div className="rounded-lg border mt-4 bg-white shadow">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Setting;
