

import { Card } from "@/components/ui/card"
import { ArrowUpIcon } from "lucide-react";
import { safeFormatCurrency } from "@/lib/format.utility";
import moneybag from "../../assets/moneybag.svg";
import handmoney from "../../assets/hand-money.svg";
import totalinvest from "../../assets/totalinvest.svg";
import diamond from "../../assets/diamond.svg";
import upicon from "../../assets/upicon.svg";

interface WalletCardProps {
  currentBalance?: number
  investedValues?: number
  totalEarned?: number
  growth?: number
  token?: number
  asset?: number
  onAddMoney?: () => void
  onWithdrawal?: () => void
}

export function WalletCard({ 
  currentBalance, 
  investedValues, 
  totalEarned, 
  growth, 
  token, 
  asset 
}: WalletCardProps) {
  const metrics = [
    {
      icon: moneybag,
      label: "Total Balance",
      value: safeFormatCurrency(totalEarned),

    },
    {
      icon: handmoney,
      label: "Avg Growth",
      value: growth,
      icon2: upicon,
    },
    {
      icon: totalinvest,
      label: "Total Tokens",
      value: token,
    },
    {
      icon: diamond,
      label: "Total Assets",
      value: asset,
    },
  ]

  return (
    <Card
      className="w-full p-2 md:p-4 lg:p-6 
        bg-gradient-to-br from-[#1f2329] to-[#2c3036] 
        text-white flex flex-col gap-4 md:gap-6 
        rounded-2xl md:rounded-3xl 
        border-none"
    >
      {/* Top Section: Responsive Value Display */}
      <div className="flex md:flex-row items-center p-2 w-full justify-between">
        <div className="flex flex-col items-start w-full md:w-auto">
          <h2 className="text-sm md:text-base lg:text-lg text-white/80 font-normal mb-1">Current Value</h2>
          <h1 className="text-xl md:text-2xl lg:text-3xl text-[#0AC295] font-semibold">
            {safeFormatCurrency(currentBalance)}
          </h1>
        </div>
        <div className="flex flex-col items-start md:items-end w-full md:w-auto">
          <h2 className="text-sm md:text-base lg:text-lg text-white/80 font-normal mb-1">Invested Values</h2>
          <h1 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold">
            {safeFormatCurrency(investedValues)}
          </h1>
        </div>
      </div>

      {/* Bottom Section: Responsive Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-[#343438] w-full flex flex-col items-center justify-center 
              gap-2 rounded-xl md:rounded-2xl 
              p-3 md:p-4 "
          >
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src={metric.icon || "/placeholder.svg"}
                alt={`${metric.label} icon`}
                width={24}
                height={24}
                className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"
              />
              <h2 className="text-[#BABABA] text-xs md:text-sm lg:text-base font-normal">
                {metric.label}
              </h2>
            </div>
            <h1 className="text-white flex items-center gap-1 text-center text-xs md:text-sm lg:text-base font-normal">
              {metric.value}
              {metric.icon2 && (
                <span>
                  <img src={metric.icon2} alt="icon2" width={10} height={10} />
                </span>
              )}
            </h1>
           
          </div>
        ))}
      </div>
    </Card>
  )
}

export default WalletCard

