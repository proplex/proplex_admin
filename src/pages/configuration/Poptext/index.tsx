import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from 'lucide-react';

import TableComponent from "@/components/TableComponent";
import PopTextDialog from "./PopTextDialog";
function PopupTextSection() {

  const [selectedType, setSelectedType] = useState<string>("");
  const [localPopupTexts, setLocalPopupTexts] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);


  const columns = [
    {
      header: 'Type',
      accessorKey: 'type',
    },
    {
      header: 'Subtitle',
      accessorKey: 'subtitle',
    },
    {
      header: 'Description',
      accessorKey: 'description',
    },
    {
      header: 'Actions',
      accessorKey: 'action',
    },
  ]
  const data = [
    {
      type: 'Type1',
      subtitle: 'hello',
      description: 'hello',
    },
    {
      type: 'Type1',
      subtitle: 'hello',
      description: 'hello',
    },
    {
      type: 'Type1',
      subtitle: 'hello',
      description: 'hello',
    },

  ]

  const action = [
    {
      header: 'Edit',
      accessorKey: 'edit',
      icon: <Edit />,
      onClick: () => {
        console.log('Edit');
      },
    },
    {
      header: 'Delete',
      accessorKey: 'delete',
      icon: <Trash2 />,
      onClick: () => {
        console.log('Delete');
      },
    },
  ]

  return (
    <section className="">
      <div className="flex items-center mb-4 justify-between">
        <h2 className="text-xl font-semibold">Popup Texts</h2>

        <div className="flex items-center gap-4">
          <Select
            value={selectedType}
            onValueChange={(value) => setSelectedType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="absolute z-20 max-h-40 overflow-y-auto border border-gray-300 bg-white shadow-md scrollable-dropdown">
              <SelectItem value="all">All Types</SelectItem>
              {Array.from(new Set(localPopupTexts.map((item) => item.type))).map(
                (type, index) => (
                  <SelectItem key={index} value={type}>
                    {type}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          <PopTextDialog open={open} setOpen={setOpen} />
          <Button
            className="bg-black text-white"
            onClick={() => setOpen(true)}
          >
            <span className="mr-2">+</span> Add New Popup Text
          </Button>
        </div>
      </div>
      <div className="rounded-lg border bg-white overflow-x-auto">
        <TableComponent columns={columns} data={data} />
      </div>

    </section>
  );
}

export default PopupTextSection;

