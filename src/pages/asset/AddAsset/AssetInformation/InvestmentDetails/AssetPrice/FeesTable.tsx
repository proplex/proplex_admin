import { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useFee } from "@/hooks/asset/useFee";
import { Plus, EditIcon, TrashIcon } from "lucide-react";
import TableComponent from '@/components/TableComponent';
import { Switch } from '@/components/ui/switch';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogHeader } from '@/components/ui/CustomDialog';
import FormGenerator from '@/components/UseForm/FormGenerator';
import { FormFieldConfig } from '@/components/UseForm/ControllerMap';

interface FeeItem {
  fr_id: string;
  _id?: string;
  name: string;
  value: number;
  isPercentage: boolean | string;
  status: boolean;
  type: 'registration' | 'legal' | 'platform' | 'brokerage';
}

type FeeFormValues = {
  fees: {
    registration: FeeItem[];
    legal: FeeItem[];
    platform: FeeItem[];
    brokerage: FeeItem[];
  };
  totalNumberOfSfts?: number;
  pricePerSft?: number;
};

const FeeDialog = ({ 
  isOpen, 
  isEdit,
  index,
  feeData,
  onCancel,
  onSubmit
}: { 
  isOpen: boolean; 
  isEdit: boolean;
  index: number | null;
  feeData: any;
  onCancel: () => void;
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    name: feeData?.name || '',
    value: feeData?.value || 0,
    isPercentage: feeData?.isPercentage || false,
    type: feeData?.type || 'registration'
  });

  // Reset form data when feeData changes
  useEffect(() => {
    setFormData({
      name: feeData?.name || '',
      value: feeData?.value || 0,
      isPercentage: feeData?.isPercentage || false,
      type: feeData?.type || 'registration'
    });
  }, [feeData]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const feeTypes = [
    { label: 'Registration', value: 'registration' },
    { label: 'Legal', value: 'legal' },
    { label: 'Platform', value: 'platform' },
    { label: 'Brokerage', value: 'brokerage' }
  ];

  const handleSubmit = () => {
    // Validate form
    if (!formData.name.trim()) {
      toast.error('Fee name is required');
      return;
    }
    if (formData.value < 0) {
      toast.error('Value must be positive');
      return;
    }
    if (formData.isPercentage && formData.value > 100) {
      toast.error('Percentage cannot exceed 100%');
      return;
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {isEdit ? 'Edit' : 'Add'} Fee
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fee Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter fee name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Value<span className="text-red-500">*</span></label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Enter fee value"
                value={formData.value}
                onChange={(e) => handleChange('value', parseFloat(e.target.value) || 0)}
                min="0"
                max={formData.isPercentage ? "100" : undefined}
              />
              {formData.isPercentage && formData.value > 100 && (
                <p className="text-sm text-red-500">Percentage cannot exceed 100%</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Is Percentage</label>
              <Switch
                checked={formData.isPercentage}
                onCheckedChange={(e) => handleChange('isPercentage', e)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fee Type<span className="text-red-500">*</span></label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                {feeTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 px-6"
            >
              {isEdit ? 'Update' : 'Add'} Fee
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const DeleteFeeDialog = ({ isOpen, onDelete, onCancel }: { isOpen: boolean; onDelete: () => void; onCancel: () => void; }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-bold p-2">Delete Fee</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to delete this Fee?</p>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={onDelete}>
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FeesTable = () => {
  const { createFee, updateFee, deleteFee } = useFee();
  const { id = null } = useParams<{ id?: string }>();
  const {
    control,
    getValues: formGetValues,
    setValue,
    clearErrors,
    trigger,
  } = useFormContext<FeeFormValues>();

  // Create a combined field array of all fee types
  const [allFees, setAllFees] = useState<FeeItem[]>([]);
  const [editingFee, setEditingFee] = useState<FeeItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Get field arrays for each fee type
  const { fields: registrationFields } = useFieldArray({
    control,
    name: "fees.registration"
  });
  
  const { fields: legalFields } = useFieldArray({
    control,
    name: "fees.legal"
  });
  
  const { fields: platformFields } = useFieldArray({
    control,
    name: "fees.platform"
  });
  
  const { fields: brokerageFields } = useFieldArray({
    control,
    name: "fees.brokerage"
  });

  // Update all fees when form values change
  const updateAllFees = () => {
    const registrationFees = formGetValues("fees.registration") || [];
    const legalFees = formGetValues("fees.legal") || [];
    const platformFees = formGetValues("fees.platform") || [];
    const brokerageFees = formGetValues("fees.brokerage") || [];

    const fees = [
      ...registrationFees.map((fee, index) => ({ ...fee, type: 'registration' as const, fr_id: fee.fr_id || `reg-${index}-${Date.now()}` })),
      ...legalFees.map((fee, index) => ({ ...fee, type: 'legal' as const, fr_id: fee.fr_id || `leg-${index}-${Date.now()}` })),
      ...platformFees.map((fee, index) => ({ ...fee, type: 'platform' as const, fr_id: fee.fr_id || `plat-${index}-${Date.now()}` })),
      ...brokerageFees.map((fee, index) => ({ ...fee, type: 'brokerage' as const, fr_id: fee.fr_id || `brok-${index}-${Date.now()}` }))
    ];

    setAllFees(fees);
  };

  // Initialize fees using useEffect
  useEffect(() => {
    updateAllFees();
  }, [registrationFields.length, legalFields.length, platformFields.length, brokerageFields.length]);

  const handleAddFee = () => {
    // Open add fee dialog with a new empty fee
    const newFee: FeeItem = {
      fr_id: `temp-${Date.now()}`,
      name: '',
      value: 0,
      isPercentage: false,
      status: true,
      type: 'registration'
    };
    
    setEditingFee(newFee);
    setEditingIndex(-1); // -1 indicates we're adding a new fee
  };

  const handleEditFee = (fee: FeeItem, index: number) => {
    setEditingFee(fee);
    setEditingIndex(index);
  };

  const handleDeleteFee = (index: number) => {
    setDeleteIndex(index);
  };

  const handleDeleteConfirm = async () => {
    if (deleteIndex === null || !allFees[deleteIndex]) return;
    
    const fee = allFees[deleteIndex];
    
    // Delete from backend if it has an ID
    if (fee._id && !fee._id.startsWith('temp-')) {
      try {
        await deleteFee(fee._id);
      } catch (error) {
        console.error('Error deleting fee:', error);
        toast.error('Failed to delete fee');
        return;
      }
    }
    
    // Remove from appropriate form array
    const type = fee.type;
    let typeArray: FeeItem[] = [];
    
    switch (type) {
      case 'registration':
        typeArray = formGetValues("fees.registration") || [];
        break;
      case 'legal':
        typeArray = formGetValues("fees.legal") || [];
        break;
      case 'platform':
        typeArray = formGetValues("fees.platform") || [];
        break;
      case 'brokerage':
        typeArray = formGetValues("fees.brokerage") || [];
        break;
    }
    
    const typeIndex = typeArray.findIndex(f => f.fr_id === fee.fr_id);
    
    if (typeIndex !== -1) {
      const newArray = [...typeArray];
      newArray.splice(typeIndex, 1);
      
      switch (type) {
        case 'registration':
          setValue("fees.registration", newArray);
          break;
        case 'legal':
          setValue("fees.legal", newArray);
          break;
        case 'platform':
          setValue("fees.platform", newArray);
          break;
        case 'brokerage':
          setValue("fees.brokerage", newArray);
          break;
      }
    }
    
    // Update all fees
    updateAllFees();
    setDeleteIndex(null);
  };

  const handleFeeSubmit = async (data: any) => {
    if (editingIndex === null || !editingFee) return;
    
    const isEdit = editingIndex !== -1;
    const fee = {
      ...editingFee,
      name: data.name,
      value: data.value,
      isPercentage: data.isPercentage,
      type: data.type as 'registration' | 'legal' | 'platform' | 'brokerage',
      status: true
    };
    
    try {
      if (!isEdit || !fee._id || fee._id.startsWith('temp-')) {
        // Create new fee
        const response = await createFee({
          name: fee.name,
          value: fee.value,
          assetId: id ?? "",
          type: fee.type,
          isPercentage: String(fee.isPercentage),
          status: fee.status
        });
        
        // Add to appropriate form array
        const type = fee.type;
        let typeArray: FeeItem[] = [];
        
        switch (type) {
          case 'registration':
            typeArray = formGetValues("fees.registration") || [];
            break;
          case 'legal':
            typeArray = formGetValues("fees.legal") || [];
            break;
          case 'platform':
            typeArray = formGetValues("fees.platform") || [];
            break;
          case 'brokerage':
            typeArray = formGetValues("fees.brokerage") || [];
            break;
        }
        
        const newFee = {
          ...fee,
          _id: response._id,
          fr_id: response._id
        };
        
        switch (type) {
          case 'registration':
            setValue("fees.registration", [...typeArray, newFee]);
            break;
          case 'legal':
            setValue("fees.legal", [...typeArray, newFee]);
            break;
          case 'platform':
            setValue("fees.platform", [...typeArray, newFee]);
            break;
          case 'brokerage':
            setValue("fees.brokerage", [...typeArray, newFee]);
            break;
        }
      } else {
        // Update existing fee
        if (fee._id) {
          await updateFee(fee._id, {
            name: fee.name,
            value: fee.value,
            type: fee.type,
            isPercentage: String(fee.isPercentage),
            status: fee.status
          });
        }
        
        // Update in appropriate form array
        const oldType = editingFee.type;
        const newType = fee.type;
        
        if (oldType === newType) {
          // Same type, just update
          let typeArray: FeeItem[] = [];
          
          switch (oldType) {
            case 'registration':
              typeArray = formGetValues("fees.registration") || [];
              break;
            case 'legal':
              typeArray = formGetValues("fees.legal") || [];
              break;
            case 'platform':
              typeArray = formGetValues("fees.platform") || [];
              break;
            case 'brokerage':
              typeArray = formGetValues("fees.brokerage") || [];
              break;
          }
          
          const typeIndex = typeArray.findIndex(f => f.fr_id === fee.fr_id);
          
          if (typeIndex !== -1) {
            const newArray = [...typeArray];
            newArray[typeIndex] = fee;
            
            switch (oldType) {
              case 'registration':
                setValue("fees.registration", newArray);
                break;
              case 'legal':
                setValue("fees.legal", newArray);
                break;
              case 'platform':
                setValue("fees.platform", newArray);
                break;
              case 'brokerage':
                setValue("fees.brokerage", newArray);
                break;
            }
          }
        } else {
          // Type changed, remove from old array and add to new array
          // Remove from old type array
          let oldTypeArray: FeeItem[] = [];
          
          switch (oldType) {
            case 'registration':
              oldTypeArray = formGetValues("fees.registration") || [];
              break;
            case 'legal':
              oldTypeArray = formGetValues("fees.legal") || [];
              break;
            case 'platform':
              oldTypeArray = formGetValues("fees.platform") || [];
              break;
            case 'brokerage':
              oldTypeArray = formGetValues("fees.brokerage") || [];
              break;
          }
          
          const oldTypeIndex = oldTypeArray.findIndex(f => f.fr_id === fee.fr_id);
          
          if (oldTypeIndex !== -1) {
            const newOldArray = [...oldTypeArray];
            newOldArray.splice(oldTypeIndex, 1);
            
            switch (oldType) {
              case 'registration':
                setValue("fees.registration", newOldArray);
                break;
              case 'legal':
                setValue("fees.legal", newOldArray);
                break;
              case 'platform':
                setValue("fees.platform", newOldArray);
                break;
              case 'brokerage':
                setValue("fees.brokerage", newOldArray);
                break;
            }
          }
          
          // Add to new type array
          let newTypeArray: FeeItem[] = [];
          
          switch (newType) {
            case 'registration':
              newTypeArray = formGetValues("fees.registration") || [];
              break;
            case 'legal':
              newTypeArray = formGetValues("fees.legal") || [];
              break;
            case 'platform':
              newTypeArray = formGetValues("fees.platform") || [];
              break;
            case 'brokerage':
              newTypeArray = formGetValues("fees.brokerage") || [];
              break;
          }
          
          switch (newType) {
            case 'registration':
              setValue("fees.registration", [...newTypeArray, fee]);
              break;
            case 'legal':
              setValue("fees.legal", [...newTypeArray, fee]);
              break;
            case 'platform':
              setValue("fees.platform", [...newTypeArray, fee]);
              break;
            case 'brokerage':
              setValue("fees.brokerage", [...newTypeArray, fee]);
              break;
          }
        }
      }
      
      // Update all fees
      updateAllFees();
      setEditingFee(null);
      setEditingIndex(null);
    } catch (error) {
      console.error('Error saving fee:', error);
      toast.error('Failed to save fee');
    }
  };

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      size: 100,
      cell: (info: { getValue: () => any }) => info.getValue() || 'N/A',
    },
    {
      header: 'Value',
      accessorKey: 'value',
      size: 100,
      cell: (info: { getValue: () => any; row: { original: { isPercentage: boolean } } }) => {
        const value = info.getValue() ?? 'N/A';
        return info.row.original.isPercentage ? `${value}%` : value;
      },
    },
    {
      header: 'Is Percentage',
      accessorKey: 'isPercentage',
      size: 100,
      cell: ({ row }: { row: { original: FeeItem } }) => {
        return row.original.isPercentage ? 'Yes' : 'No';
      },
    },
    {
      header: 'Type',
      accessorKey: 'type',
      size: 100,
      cell: ({ row }: { row: { original: FeeItem } }) => {
        const type = row.original.type;
        const typeLabels: Record<string, string> = {
          registration: 'Registration',
          legal: 'Legal',
          platform: 'Platform',
          brokerage: 'Brokerage'
        };
        return typeLabels[type] || type;
      },
    },
    {
      header: 'Status',
      accessorKey: 'status',
      size: 100,
      cell: ({ row }: { row: { original: FeeItem } }) => {
        const rowData = row.original;
        return (
          <Switch
            checked={rowData.status}
            onCheckedChange={(e: boolean) => {
              // Update status
              const type = rowData.type;
              let typeArray: FeeItem[] = [];
              
              switch (type) {
                case 'registration':
                  typeArray = formGetValues("fees.registration") || [];
                  break;
                case 'legal':
                  typeArray = formGetValues("fees.legal") || [];
                  break;
                case 'platform':
                  typeArray = formGetValues("fees.platform") || [];
                  break;
                case 'brokerage':
                  typeArray = formGetValues("fees.brokerage") || [];
                  break;
              }
              
              const typeIndex = typeArray.findIndex(f => f.fr_id === rowData.fr_id);
              
              if (typeIndex !== -1) {
                const newArray = [...typeArray];
                newArray[typeIndex] = { ...newArray[typeIndex], status: e };
                
                switch (type) {
                  case 'registration':
                    setValue("fees.registration", newArray);
                    break;
                  case 'legal':
                    setValue("fees.legal", newArray);
                    break;
                  case 'platform':
                    setValue("fees.platform", newArray);
                    break;
                  case 'brokerage':
                    setValue("fees.brokerage", newArray);
                    break;
                }
                
                updateAllFees();
              }
            }}
            className="cursor-pointer"
          />
        );
      },
    },
    {
      header: 'Action',
      id: 'action',
      size: 100,
      cell: ({ row }: { row: { original: FeeItem } }) => {
        const rowData = row.original;
        return (
          <div className="flex gap-4">
            <EditIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                const index = allFees.findIndex(f => f.fr_id === rowData.fr_id);
                handleEditFee(rowData, index);
              }}
            />
            <TrashIcon
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                const index = allFees.findIndex(f => f.fr_id === rowData.fr_id);
                handleDeleteFee(index);
              }}
            />
          </div>
        );
      },
    },
  ];

  const totalNumberOfSfts = formGetValues("totalNumberOfSfts");
  const pricePerSft = formGetValues("pricePerSft");
  const canAddFee = !!totalNumberOfSfts && !!pricePerSft;

  return (
    <div className="space-y-4">
      {/* Main table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4">
          <TableComponent columns={columns} data={allFees} />
        </div>
      </div>
      
      {/* Add Fee button */}
      <div>
        <Button
          type='button'
          variant='secondary'
          onClick={handleAddFee}
          disabled={!canAddFee}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Fee</span>
        </Button>
      </div>
      
      {/* Fee Dialog */}
      {editingFee && (
        <FeeDialog
          isOpen={!!editingFee}
          isEdit={editingIndex !== -1}
          index={editingIndex}
          feeData={editingFee}
          onCancel={() => {
            setEditingFee(null);
            setEditingIndex(null);
          }}
          onSubmit={handleFeeSubmit}
        />
      )}
      
      {/* Delete Dialog */}
      <DeleteFeeDialog
        isOpen={deleteIndex !== null}
        onDelete={handleDeleteConfirm}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
};

export default FeesTable;