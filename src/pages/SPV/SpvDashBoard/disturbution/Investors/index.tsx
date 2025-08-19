import React from 'react'
import InvestorsActivity from './invest'


  
const index = () => {
    const investorsData = [
        {
          id: 1,
          initials: "JS",
          name: "John Smith",
          shares: 50,
          investment: 250000,
          percentage: 10,
          status: null,
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
        },
        {
          id: 2,
          initials: "JD",
          name: "Jane Doe",
          shares: 100,
          investment: 500000,
          percentage: 20,
          status: null,
          bgColor: "bg-purple-100",
          textColor: "text-purple-600",
        },
        {
          id: 3,
          initials: "AI",
          name: "Acme Investments",
          shares: 200,
          investment: 1000000,
          percentage: 40,
          status: null,
          bgColor: "bg-cyan-100",
          textColor: "text-cyan-600",
        },
        {
          id: 4,
          initials: "GP",
          name: "Global Partners",
          shares: 75,
          investment: 375000,
          percentage: 15,
          status: "Paused",
          bgColor: "bg-blue-100",
          textColor: "text-blue-600",
        },
        {
          id: 5,
          initials: "TV",
          name: "Tech Ventures",
          shares: 75,
          investment: 375000,
          percentage: 15,
          status: null,
          bgColor: "bg-indigo-100",
          textColor: "text-indigo-600",
        },
        {
          id: 6,
          initials: "CS",
          name: "Capital Solutions",
          shares: 60,
          investment: 300000,
          percentage: 12,
          status: null,
          bgColor: "bg-green-100",
          textColor: "text-green-600",
        },
        {
          id: 7,
          name: "Mountain Ventures",
          shares: 40,
          investment: 200000,
          percentage: 8,
          status: "Paused",
          bgColor: "bg-red-100",
          textColor: "text-red-600",
        },
        {
          id: 8,
          name: "Future Growth",
          shares: 90,
          investment: 450000,
          percentage: 18,
          status: null,
          bgColor: "bg-amber-100",
          textColor: "text-amber-600",
        },
        {
          id: 9,
          initials: "SC",
          name: "Stellar Capital",
          shares: 65,
          investment: 325000,
          percentage: 13,
          status: null,
          bgColor: "bg-teal-100",
          textColor: "text-teal-600",
        },
        {
          id: 10,
          name: "Equity Partners",
          shares: 45,
          investment: 225000,
          percentage: 9,
          status: "Paused",
          bgColor: "bg-violet-100",
          textColor: "text-violet-600",
        },
      ]
  return (
    <div>
      <div className="border rounded-md p-2">  
        <InvestorsActivity investorsData={investorsData} />
      </div>
    </div>
  )
}

export default index
