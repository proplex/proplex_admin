import React from 'react'
import PropertyReview from './propertyReview'
import ManagerReview from './managerReview'
import PropertyHostedBy from './propertyHostedBy'
const index = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold p-4">Review</h1>
      <div className="">

      <PropertyReview />
      </div>
      <div className="">
      <ManagerReview />
      </div>
      <div className="">
        <PropertyHostedBy />
      </div>
    </div>
  )
}

export default index
