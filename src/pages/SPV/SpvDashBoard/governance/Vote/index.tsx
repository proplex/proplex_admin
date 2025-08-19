

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CustomTabs from '@/components/ui/custom-tab';
import { Clock, Info } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const tabs = [
    {
      id: 'details',
      title: 'Details',
      component: <div />,
    },
    { id: 'vote', title: 'Vote Proposals', component: <div /> },
  ];

  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button type='button' onClick={() => setOpen(true)}>
        vote
      </button>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className='w-[90vw] max-w-[900px] max-h-[90vh] flex flex-col overflow-hidden'>
          <DialogHeader>
            <DialogTitle>
              <div className='flex gap-4 items-center'>
                <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium'>
                  Active
                </span>
                <h2 className='text-gray-600 text-sm font-normal'>
                  Proposal #5
                </h2>
              </div>
              <p className='text-md font-normal mt-2'>
                RYZER: Locked RYZER tokens for better incentives and stronger
                governance
              </p>
            </DialogTitle>
            <DialogDescription>
              <div className='flex items-center text-gray-500 mb-6 text-sm gap-2'>
                <div className='flex items-center gap-1'>
                  <span className='text-gray-500'>
                    Proposed by Alex Johnson (0x1a2b3c...4d5e)
                  </span>
                </div>
                <span>•</span>
                <div className='flex items-center gap-1'>
                  <span>Created on 3/10/2023</span>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 overflow-auto'>
            <div className='md:col-span-2'>
              <CustomTabs
                defaultTab={activeTab}
                tabs={tabs}
                handleTabChange={handleTabChange}
                aria-label='Governance Proposals'
              />
            </div>
            <div className='md:col-span-1'>
              <div className='border rounded-lg p-6 mb-6'>
                <h3 className='text-xl font-bold mb-4'>Cast your vote</h3>
                <div className='flex items-center text-gray-500 mb-6'>
                  <Clock className='h-5 w-5 mr-2' />
                  <span>Voting ends in 7d 10h 23m</span>
                </div>

                <div className='space-y-4 mb-6'>
                  {['Yes', 'No', 'Abstain'].map((option) => (
                    <div key={option} className='flex items-center'>
                      <input
                        type='radio'
                        id={option}
                        name='vote'
                        className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                        checked={selectedVote === option}
                        onChange={() => setSelectedVote(option)}
                      />
                      <label
                        htmlFor={option}
                        className='ml-2 block text-gray-700'
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 rounded-md text-white font-medium ${
                    selectedVote && walletConnected
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-blue-400 cursor-not-allowed'
                  }`}
                  disabled={!selectedVote || !walletConnected}
                >
                  Vote
                </button>

                <button
                  className='w-full mt-4 py-2 text-gray-600 text-center'
                  onClick={() => setWalletConnected(!walletConnected)}
                >
                  {walletConnected
                    ? 'Wallet Connected'
                    : 'Connect your wallet to vote'}
                </button>
              </div>

              <div className='border rounded-lg p-6 mb-6'>
                <h3 className='text-xl font-bold mb-4'>Current Votes</h3>
                <div className='space-y-6'>
                  <div>
                    <div className='flex justify-between mb-1'>
                      <div className='flex items-center'>
                        <span className='h-3 w-3 rounded-full bg-green-500 mr-2'></span>
                        <span>Yes</span>
                      </div>
                      <span>50,000 (86%)</span>
                    </div>
                    <div className='h-2 bg-gray-200 rounded-full'>
                      <div
                        className='h-2 bg-green-500 rounded-full'
                        style={{ width: '86%' }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between mb-1'>
                      <div className='flex items-center'>
                        <span className='h-3 w-3 rounded-full bg-red-500 mr-2'></span>
                        <span>No</span>
                      </div>
                      <span>6,000 (10%)</span>
                    </div>
                    <div className='h-2 bg-gray-200 rounded-full'>
                      <div
                        className='h-2 bg-red-500 rounded-full'
                        style={{ width: '10%' }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className='flex justify-between mb-1'>
                      <div className='flex items-center'>
                        <span className='h-3 w-3 rounded-full bg-gray-400 mr-2'></span>
                        <span>Abstain</span>
                      </div>
                      <span>2,000 (3%)</span>
                    </div>
                    <div className='h-2 bg-gray-200 rounded-full'>
                      <div
                        className='h-2 bg-gray-400 rounded-full'
                        style={{ width: '3%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='border rounded-lg p-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-xl font-bold'>Quorum</h3>
                  <Info className='h-5 w-5 text-gray-400' />
                </div>
                <div className='flex justify-between mb-1'>
                  <span>Approval Quorum</span>
                  <span>50%</span>
                </div>
                <div className='h-2 bg-gray-200 rounded-full'>
                  <div
                    className='h-2 bg-blue-500 rounded-full'
                    style={{ width: '50%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              type='button'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type='submit'>Submit Proposal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
