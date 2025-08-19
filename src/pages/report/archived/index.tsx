import React from 'react'
import TableComponent from '@/components/TableComponent'
const index = () => {
    const columns = [
    {
        header: 'ID',
        accessorKey: 'id',
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
        header: 'Status',
        accessorKey: 'status',
    },
    {
        header: 'Type',
        accessorKey: 'type',
    },
    {
        header: 'Stage',
        accessorKey: 'stage',
    }
    ]
    const data = [
        {
            id: '1',
            propertyName: 'Property 1',
            createdAt: '2021-01-01',
            status: 'Active',
            type: 'Type 1',
            stage: 'Stage 1',
        },
    ]
  return (
    <div className='border border-gray-200 rounded-md'>
      <TableComponent columns={columns} data={data} />
    </div>
  )
}

export default index
