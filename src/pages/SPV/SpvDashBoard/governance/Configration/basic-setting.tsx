



import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  CalendarIcon,
  CircleHelp,
  Users,
  Vote,
  ShieldAlert,
} from 'lucide-react';

interface BasicSettingsProps {
  formState: any;
  updateFormState: (key: string, value: any) => void;
}

function BasicSettings({ formState, updateFormState }: BasicSettingsProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-start gap-2'>
        <div className='h-5 w-5 mt-0.5'>
          <Vote className='h-5 w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='font-medium'>Voting Mechanism</h3>

          <div className='mt-2'>
            <label className='text-sm font-medium'>Voting Type</label>
            <Select
              value={formState.votingType}
              onValueChange={(value) => updateFormState('votingType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select voting type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='token-weighted'>
                  Token-weighted (1 token = 1 vote)
                </SelectItem>
                <SelectItem value='one-address-one-vote'>
                  One address, one vote
                </SelectItem>
              </SelectContent>
            </Select>
            <p className='text-sm text-gray-500 mt-1'>
              Voting power is directly proportional to token holdings
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-start gap-2'>
        <div className='h-5 w-5 mt-0.5'>
          <ShieldAlert className='h-5 w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='font-medium'>Core Governance Parameters</h3>

          <div className='grid grid-cols-3 gap-10 mt-2'>
            <div>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium'>
                  Minimum Token Threshold
                </label>
                <CircleHelp className='h-4 w-4 text-gray-400' />
              </div>
              <div className='flex items-center gap-2 mt-1'>
                <Input
                  type='number'
                  value={formState.minimumTokenThreshold}
                  onChange={(e) =>
                    updateFormState('minimumTokenThreshold', e.target.value)
                  }
                  className='w-full'
                />
                <p className='text-sm min-w-fit'>% of supply</p>
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                Minimum percentage of tokens required to submit a proposal
              </p>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium'>
                  Quorum Requirement
                </label>
                <CircleHelp className='h-4 w-4 text-gray-400' />
              </div>
              <div className='flex items-center gap-2 mt-1 w-full'>
                <Input
                  type='number'
                  value={formState.quorumRequirement}
                  onChange={(e) =>
                    updateFormState('quorumRequirement', e.target.value)
                  }
                  className='w-full'
                />
                <p className='text-sm min-w-fit'>% of tokens</p>
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                Minimum participation needed for a valid vote
              </p>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label className='text-sm font-medium'>Voting Period</label>
                <CircleHelp className='h-4 w-4 text-gray-400' />
              </div>
              <div className='flex items-center gap-2 mt-1'>
                <Input
                  type='number'
                  value={formState.votingPeriodDays}
                  onChange={(e) =>
                    updateFormState('votingPeriodDays', e.target.value)
                  }
                  className='w-full'
                />
                <p className='text-sm min-w-fit'>days</p>
                <Input
                  type='number'
                  value={formState.votingPeriodHours}
                  onChange={(e) =>
                    updateFormState('votingPeriodHours', e.target.value)
                  }
                  className='w-full'
                />
                <p className='text-sm min-w-fit'>hours</p>
              </div>
              <p className='text-xs text-gray-500 mt-1'>
                How long proposals remain open for voting
              </p>
            </div>
          </div>

          <div className='mt-4'>
            <div className='flex items-center justify-between'>
              <label className='text-sm font-medium'>
                Set Specific End Date & Time
              </label>
              <CircleHelp className='h-4 w-4 text-gray-400' />
            </div>

            <div className='grid grid-cols-2 gap-4 mt-1'>
              <div>
                <label className='text-sm'>End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full justify-start text-left font-normal mt-1'
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {formState.endDate
                        ? format(formState.endDate, 'PPP')
                        : 'Select date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={formState.endDate}
                      onSelect={(date) =>
                        date && updateFormState('endDate', date)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className='text-sm'>End Time</label>
                <Select
                  value={formState.endTime}
                  onValueChange={(value) => updateFormState('endTime', value)}
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select time' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='6:00 PM'>6:00 PM</SelectItem>
                    <SelectItem value='7:00 PM'>7:00 PM</SelectItem>
                    <SelectItem value='8:00 PM'>8:00 PM</SelectItem>
                    <SelectItem value='9:00 PM'>9:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className='text-xs text-gray-500 mt-1'>
              Alternatively, set a specific date and time when voting will end
              instead of a duration
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-start gap-2'>
        <div className='h-5 w-5 mt-0.5'>
          <Users className='h-5 w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='font-medium'>Basic Governance Rights</h3>

          <div className='space-y-3 mt-2'>
            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-medium'>Voting Rights</h4>
                <p className='text-xs text-gray-500'>
                  Token holders can vote on proposals proportional to their
                  holdings
                </p>
              </div>
              <Switch
                checked={formState.votingRights}
                onCheckedChange={(checked) =>
                  updateFormState('votingRights', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-medium'>Proposal Creation</h4>
                <p className='text-xs text-gray-500'>
                  Members with sufficient tokens can create proposals
                </p>
              </div>
              <Switch
                checked={formState.proposalCreation}
                onCheckedChange={(checked) =>
                  updateFormState('proposalCreation', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-medium'>Admin Vote Power</h4>
                <p className='text-xs text-gray-500'>
                  DAO admins can veto harmful proposals with 2/3 majority
                </p>
              </div>
              <Switch
                checked={formState.adminVeto}
                onCheckedChange={(checked) =>
                  updateFormState('adminVeto', checked)
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className='bg-blue-50 p-4 rounded-md'>
        <div className='flex gap-2'>
          <CircleHelp className='h-5 w-5 text-blue-500' />
          <div>
            <h3 className='text-sm font-medium text-blue-700'>
              Governance Tip
            </h3>
            <p className='text-sm text-blue-600'>
              Setting a reasonable proposal threshold helps prevent spam while
              ensuring legitimate concerns can be addressed. A threshold of 1-5%
              is common for most DAOs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicSettings;
