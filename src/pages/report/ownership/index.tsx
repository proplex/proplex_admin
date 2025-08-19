import React from 'react'
import TableComponent from '@/components/TableComponent'
const index = () => {
    const columns = [
    {
        header: 'CUSTOMER ID',
        accessorKey: 'customerId',
    },
    {
        header: 'CUSTOMER NAME',
        accessorKey: 'customerName',
    },
    {
        header: 'PROPERTY ID',
        accessorKey: 'propertyId',
    },
    {
        header: 'PROPERTY NAME',
        accessorKey: 'propertyName',
    },
    {
        header: 'NO OF TOKEN',
        accessorKey: 'noOfToken',
    },
    {
        header: 'PURCHASE VALUE',
        accessorKey: 'purchaseValue',
    },
    {
        header: 'OWNERSHIP %',
        accessorKey: 'ownershipPercentage',
    },
    ]
    const data = [
        {
            customerId: '1',
            customerName: 'John Doe',
            propertyId: '1',
            propertyName: 'Property 1',
            noOfToken: '100',
            purchaseValue: '1000',
            ownershipPercentage: '100',
        },
    ]
  return (
    <div className='border border-gray-200 rounded-md'>
      <TableComponent columns={columns} data={data} />
    </div>
  )
}

export default index
