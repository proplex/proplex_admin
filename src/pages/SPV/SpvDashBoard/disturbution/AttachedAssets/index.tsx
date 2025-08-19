import { Input } from '@/components/ui/input'
import React from 'react'
import Asset from './Asset'
const index = () => {
    const properties = [
        {
            id: 1,
            name: "Downtown Apartment Complex",
            type: "Residential",
            units: 24,
            icon: "residential",
            monthlyIncome: 12500,
            lastDistribution: "May 15, 2023",
            occupancyRate: 96,
        },
        {
            id: 2,
            name: "Westside Office Building",
            type: "Commercial",
            units: 12,
            icon: "commercial",
            monthlyIncome: 18750,
            lastDistribution: "May 10, 2023",
            occupancyRate: 88,
        },
        {
            id: 3,
            name: "Riverside Retail Center",
            type: "Commercial",
            units: 8,
            icon: "commercial",
            monthlyIncome: 15000,
            lastDistribution: "May 5, 2023",
            occupancyRate: 92,
        },
    ]
    return (
        <div>
            <div className="border rounded-md p-4">
                <div className="flex flex-col">
                    <h1 className='text-lg font-bold'> Attached Income-Generating assets</h1>
                    <span className='text-sm text-gray-500'>
                        Properties  and assets that generate income for distribution
                    </span>
                </div>

                <div className="flex mt-4">
                    <Input placeholder='Search' type='search' />
                </div>
                <div className="flex mt-4">
                <Asset properties={properties} />
            </div>
            </div>
           
        </div>
    )
}

export default index
