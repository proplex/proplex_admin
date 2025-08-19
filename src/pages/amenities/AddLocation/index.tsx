import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import AddLocationDialog from './AddLocationDialog'
const AddLocation = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <h1>Add New Location Feature   </h1>
      <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
        <Select >
            <SelectTrigger className='w-1/2'>
                <SelectValue placeholder="Select Type" />       
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="land_parcel">Land Parcel</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="holiday_home">Holiday Home</SelectItem>
            </SelectContent>
        </Select>
        <AddLocationDialog open={open} setOpen={setOpen} />
            <Button className='bg-black text-white' onClick={() => setOpen(true)}>Add</Button>
      </div>
    </div>
  )
}

export default AddLocation
