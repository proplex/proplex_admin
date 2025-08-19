

import { Button } from '@/components/ui/button';
import TableComponent from '@/components/TableComponent';
import { Pencil, Trash } from 'lucide-react';
import AddFeeDialog from './AddFeeDialog';
import { useState } from 'react';
function Fee() {
  const [open, setOpen] = useState(false);

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Asset Type',
      accessorKey: 'assetType',
    },
    {
      header: 'Open Plot%',
      accessorKey: 'openPlotPercentage',
    },
    {
      header: 'Commercial%',
      accessorKey: 'commercialPercentage',
    },
    {
      header: 'Residential%',
      accessorKey: 'residentialPercentage',
    },
    {
      header: 'Holiday Home%',
      accessorKey: 'holidayHomePercentage',
    },
    {
      header: 'Land Parcel%',
      accessorKey: 'landParcelPercentage',
    },
    {
      header: 'Agriculture Land%',
      accessorKey: 'agricultureLandPercentage',
    },
    {
      header: 'Type',
      accessorKey: 'type',
    },
    {
      header: 'Status',
      accessorKey: 'status',
    },
    {
      header: 'Actions',
      accessorKey: 'action',
    },
  ];

  const data = [
    {
      name: 'Employee',
      assetType: 'home',
      openPlotPercentage: '10',
      commercialPercentage: '20',
      residentialPercentage: '30',
      holidayHomePercentage: '40',
      landParcelPercentage: '50',
      agricultureLandPercentage: '60',
      type: 'Buy',
      status: 'Active',
    },
  ];

  const actions = [
    {
      header: 'Edit',
      accessorKey: 'edit',
      onClick: () => {},
      icon: <Pencil />,
    },
    {
      header: 'Delete',
      accessorKey: 'delete',
      onClick: () => {},
      icon: <Trash />,
    },
  ];

  return (
    <div className='container mx-auto p-6'>
      <div className='flex justify-between items-center'>
        <h1>Fee Percentage </h1>
        <AddFeeDialog open={open} setOpen={setOpen} />
        <Button onClick={() => setOpen(true)}>Add Fee Percentage</Button>
      </div>
      <div className='rounded-lg border mt-4 bg-white shadow'>
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Fee;
