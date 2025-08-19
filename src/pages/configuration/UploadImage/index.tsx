import React from 'react'
import { Button } from '@/components/ui/button'
import TableComponent from '@/components/TableComponent'
import { Edit, Image } from 'lucide-react'
const index = () => {
    const columns = [
        {
            header: 'City',
            accessorKey: 'city',
        },
        {
            header: 'icon',
            accessorKey: 'icon',
        },
        {
            header: 'Actions',
            accessorKey: 'action',
        },
    ]
    const data = [
        {
            city: 'New York',
            icon: <Image />,
        },
        {
            city: 'Los Angeles',
            icon: <Image />,
        },
        {

            city: 'Chicago',
            icon: <Image />,
        },
    ]
    const action = [
        {
            header: 'Edit',
            accessorKey: 'edit',
            onClick: () => {
                console.log('Edit')
            },
            icon: <Edit />,
        },
      
    ]   
  return (
    <div>
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Upload Image</h1>
            <Button>Upload</Button>
        </div>
        <div className=" border border-gray-300 mt-4 rounded-lg">
            <TableComponent columns={columns} data={data} />
        </div>
    </div>
  )
}

export default index
