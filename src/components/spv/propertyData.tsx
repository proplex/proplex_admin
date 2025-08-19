import React from "react";
import { DollarSignIcon } from "lucide-react";
export type propertyDataProps = {
  title?: string;
  currentFunding?: number;
  fundingTarget?: number;
  icon?: React.ReactNode;
  change? : string;
};

const PropertyData = ({
  title,
  currentFunding = 0,
  fundingTarget = 0,
  icon,
}: propertyDataProps) => {
  const progressPercentage = (currentFunding / fundingTarget) * 100;

  return (
    // <div>
    //      <div className="flex border border-gray-200 rounded-lg p-4  flex-col ">
    //         <div className="flex items-center gap-1">
    //         <DollarSignIcon size={16}/>
    //         <h1 className='text-sm font-normal'> {title}</h1>
    //         </div>
    //         <div className="">
    //           <h1 className='text-lg font-bold'>
    //              {currentFunding}
    //           </h1>
    //           <span className='text-sm text-gray-500'> Funding Target: </span>
    //           <span className='text-sm text-gray-500'> $ {fundingTarget} </span>
    //         </div>

    //         <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
    //           <div
    //             className="bg-blue-600 h-2.5 rounded-full"
    //             style={{width: `${progressPercentage}%`}}
    //           ></div>
    //         </div>
    //         <div className="text-sm text-gray-500 mt-1">
    //           {progressPercentage.toFixed(2)}% funded
    //         </div>
    //      </div>
    // </div>
    <>
      <div className="bg-white shadow-sm rounded-xl flex flex-col justify-center gap-4 p-4 ">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-gray-100 rounded-full">
            <DollarSignIcon className="text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <h1 className="text-2xl font-bold">${currentFunding}</h1>
          </div>
        </div>
        <div className="w-full flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-xs">
              Target: {fundingTarget}
            </span>
            <span className="text-purple-600 text-xs">
              {progressPercentage.toFixed(2)}%
            </span>
          </div>
          <div className="w-full h-[6px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyData;
