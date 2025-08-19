import React from 'react'
import { ArrowUpRight } from 'lucide-react'

// Raw asset data (with dollar strings)
const rawAssets = [
  {
    name: 'Ryzer Token (RYZ)',
    amount: '$430,090',
    color: 'bg-purple-500 text-purple-600',
  },
  {
    name: 'Ethereum (ETH)',
    amount: '$225,810',
    color: 'bg-blue-500 text-blue-600',
  },
  {
    name: 'Tether (USDT)',
    amount: '$175,000',
    color: 'bg-green-500 text-green-600',
  },
]

const AllBalanceRight = () => {
  // Convert string amounts to numbers
  const parsedAssets = rawAssets.map((asset) => ({
    ...asset,
    numericValue: Number(asset.amount.replace(/[^0-9.-]+/g, '')),
  }))

  // Calculate total value
  const totalValue = parsedAssets.reduce((sum, asset) => sum + asset.numericValue, 0)

  // Add percentage to each asset
  const assets = parsedAssets.map((asset) => ({
    ...asset,
    percent: (asset.numericValue / totalValue) * 100,
  }))

  return (
    <div className="flex flex-col gap-6 p-4 w-full">
      <div>
        <h3 className="text-sm font-medium text-gray-500">Asset Allocation</h3>
        <div className="mt-4 flex flex-col gap-4">
          {assets.map((asset, i) => {
            const [bgColor, textColor] = asset.color.split(' ')
            return (
              <div key={i}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${bgColor}`} />
                    <span className="text-sm font-medium text-gray-700">{asset.name}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{asset.amount}</div>
                </div>
                <div className="w-full flex flex-col gap-1 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-xs">Target</span>
                    <span className={`text-xs ${textColor}`}>
                      {asset.percent.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full h-[6px] bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`${bgColor} h-full rounded-full`}
                      style={{ width: `${asset.percent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 bg-gray-50 p-3 rounded-md shadow-sm">
          <div className="text-xs text-gray-500">Monthly Change</div>
          <div className="text-green-600 font-semibold text-sm flex items-center gap-1">
            <ArrowUpRight size={14} />
            +5.2%
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-3 rounded-md shadow-sm">
          <div className="text-xs text-gray-500">Yearly Return</div>
          <div className="text-green-600 font-semibold text-sm flex items-center gap-1">
            <ArrowUpRight size={14} />
            +12.8%
          </div>
        </div>
        <div className="flex-1 bg-gray-50 p-3 rounded-md shadow-sm">
          <div className="text-xs text-gray-500">Liquidity</div>
          <div className="text-sm font-semibold text-green-600 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            High
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllBalanceRight
