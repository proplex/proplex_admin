import React from 'react'
import AddAmenities from './AddAmenities'
import AddLocation from './AddLocation'
const Amenities = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold p-4' >Amenities</h1>
      <div className="m-4">  
        <AddAmenities />
      </div>
      <div className="m-4">  
        <AddLocation />
      </div>
    </div>
  )
}

export default Amenities
