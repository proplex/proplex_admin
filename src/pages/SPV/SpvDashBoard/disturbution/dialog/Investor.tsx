import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

const Investor = () => {
    const [selectAll, setSelectAll] = useState(false)
    const [selectedInvestors, setSelectedInvestors] = useState<number[]>([])

    const data = [
        { id: 1, name: "Investor 1" },
        { id: 2, name: "Investor 2" },
        { id: 3, name: "Investor 3" },
        { id: 4, name: "Investor 4" },
    ]

    const handleSelectAll = () => {
        setSelectAll(!selectAll)
        setSelectedInvestors(selectAll ? [] : data.map(item => item.id))
    }

    const handleInvestorSelect = (id: number) => {
        setSelectedInvestors(prev =>
            prev.includes(id)
                ? prev.filter(investorId => investorId !== id)
                : [...prev, id]
        )
    }

    return (
        <>

            <div className="mb-4">
                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="select-all"
                        checked={selectAll}
                        onCheckedChange={handleSelectAll}
                        className="border-gray-300 rounded-sm"
                    />
                    <label htmlFor="select-all" className="text-md font-medium cursor-pointer">
                        Select All Investors
                    </label>
                </div>
            </div>

            <div className="space-y-0 border rounded-md overflow-hidden">
                <form>
                    {data.map((investor) => (
                        <div
                            key={investor.id}
                            className="flex items-center space-x-3 hover:bg-gray-50 p-4 border-b last:border-b-0"
                        >
                            <Checkbox
                                id={`investor-${investor.id}`}
                                checked={selectAll || selectedInvestors.includes(investor.id)}
                                onCheckedChange={() => handleInvestorSelect(investor.id)}
                                className="border-gray-300 rounded-sm"
                            />
                            <label htmlFor={`investor-${investor.id}`} className="text-md font-medium cursor-pointer">
                                {investor.name}
                            </label>
                        </div>
                    ))}
                    
                </form>
            </div>
        </>
    )
}

export default Investor
