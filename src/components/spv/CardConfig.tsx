import React from 'react'

const CardConfig = ({title, value}: {title: string, value: string}) => {
  return (
    <div className='border border-gray-200 rounded-lg p-4'>
        <div className='flex flex-col items-start justify-between space-y-2'>
              <h1 className='text-xs  font-medium  text-gray-600'> {title} </h1>
              <h1 className='text-2xl font-semibold text-gray-900'> {value} </h1>
        </div>
      
    </div>
  )
}

export default CardConfig
