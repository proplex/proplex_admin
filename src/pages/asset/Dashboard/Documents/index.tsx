import TableComponent from "@/components/TableComponent";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useTemplateApi } from "@/hooks/useTemplate";
import { Copy, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { formConfig } from "./formConfig";
import { DOCUMENT_SIGN_PROVIDERS } from "@/config/constants";
import { handleCopy } from "@/helpers/global";

const Index = ({ assetOverview }: { assetOverview: any }) => {
  const methods = useForm();
  const { setValue } = methods;
  const { id } = useParams();
  const [document, setDocument] = useState<{
    providerTemplateId?: string;
    templateName?: string;
    provider?: string;
    _id?: string;
  } | null>(null);
  const [deleteDocument, setDeleteDocument] = useState<{
    providerTemplateId?: string;
    templateName?: string;
    provider?: string;
    _id?: string;
  } | null>(null);
  const { createTemplate, updateTemplate, deleteTemplate, templates } =
    useTemplateApi();

  const actions = [
    {
      header: "Edit",
      accessorKey: "edit",
      icon: <Pencil />,
      text: "Edit",
      onClick: (row: any) => {
        setDocument(row);
        setValue("providerTemplateId", row.providerTemplateId);
        setValue("templateName", row.templateName);
        setValue("provider", row.provider);
        setValue("assetId", id);
      },
    },
    {
      header: "Delete",
      accessorKey: "delete",
      icon: <Trash />,
      text: "Delete",
      onClick: (row: any) => {
        debugger;
        setDeleteDocument(row);
      },
    },
  ];

  const columns = [
    {
      header: "Template Id",
      accessorKey: "providerTemplateId",
      size: 40,
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
      header: "Template Name",
      accessorKey: "templateName",
    },
    {
      header: "Provider",
      accessorKey: "provider",
      size: 40,
      cell: ({ getValue }: { getValue: () => string }) => {
        const provider = getValue();
        const value = DOCUMENT_SIGN_PROVIDERS?.find(
          (providerObj: { value: string }) => providerObj.value === provider
        )?.label;
        return <span>{value || provider}</span>;
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      size: 40,
      cell: ({ row }: { row: { original: any } }) => {
        const rowData = row.original;
        return (
          <div className="flex gap-2">
            {actions.map((action) => (
              <Button
                key={action.header}
                variant="outline"
                size="icon"
                type="button"
                onClick={() => action.onClick(rowData)}
              >
                {action.icon}
              </Button>
            ))}
          </div>
        );
      },
    },
  ];

  const onClose = () => {
    setDocument(null);
    methods.reset();
  };

  const onOpen = () => {
    setDocument({});
  };

  const onSubmit = async (data: any) => {
    const payload = {
      assetId: id,
      ...data,
    };
    if (document && document._id) {
      await updateTemplate(document._id, payload);
    } else {
      await createTemplate(payload);
    }
    onClose();
  };

  const isEdit = Boolean(document && document._id);
  const isOpen = Boolean(document);
  const isDeleteOpen = Boolean(deleteDocument);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div />
        <Button onClick={() => onOpen()}>Create Template</Button>
      </div>
      <TableComponent columns={columns} data={templates || []} model="template" />
      <FormProvider {...methods}>
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle className="text-lg font-bold p-2">
                  {isEdit ? "Edit Template" : "Create Template"}
                </DialogTitle>
                <DialogDescription></DialogDescription>
                {FormGenerator(formConfig(methods.control))}
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button>Submit</Button>
                </div>
              </DialogHeader>
            </form>
          </DialogContent>
        </Dialog>
      </FormProvider>
      <Dialog open={isDeleteOpen} onOpenChange={() => setDeleteDocument(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold p-2">
              Delete Template
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template?
            </DialogDescription>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteDocument(null)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={async () => {
                  if (deleteDocument && deleteDocument._id) {
                    await deleteTemplate(deleteDocument._id);
                  }
                  setDeleteDocument(null);
                }}
              >
                Delete
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Index;
