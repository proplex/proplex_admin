import { Calendar, DollarSignIcon, MoveUpRight, Percent } from 'lucide-react'
import React from 'react'

type propertyDataProps = {
    title?: string,
    value?: number,
    date?: string;
    perInvestor?: string;
}
const Disturbution = ({title,  value, date, perInvestor}: propertyDataProps) => {
    const progressPercentage = (32 / 35) * 100

  return (
    <>
     <div className="bg-white shadow-sm rounded-xl flex flex-col justify-center gap-4 p-4 ">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-gray-100 rounded-full">
            <Percent className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h1 className="text-2xl font-bold">{value}%</h1>
          </div>
        </div>
        <div className="text-xs w-40 bg-green-50 text-green-600 font-medium mt-1 flex items-center p-1 gap-1 rounded-md">
          <MoveUpRight size={12} /> +5% from last quarter
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          {date && <span>Next: {date}</span>}
          {perInvestor && <span className="font-bold text-gray-800">${perInvestor} investor</span>}
        </div>
      </div>
    </>
  )
}

export default Disturbution