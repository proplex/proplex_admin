

import Setting from './setting/index';
import Fee from './FeePercentage/Fee';
import { Button } from '@/components/ui/button';
import TableComponent from '@/components/TableComponent';
import { Pencil, Trash } from 'lucide-react';
function Index() {

 

  return (
    <div className='container mx-auto'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold p-4' >Setting</h1>
      </div>
      <Setting />
      <Fee />
    </div>
  );
}

export default Index;
