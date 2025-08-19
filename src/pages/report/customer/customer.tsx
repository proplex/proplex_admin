

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TableComponent from '@/components/TableComponent';

// import BadgeCancel from "@/../../public/favicon-16x16.png"
const columns = [
  { header: 'customerId', accessorKey: 'customerId' },
  { header: 'customerName', accessorKey: 'customerName' },
  { header: 'mobileNo', accessorKey: 'mobileNo' },
  { header: 'walletAddress', accessorKey: 'walletAddress' },
  { header: 'lastActivity', accessorKey: 'lastActivity' },
  { header: 'invested', accessorKey: 'invested' },
  { header: 'totalValue', accessorKey: 'totalValue' },
  { header: 'currentLocation', accessorKey: 'currentLocation' },
  { header: 'eKyc', accessorKey: 'eKyc' },
];
const data = [
  {
    customerId: '1',
    customerName: 'John Doe',
    mobileNo: '1234567890',
    walletAddress: '1234567890',
    lastActivity: '1234567890',
    invested: '1234567890',
    totalValue: '1234567890',
    currentLocation: '1234567890',
    eKyc: '1234567890',
  },
  {
    customerId: '1',
    customerName: 'John Doe',
    mobileNo: '1234567890',
    walletAddress: '1234567890',
    lastActivity: '1234567890',
    invested: '1234567890',
    totalValue: '1234567890',
    currentLocation: '1234567890',
    eKyc: '1234567890',
  },
];

//

export function CustomerTab() {
 
  

  
  return (
    <div className='space-y-4'>
      {/* Filter Section */}
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Registration - From Date
          </label>
          <Input
            type='date'
        
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Registration - To Date
          </label>
          <Input
            type='date'
           
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Select KYC Status
          </label>
          <Select
            
          
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Yes'>Yes</SelectItem>
              <SelectItem value='No'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Digital Wallet Status
          </label>
          <Select
            
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Options' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Yes'>Yes</SelectItem>
              <SelectItem value='No'>No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Buttons Section */}
      <div className='flex space-x-2'>
        <Button
         
        >
          Generate Report
        </Button>
        <Button variant='outline'>
          Clear Selection
        </Button>
      </div>

      {/* Table Section */}
      <div className='relative rounded-lg border bg-white overflow-x-auto'>
        <TableComponent columns={columns} data={data}  />
      </div>
    </div>
  );
}
