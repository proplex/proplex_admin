

import { memo } from 'react';
import CustomTabs from '@/components/ui/custom-tab';
import Legal from './Legal';
import Strucutre from './Structure';
import Valuation from './Valuation';
import {Tabs, TabsContent, TabsList} from '@/components/ui/tabs';

const IssueDueDiligence = memo(() => {
  const dueDiligenceTabs = [
    {
      id: 'legal',
      title: 'Legal',
      component: <Legal />,
    },
    {
      id: 'valuation',
      title: 'Valuation',
      component: <Valuation />,
    },
    {
      id: 'structure',
      title: 'Structure',
      component: <Strucutre />,
    },
  ];

  return (
    <div className='w-full'>
      {/* <CustomTabs tabs={dueDiligenceTabs} defaultTab='legal' /> */}
        < >
        <TabsList>
          {dueDiligenceTabs.map((tab) => (
            <button
              key={tab.id}
              className='px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded'
            >
              {tab.title}
            </button>
          ))}
        </TabsList>
       
        </>
    </div>
  );
});

export default IssueDueDiligence;
