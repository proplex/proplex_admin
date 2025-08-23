import { useState } from "react";
import { EditIcon, TrashIcon, Plus, Settings } from "lucide-react";
import TableComponent from "@/components/TableComponent";
import { formConfig } from "./formConfig";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { DialogHeader } from "@/components/ui/CustomDialog";
import FormGenerator from "@/components/UseForm/FormGenerator";
import { Button } from "@/components/ui/button";
import { useFeature } from "@/hooks/asset/useFeature";
import { Switch } from "@/components/ui/switch";
import { getFeaturesForCategory } from '../categoryAmenitiesFeatures';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TenantManagement = () => {
  const { createFeature, updateFeature, deleteFeature } = useFeature();
  const { id } = useParams<{ id: string }>();
  const {
    watch,
    control,
    getValues: formGetValues,
    clearErrors,
    trigger,
  } = useFormContext();

  // Watch for category changes to show relevant features
  const category = watch('category');
  const suggestedFeatures = category ? getFeaturesForCategory(category) : [];

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "features",
    keyName: "features_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setIndex(-1);
  };

  const handleQuickAdd = async (feature: any) => {
    const data = {
      name: feature.label,
      description: feature.description || `${feature.label} - Premium feature`,
      status: true,
      image: "https://picsum.photos/200/300",
    };
    
    if (id) {
      await createFeature({ ...data, assetId: id }).then((res) => {
        append({ ...data, _id: res._id });
      });
    } else {
      append(data);
    }
  };
  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      icon: <EditIcon />,
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field) => field.features_id === item.features_id
        );
        setIndex(findIndex);
      },
    },
    {
      header: "Delete",
      accessorKey: "delete",
      icon: <TrashIcon />,
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field) => field.features_id === item.features_id
        );
        setDeleteIndex(findIndex);
      },
    },
  ];

  const onSubmit = async () => {
    trigger(`features.${index}`).then(async (isValid) => {
      if (isValid) {
        const data = formGetValues();
        const values = data.features[index ?? -1];

        if (isEdit) {
          if (index !== null) {
            const { name, description, image, status } = values;
            await updateFeature(values._id, {
              name,
              description,
              image,
              status,
            });
          }
          update(index ?? -1, { ...values });
        } else {
          const payload = {
            name: values.name,
            description: values.description,
            image: values.image || "https://picsum.photos/200/300",
            status: values.status,
          };
          await createFeature({ ...payload, assetId: id }).then((res) => {
            append({ ...payload, _id: res._id });
          });
        }

        setIndex(null);
        clearErrors();
      }
    });
  };

  const isOpen = index !== null;
  const isEdit = index !== -1;

  const onOpenChange = () => {
    const previousValues = index !== null ? fields[index] : {};
    if (index !== null) {
      update(index, previousValues);
    }
    setIndex(null);
  };

  const handleOnDelete = async () => {
    setDeleteIndex(null);
    const data = formGetValues();
    const values = data.features[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      await deleteFeature(values._id);
      remove(deleteIndex);
    }
  };

  const columns = [
    {
      header: "Image",
      accessorKey: "image",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <img
            src={rowData.image}
            alt={rowData.name}
            className="w-16 h-16 rounded-md"
          />
        );
      },
    },

    {
      header: "Feature",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <Switch
            checked={rowData.status}
            onCheckedChange={(e) =>
              update(row.index, { ...rowData, status: e })
            }
          />
        );
      },
    },
    {
      header: "Actions",
      accessorKey: "action",

      cell: ({ row }: any) => {
        const rowData = row.original;
        return (
          <div className="flex gap-2">
            {action.map((item) => (
              <Button
                key={item.header}
                type="button"
                variant="outline"
                onClick={() => item.onClick(rowData)}
              >
                {item.icon}
              </Button>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-800">Features</h1>
        <Button
          type="button"
          className="text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Feature</span>
        </Button>
      </div>

      {/* Suggested Features for Category */}
      {suggestedFeatures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-base'>
              <Settings className='w-5 h-5 text-purple-500' />
              Suggested Features for This Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {suggestedFeatures.map((feature) => {
                const alreadyAdded = fields.some(
                  (field: any) => field.name?.toLowerCase() === feature.label.toLowerCase()
                );
                
                return (
                  <div
                    key={feature.id}
                    className={`p-3 border rounded-lg transition-all duration-200 ${
                      alreadyAdded
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200 hover:bg-purple-50 hover:border-purple-300 cursor-pointer'
                    }`}
                    onClick={() => !alreadyAdded && handleQuickAdd(feature)}
                  >
                    <div className='flex items-center justify-between'>
                      <div className='flex-1'>
                        <h3 className='font-medium text-sm text-gray-900'>
                          {feature.label}
                        </h3>
                        {feature.description && (
                          <p className='text-xs text-gray-600 mt-1'>
                            {feature.description}
                          </p>
                        )}
                      </div>
                      <div className='ml-2'>
                        {alreadyAdded ? (
                          <Badge variant='secondary' className='text-xs bg-green-100 text-green-700'>
                            Added
                          </Badge>
                        ) : (
                          <Plus className='w-4 h-4 text-gray-400' />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
      <div className="space-y-2 mt-2">
        <TableComponent columns={columns} data={fields} model="feature" />
      </div>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>{isEdit ? "Edit" : "Add"} Feature</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4">
              {FormGenerator(formConfig(index ?? -1))}
            </div>
            <DialogFooter className="flex justify-end w-full mt-4">
              <Button type="button" variant="outline" onClick={onOpenChange}>
                Cancel
              </Button>
              <Button type="button" onClick={onSubmit}>
                Submit
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={deleteIndex !== null}
        onOpenChange={() => setDeleteIndex(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-lg font-bold p-2">
              Delete Feature
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this Feature?</p>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteIndex(null)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleOnDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TenantManagement;
