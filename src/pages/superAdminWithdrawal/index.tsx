import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import Approved from './approved'
import Rejected from './rejected'
import Pending from './pending'
const superAdminWithdrawal = () => {
  return (
    <div className='p-6 space-y-6'>
        <h1 className='text-2xl font-semibold text-gray-900'> Super Admin Withdrawal</h1>

       <div className="w-full">
        <Tabs defaultValue="approved" className='w-full'>
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>
          <TabsContent value="approved">
            <Approved />
          </TabsContent>
          <TabsContent value="pending">
            <Pending />
          </TabsContent>
          <TabsContent value="rejected">
            <Rejected />
          </TabsContent>
        </Tabs>
        </div>
    </div>
  )
}

export default superAdminWithdrawal
