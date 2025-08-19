import { useState } from "react";
import { Button } from "../../../../../../components/ui/button";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useTenant } from "@/hooks/asset/useTenant";
import { useAssetApi } from "@/hooks/asset/useAssetApi";
import TenantTable from "./TenantTable";
import AddEditTenantDialog from "./AddEditTenantDialog";
import DeleteTenantDialog from "./DeleteTenantDialog";
import { formConfig } from "./formConfig";
import { useWatch } from "react-hook-form";

const TenantManagement = () => {
  const { createTenant, updateTenant, deleteTenant } = useTenant();
  const { getAsset } = useAssetApi();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    clearErrors,
    reset,
    trigger,
  } = useFormContext();

  const { fields, append, update, remove } = useFieldArray({
    control: control,
    name: "tenants",
    keyName: "tenant_id",
  });

  const [index, setIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const logo = useWatch({
    control,
    name: `tenants.${index}.logo`,
  });


  const handleAdd = () => {
    setIndex(-1);
  };

  const action = [
    {
      header: "Edit",
      accessorKey: "edit",
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field: any) => field.tenant_id === item.tenant_id
        );
        setIndex(findIndex);
      },
    },
    {
      header: "Delete",
      accessorKey: "delete",
      onClick: (item: any) => {
        const findIndex = fields.findIndex(
          (field: any) => field.tenant_id === item.tenant_id
        );
        setDeleteIndex(findIndex);
      },
    },
  ];

  const onSubmit = async () => {
    trigger(`tenants.${index}`).then(async (isValid: boolean) => {
      if (isValid) {
        const data = formGetValues();
        const tenantData = data.tenants[index ?? -1];
        const values = {
          ...tenantData,
          status: tenantData.status === true ? "active" : "inactive", 
        };
        if (isEdit) {
          if (index !== null) {
            await updateTenant(values._id, { ...values });
          }
          update(index ?? -1, { ...values });
        } else {
          const data = {
            name: values.name,
            value: values.value,
            isPercentage: values.isPercentage ? values.isPercentage : false,
            status: values.status ? values.status : false,
            annualRentEscalation: values.annualRentEscalation ?? 0,
            type: values.type ?? "",
            startDate: values.startDate ?? new Date(),
            endDate: values.endDate ?? new Date(),
            otherRequiredField1: values.otherRequiredField1 ?? "",
            otherRequiredField2: values.otherRequiredField2 ?? "",
            lockInPeriod: values.lockInPeriod ?? 0,
            leasePeriod: values.leasePeriod ?? "",
            securityDeposit: values.securityDeposit ?? 0,
            interestOnSecurityDeposit: values.interestOnSecurityDeposit ?? 0,
            additionalField1: values.additionalField1 ?? "",
            additionalField2: values.additionalField2 ?? "",
            agreement: values.agreement ?? "",
            logo: values.logo ?? "",
            sftsAllocated: values.sftsAllocated ?? 0,
            rentPerSft: values.rentPerSft ?? 0,
          };
          await createTenant({ ...data, assetId: id ?? "" }).then((res) => {
            append({ ...data, _id: res._id });
          });
        }
        if (id) {
          await getAsset(id).then((res) => {
            if (res) {
              reset(res);
            }
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
    const values = data.tenants[deleteIndex ?? -1];
    if (deleteIndex !== null) {
      remove(deleteIndex);
      await deleteTenant(values._id);
    }
  };

  const columns = [
    {
      header: "Tenant Name",
      accessorKey: "name",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: false,
      size: 100,
    },
    {
      header: "Lease Period",
      accessorKey: "leasePeriod",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Tenant Type",
      accessorKey: "type",
      enableResize: true,
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      size: 100,
    },
    {
      header: "Security Deposit",
      accessorKey: "securityDeposit",
      cell: (info: { getValue: () => any }) => info.getValue() || "N/A",
      enableResize: true,
      size: 100,
    },
    {
      header: "Action",
      accessorKey: "action",
      enableResize: false,
      size: 100,
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      <div className="flex justify-between items-center  ">
        <h1 className="text-lg font-bold text-gray-800">Tenant Management</h1>
        <Button
          type="button"
          className=" text-white px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
          onClick={handleAdd}
        >
          <span className="text-lg">+</span>
          <span>Add Tenant</span>
        </Button>
      </div>
      <div className="space-y-2 mt-4">
        <TenantTable
          columns={columns}
          data={fields}
          onEdit={action[0].onClick}
          onDelete={action[1].onClick}
        />
      </div>
      <AddEditTenantDialog
        isOpen={isOpen}
        isEdit={isEdit}
        index={index ?? -1}
        onSubmit={onSubmit}
        onCancel={onOpenChange}
      />
      <DeleteTenantDialog
        isOpen={deleteIndex !== null}
        onConfirm={handleOnDelete}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
};

export default TenantManagement;
