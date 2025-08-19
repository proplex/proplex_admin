import React from "react";
import { Button } from "@/components/ui/button";
import TableComponent from "@/components/TableComponent";
import DialogConfig from "@/config/DialogConfig";
import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { ColumnProps } from "@/types/company";

interface Props {
  header: string;
  data: any[];
  columns: ColumnProps[];
}

const ConfigComponent: React.FC<Props> = ({ header, data, columns }) => {
  const [open, setOpen] = React.useState(false);
  const methods = useForm();
  const control = methods.control;

  const onSubmit = async (formData: any) => {
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{header}</h1>
        <Button
          className="border-0"
          type="button"
          onClick={() => setOpen(true)}
        >
          <span className="text-lg">+</span>
          <span className="ml-2">Add New {header}</span>
        </Button>
      </div>

      <TableComponent data={data} columns={[]} />

      <DialogConfig
        title={`Add ${header}`}
        open={open}
        setOpen={setOpen}
        form={formConfig(control, header)}
        methods={methods}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default ConfigComponent;
