



import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShieldAlert } from 'lucide-react';

interface AdvancedSettingsProps {
  formState: any;
  updateFormState: (key: string, value: any) => void;
}

function AdvancedSettings({
  formState,
  updateFormState,
}: AdvancedSettingsProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-start gap-2'>
        <div className='h-5 w-5 mt-0.5'>
          <ShieldAlert className='h-5 w-5' />
        </div>
        <div className='flex-1'>
          <h3 className='font-medium'>Advanced Governance Rights</h3>

          <div className='space-y-4 mt-2'>
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

            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-medium'>Vote Delegation</h4>
                <p className='text-xs text-gray-500'>
                  Members can delegate their voting power to other members
                </p>
              </div>
              <Switch
                checked={formState.voteDelegation}
                onCheckedChange={(checked) =>
                  updateFormState('voteDelegation', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-medium'>Timelock for Execution</h4>
                <p className='text-xs text-gray-500'>
                  Implement a delay between proposal approval and execution
                </p>
              </div>
              <Switch
                checked={formState.timelock}
                onCheckedChange={(checked) =>
                  updateFormState('timelock', checked)
                }
              />
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <h4 className='text-sm font-medium'>Quadratic Voting</h4>
                <p className='text-xs text-gray-500'>
                  Balance power between large and small token holders
                </p>
              </div>
              <Switch
                checked={formState.quadraticVoting}
                onCheckedChange={(checked) =>
                  updateFormState('quadraticVoting', checked)
                }
              />
            </div>

            <div>
              <h4 className='text-sm font-medium'>Votable Matters</h4>
              <p className='text-xs text-gray-500'>
                Types of decisions token holders can vote on
              </p>

              <div className='mt-2'>
                <label className='text-sm'>Decision Types</label>
                <Select
                  value={formState.votableMatters}
                  onValueChange={(value) =>
                    updateFormState('votableMatters', value)
                  }
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select decision types' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='major-only'>
                      Major Decisions Only
                    </SelectItem>
                    <SelectItem value='all'>All Decisions</SelectItem>
                    <SelectItem value='financial'>
                      Financial Decisions Only
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className='text-xs text-gray-500 mt-1'>
                  Token holders can only vote on major decisions like treasury
                  actions and parameter changes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSettings;
