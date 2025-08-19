export const FEE_COLUMNS = () => {
  return [
    {
      header: 'ID',
      accessorKey: 'id',
      type: 'number' as const, // Specify exact type literal
    },
    {
      header: 'Asset Class',
      accessorKey: 'assetClass',
      type: 'string' as const,
    },
    {
      header: 'Asset Category',
      accessorKey: 'assetCategory',
      type: 'string' as const,
    },
    {
      header: 'Fee Type',
      accessorKey: 'feeType',
      type: 'string' as const,
    },
    {
      header: 'Name',
      accessorKey: 'name',
      type: 'string' as const,
    },
    {
      header: 'Value',
      accessorKey: 'value',
      type: 'number' as const,
    },
    {
      header: 'Is Percentage',
      accessorKey: 'isPercentage',
      type: 'switch' as const,
      // onChange is optional in the interface, so we can omit it or add it
    },
    {
      header: 'Status',
      accessorKey: 'status',
      type: 'switch' as const,
      onChange: (value: any, row: any) => {
        console.log(value, row);
        // Add your status change logic here
      },
    },
    {
      header: 'Actions',
      accessorKey: 'action',
      type: 'action' as const,
    },
  ];
};