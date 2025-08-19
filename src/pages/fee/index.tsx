

import React, { useState, useMemo, useCallback } from 'react';
import TableComponent from '@/components/TableComponent';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ASSET_CATEGORY,
  ASSET_CLASS,
  AssetCategory,
  AssetClass,
  FEE_TYPE,
  FeeType,
} from '@/config/constants';
import { FEE_COLUMNS } from '@/config/table/fee';
import { Pencil, Trash } from 'lucide-react';

// Type definitions
interface FeeData {
  id: number;
  assetClass: string;
  assetCategory: string;
  feeType: string;
  name: string;
  value: number;
  isPercentage: boolean;
  status: boolean;
}

interface SelectOption {
  label: string;
  value: string;
}

// Initial data
const initialData: FeeData[] = [
  {
    id: 1,
    assetClass: AssetClass.REAL_ESTATE,
    assetCategory: AssetCategory.COMMERCIAL,
    feeType: FeeType.REGISTRATION,
    name: 'Registration Fee',
    value: 1000000,
    isPercentage: true,
    status: true,
  },
];

// Component
const FeeManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssetClass, setSelectedAssetClass] = useState<AssetClass>(
    AssetClass.REAL_ESTATE
  );
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory>(
    AssetCategory.COMMERCIAL
  );
  const [selectedFeeType, setSelectedFeeType] = useState<FeeType>(
    FeeType.REGISTRATION
  );
  const [tableData] = useState<FeeData[]>(initialData);

  // Memoized category options based on selected asset class
  const categoryOptions = useMemo<SelectOption[]>(() => {
    return (
      ASSET_CATEGORY[selectedAssetClass as keyof typeof ASSET_CATEGORY] || []
    );
  }, [selectedAssetClass]);

  // Memoized fee type options based on selected asset class
  const feeTypeOptions = useMemo<SelectOption[]>(() => {
    return FEE_TYPE[selectedAssetClass as keyof typeof FEE_TYPE] || [];
  }, [selectedAssetClass]);

  // Handlers
  const handleAssetClassChange = useCallback((value: string) => {
    const newAssetClass = value as AssetClass;
    setSelectedAssetClass(newAssetClass);
    // Reset category when asset class changes
    const newCategories =
      ASSET_CATEGORY[newAssetClass as keyof typeof ASSET_CATEGORY] || [];
    setSelectedCategory(newCategories[0]?.value as AssetCategory);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value as AssetCategory);
  }, []);

  const handleFeeTypeChange = useCallback((value: string) => {
    setSelectedFeeType(value as FeeType);
  }, []);

  const handleEdit = useCallback((row: FeeData) => {
    // Implement edit logic here
  }, []);

  const handleDelete = useCallback((row: FeeData) => {
    // Implement delete logic here
  }, []);

  // Table actions
  const tableActions = useMemo(
    () => [
      {
        header: 'Edit',
        accessorKey: 'edit',
        type: 'action',
        onClick: handleEdit,
        icon: <Pencil className='h-4 w-4' />,
      },
      {
        header: 'Delete',
        accessorKey: 'delete',
        type: 'action',
        onClick: handleDelete,
        icon: <Trash className='h-4 w-4' />,
      },
    ],
    [handleEdit, handleDelete]
  );

  return (
    <div className='w-full p-6 space-y-2'>
      <header className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-gray-900'>Fee Management</h1>
        <div className='flex items-center gap-2'>
          <Select
            value={selectedAssetClass}
            onValueChange={handleAssetClassChange}
          >
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Select Asset Class' />
            </SelectTrigger>
            <SelectContent>
              {ASSET_CLASS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Select Category' />
            </SelectTrigger>
            <SelectContent>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFeeType} onValueChange={handleFeeTypeChange}>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Select Fee Type' />
            </SelectTrigger>
            <SelectContent>
              {feeTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => setIsModalOpen(true)} className='bg-black'>
            Add Fee
          </Button>
        </div>
      </header>

      <TableComponent
        columns={FEE_COLUMNS()}
        data={tableData}
      />
    </div>
  );
};

export default FeeManagement;
