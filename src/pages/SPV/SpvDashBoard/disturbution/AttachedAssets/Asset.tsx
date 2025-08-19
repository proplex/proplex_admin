import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Home, Building, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
// import { Progress } from '@/components/ui/progress'

const Asset = ({ properties }: { properties: any[] }) => {
    return (
        <div className='w-full'>
            <div className="space-y-4">
                {properties.map((property) => (
                    <Card key={property.id} className="bg-white border-0">
                        <CardContent className="p-4">
                            <div className="flex items-start">
                                
                                <div className="bg-white p-3 rounded-md border mr-4">
                                    {property.type === "Residential" ? (
                                        <Home className="h-5 w-5 text-blue-500" />
                                    ) : (
                                        <Building className="h-5 w-5 text-blue-500" />
                                    )}
                                </div>

                                <div className="flex-1 p-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-medium">{property.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {property.type} • {property.units} units
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Monthly Income</p>
                                            <p className="font-semibold">${property.monthlyIncome.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Last Distribution</p>
                                            <p>{property.lastDistribution}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Occupancy Rate</span>
                                            <span>{property.occupancyRate}%</span>
                                        </div>
                                        <div
                                            className='bg-black  h-1.5 rounded-full'
                                            style={{ width: `${property.occupancyRate}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Asset;
