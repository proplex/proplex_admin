import TableComponent from '@/components/TableComponent'
import { Pencil } from 'lucide-react'
import React from 'react'

const index = () => {
    const columns = [
    {
        header: 'ID',
        accessorKey: 'id',
    },
    {
        header: 'Created By',
        accessorKey: 'createdBy',
    },
    {
        header: 'Property Name',
        accessorKey: 'propertyName',
    },
    {
        header: 'Created At',
        accessorKey: 'createdAt',
    },
    {
        header: 'Value',
        accessorKey: 'value',
    },
    {
        header: 'Plots',
        accessorKey: 'plots',
    },
    {
        header: 'Tokens',
        accessorKey: 'tokens',
    },
    {
        header: 'DAO',
        accessorKey: 'dao',
    },
    {
        header: 'Type',
        accessorKey: 'type',
    },
    {
        header: 'Docs Uploaded',
        accessorKey: 'docsUploaded',
    },
    {
        header: 'Status',
        accessorKey: 'status',
    },
    {
        header: 'Booking Amount Check',
        accessorKey: 'bookingAmountCheck',
    },
    {
        header: 'Actions',
        accessorKey: 'action',
    }
 ]
 const data = [
    {
        id: 1,
        createdBy: 'John Doe',
        propertyName: 'Property 1',
        createdAt: '2021-01-01',
        value: '100',
        plots: '10',
        tokens: '10',
        dao: '10',
        type: '10',
        docsUploaded: '10',
        status: '10',
        bookingAmountCheck: '10',
        
    }
 ]
 const actions = [
    {
        header: 'Edit',
        accessorKey: 'edit',
        onClick: () => {},
        icon: <Pencil />,
    }
 ]  
  return (
    <div className='border border-gray-200 rounded-md'>
        <TableComponent columns={columns} data={data} />
    </div>
  )
}

export default index
