import React from 'react'
import AllBalanceDonut from './AllBalanceDonut'
import AllBalanceRight from './AllBalanceRight'
import { Button } from '@/components/ui/button'

const AllBalanceTab = () => {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex p-4 gap-4'>
        <AllBalanceDonut/>
        <AllBalanceRight/>
      </div>
      <div>
      <div className="flex gap-4">
        <Button variant="default" className="flex-1 py-2 rounded-md bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-semibold shadow">
          $ Deposit
        </Button>
        <Button variant="default" className=" bg-white flex-1 py-2 rounded-md border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100">
          ⇄ Withdraw
        </Button>
      </div>
      </div>
    </div>
  )
}

export default AllBalanceTab