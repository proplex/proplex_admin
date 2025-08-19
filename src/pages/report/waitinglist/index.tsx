import React from 'react'
import TableComponent from '@/components/TableComponent'
const index = () => {
    const columns = [
    {
        header: 'USER ID',
        accessorKey: 'userId',
    },
    {
        header: 'CUSTOMER NAME',
        accessorKey: 'customerName',
    },
    {
        header: 'CUSTOMER Phone',
        accessorKey: 'customerPhone',
    },
    {
        header: 'CUSTOMER email',
        accessorKey: 'customerEmail',
    },
    {
        header: 'Asset Name',
        accessorKey: 'assetName',
    },
    {
        header: 'LAST ACTIVITY',
        accessorKey: 'lastActivity',
    }
    ]
    const data = [
        {
            userId: '1',
            customerName: 'John Doe',
            customerPhone: '1234567890',
            customerEmail: 'john@doe.com',
            assetName: 'Asset 1',
            lastActivity: '2021-01-01',
        },
    ]
  return (
    <div className='border border-gray-200 rounded-md'>
      <TableComponent columns={columns} data={data} />
    </div>
  )
}

export default index
