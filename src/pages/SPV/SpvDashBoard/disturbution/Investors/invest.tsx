

import { useState } from "react"
import { MoreHorizontal, ChevronLeft, ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Dummy investor data

export default function InvestorsActivity({ investorsData }: { investorsData: any[] }) {


    // Handle page changes

    return (
        <div className="w-full  p-2 bg-white">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <Users className="h-5 w-5 text-blue-600" />
                    <h1 className="text-xl font-bold">Investors & Activity</h1>
                </div>
                <p className="text-gray-500 text-sm">Manage investor accounts and distributions</p>
            </div>

            <div className="space-y-4">
                {investorsData.map((investor: any) => (
                    <div key={investor?.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                        <div className="flex items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 bg-blue-50 font-medium`}
                            >
                                {investor.name.charAt(0)}
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <h3 className="font-medium">{investor.name}</h3>
                                    {investor.status && (
                                        <span className="ml-2 px-2 py-0.5 text-xs bg-amber-100 text-amber-800 rounded-full">
                                            {investor.status}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-500">{investor.shares} shares</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <div className="text-right mr-4">
                                <p className="font-medium">${investor.investment.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">{investor.percentage}%</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    )
}
