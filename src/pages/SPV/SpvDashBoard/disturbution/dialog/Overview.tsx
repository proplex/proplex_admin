import React from 'react'

interface OverviewProps {
    distributionName: string;
    totalAmount: number;
    distributionDate: string;
    selectedInvestors: number[];
    investors: number[];
}
const Overview = ({distributionName, totalAmount, distributionDate, selectedInvestors, investors}: OverviewProps) => {
  return (
    <div>
      <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Distribution Summary</h3>
                <p className="text-sm text-gray-500 mt-1">Review the distribution details before confirming</p>
              </div>

              <div className="border rounded-md p-6 space-y-4">
                <div className="grid grid-cols-2 gap-y-4">
                  <div className="text-gray-700 font-medium">Distribution Name:</div>
                  <div>{distributionName}</div>

                  <div className="text-gray-700 font-medium">Total Amount:</div>
                  <div>${totalAmount}</div>

                  <div className="text-gray-700 font-medium">Distribution Date:</div>
                  <div>{distributionDate}</div>

                  <div className="text-gray-700 font-medium">Number of Investors:</div>
                  <div>
                    {selectedInvestors.length} of {investors.length}
                  </div>
                </div>

                <p className="text-gray-600 pt-2">
                  Each investor will receive their share based on their investment percentage.
                </p>
              </div>
            </div>  
    </div>
  )
}

export default Overview
