import React from 'react'
import AddAccount from '@/components/cards/company/addbank/AddAccount'
import BoardMember from '@/components/cards/company/board/Board'
import LegalAdvisor from '@/components/cards/company/legal/Legal'
const index = () => {
  return (
    <div className='flex flex-col gap-4 space-y-10'>
      <AddAccount />
      <BoardMember />
      <LegalAdvisor />
    </div>
  )
}

export default index
