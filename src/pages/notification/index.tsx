import React from 'react'
import TableComponent from '@/components/TableComponent'
const Notification = () => {
  const columns = [
  {
    header: 'Notification Type',
    accessorKey: 'notificationType',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Customer ID',
    accessorKey: 'customerId',
  },
  {
    header: 'Notification Sent AT',
    accessorKey: 'notificationSentAt',
  },
  {
    header: 'Channel',
    accessorKey: 'channel',
  }
  ]
  const data = [
    {
      notificationType: 'Example Notification',
      email: 'example@example.com',
      customerId: '1234567890',
      notificationSentAt: '2024-01-01 12:00:00',
      channel: 'Email',
    },
  ]

  return (
    <div className='container mx-auto p-6 space-y-6'>
      <h1 className='text-2xl font-semibold text-gray-900'>Notification</h1>
      <div className="border border-gray-200 rounded-md">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Notification
