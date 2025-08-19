

import TableComponent from "@/components/TableComponent"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Lock, Percent, TrendingUp } from "lucide-react"

export default function FeeManagementDashboard() {
  const columns = [
    { header: 'Fee Type', accessorKey: 'feeType' },
    { header: 'Assets', accessorKey: 'assets' },
    { header: 'Percentage(%)', accessorKey: 'percentage' },
    { header: 'Amount Collected', accessorKey: 'amountCollected' },
    { header: 'Balance in Escrow', accessorKey: 'balanceInEscrow' }, 
    { header: 'Total Withdrawn (Gross)', accessorKey: 'totalWithdrawn' },
    { header: 'Actions', accessorKey: 'actions' },
  ]
  const data = [
    {
      feeType: 'Example Fee',
      assets: '0',
      percentage: '0%',
      amountCollected: '₹0.00',
      balanceInEscrow: '₹0.00',
      totalWithdrawn: '₹0.00',
      actions: 'Action',    
    },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Fee Management</h1>
      <div className="flex flex-wrap gap-4">
        <Card className="flex-1 bg-purple-600 text-white">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-bold">₹0.00</h2>
              <p>Total Collected</p>
            </div>
            <DollarSign className="h-8 w-8" />
          </CardContent>
        </Card>
        <Card className="flex-1 bg-orange-500 text-white">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-bold">₹0.00</h2>
              <p>Balance in Escrow</p>
            </div>
            <Lock className="h-8 w-8" />
          </CardContent>
        </Card>
        <Card className="flex-1 bg-teal-500 text-white">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-bold">₹0.00</h2>
              <p>Total Withdrawn</p>
            </div>
            <TrendingUp className="h-8 w-8" />
          </CardContent>
        </Card>
        <Card className="flex-1 bg-blue-500 text-white">
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-lg font-bold">₹0.00</h2>
              <p>Taxes & Deduction</p>
            </div>
            <Percent className="h-8 w-8" />
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-4">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="company1">Company 1</SelectItem>
            <SelectItem value="company2">Company 2</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Options" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Total Orders</li>
              <li>Total Transactions</li>
              <li>Total Customers</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between">
            <CardTitle>Fee Breakup</CardTitle>
            <span className="text-sm text-gray-500">Updated 1 hour ago</span>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-blue-500 rounded-full"></div>
                <div>₹0.00 Platform Fee</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-cyan-500 rounded-full"></div>
                <div>₹0.00 Brokerage Fee</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-orange-500 rounded-full"></div>
                <div>₹0.00 Stamp duty Fee</div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-pink-500 rounded-full"></div>
                <div>₹0.00 Legal Fee</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="border border-gray-200 rounded-md">

      <TableComponent
        columns={columns}
        data={data}
      
      />
      </div>
    </div>
  )
}

