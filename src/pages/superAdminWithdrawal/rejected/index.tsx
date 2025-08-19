import React from 'react'
import TableComponent from '../../../components/TableComponent'
const index = () => {
    const columns = [
    {
        header: 'Company Name',
        accessorKey: 'companyName',
    },
    {
        header: 'Requested Amount',
        accessorKey: 'requestedAmount',
    },
    {
        header: 'Requested By',
        accessorKey: 'requestedBy',
    },
    {
        header: 'Requested Date',
        accessorKey: 'requestedDate',
    },
    {
        header: 'Transfer To',
        accessorKey: 'transferTo',
    },
    {
        header: 'Status',
        accessorKey: 'status',
    }
    ]
    const data = [
        {
            companyName: 'Company Name',
            requestedAmount: 'Requested Amount',
            requestedBy: 'Requested By',
            requestedDate: 'Requested Date',
            transferTo: 'Transfer To',
            status: 'Status',
        }
    ]
  return (
    <div className='border border-gray-200 rounded-md'>
        <TableComponent columns={columns} data={data} />
    </div>
)
}

export default index