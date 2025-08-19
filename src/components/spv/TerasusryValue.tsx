import { ChartPie, Coins } from 'lucide-react'
import React from 'react'

type propertyDataProps = {
    title?: string,
    blockChain?: {
        id: string,
        name: string,
    }[],
    value?: number,
}
const TerasusryValue = ({title, blockChain, value}: propertyDataProps) => {
    

  return (
    <>
         {/* <div className="flex h-[155px] border border-gray-200 rounded-lg p-4 flex-col">
            <div className="flex items-center gap-1">
            <Coins size={16}/>
                <h1 className='text-sm font-normal'> {title}</h1>
            </div>
            <div className="">
                <h1 className='text-lg font-bold'>$ {value}</h1>
            </div>
            
            <div className="w-full flex gap-2 mt-2">
              {blockChain?.map((item) => (
                <div key={item.id}>
                    <span className='text-sm text-gray-500 bg-yellow-100 rounded-full px-3 py-1'>
                      {item.name}
                    </span>
                </div>
              ))}
            </div>
         </div> */}
         <div className="bg-white shadow-sm rounded-xl flex flex-col justify-center gap-4 p-4 ">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-gray-100 rounded-full">
            <ChartPie className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h1 className="text-2xl font-bold">$ {value}</h1>
          </div>
        </div>
        <div className="w-full flex gap-2 mt-2">
              {blockChain?.map((item) => (
                <div key={item.id}>
                    <span className='text-xs font-semibold text-gray-500 bg-yellow-100 rounded-full px-3 py-1'>
                      {item.name}
                    </span>
                </div>
              ))}
            </div>
      </div>
    </>
  )
}

export default TerasusryValue