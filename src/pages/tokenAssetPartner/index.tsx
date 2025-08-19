import React from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Awaiting from './awaiting'
import Approved from './approved'
import Rejected from './rejected'
const TokenAssetPartner = () => {
  return (
    <div>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Channel Partner</h1>
        <div className=" ">

        <Tabs defaultValue="awaiting" >
          <TabsList className='w-full bg-gray-100 flex items-start h-auto justify-start p-3 gap-4'>
            <TabsTrigger value="awaiting" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:bg-white p-2">Awaiting</TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:bg-white p-2 " >Approved</TabsTrigger>
            <TabsTrigger value="rejected" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white data-[state=inactive]:bg-white p-2">Rejected</TabsTrigger>
          </TabsList>
       
          <TabsContent value="awaiting">
            <Awaiting />
          </TabsContent>
       
          <TabsContent value="approved">
            <Approved />
          </TabsContent>
          <TabsContent value="rejected">
            <Rejected />
          </TabsContent>
        </Tabs>
        
        </div>
      </div>
    </div>
  )
}

export default TokenAssetPartner
