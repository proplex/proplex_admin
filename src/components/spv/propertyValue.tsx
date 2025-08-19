import { Building, Building2, Coins, DollarSignIcon, MoveUpRight } from "lucide-react";
import React from "react";

type propertyDataProps = {
  title?: string;

  value?: number;
};
const PropertyValue = ({
  title,
  value,

}: propertyDataProps) => {
  return (
    // <div>
    //      <div className="flex h-[155px] border border-gray-200 rounded-lg p-4 flex-col">
    //         <div className="flex items-center gap-1">
    //         <Building2 size={16}/>
    //             <h1 className='text-sm font-normal'> {title}</h1>
    //         </div>
    //         <div className="">
    //             <h1 className='text-lg font-bold'>$ {value}</h1>
    //         </div>

    //         <div className="w-full  gap-2">
    //           <span className='text-sm text-gray-500'> + 5% apraisal</span>
    //         </div>
    //      </div>
    // </div>
    <>
      <div className="bg-white shadow-sm  rounded-xl flex flex-col justify-center gap-4 p-4 ">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-gray-100 rounded-full">
            <Building className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h1 className="text-2xl font-bold">$ {value}</h1>
          </div>
        </div>
        <div className="text-xs w-40 bg-green-50 text-green-600 font-medium mt-1 flex items-center p-1 gap-1 rounded-md">
          <MoveUpRight size={12} /> +5% from last appraisal
        </div>
      </div>
    </>
  );
};

export default PropertyValue;
