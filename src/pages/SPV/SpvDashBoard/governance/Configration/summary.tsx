

import { format } from 'date-fns';
import { CheckCircle2, CircleHelp } from 'lucide-react';

interface SummaryProps {
  formState: any;
}

function Summary({ formState }: SummaryProps) {
  return (
    <div>
      <h3 className='text-lg font-medium'>Governance Configuration Summary</h3>
      <p className='text-sm text-gray-500'>
        Review your governance settings before saving
      </p>

      <div className='mt-4 space-y-4'>
        <div className='bg-gray-50 p-4 rounded-md'>
          <h4 className='font-medium'>Voting Mechanism</h4>
          <p className='text-sm'>Token-weighted voting (1 token = 1 vote)</p>
        </div>

        <div className='bg-gray-50 p-4 rounded-md'>
          <h4 className='font-medium'>Core Parameters</h4>
          <ul className='mt-2 space-y-1'>
            <li className='flex items-center gap-2 text-sm'>
              <span className='text-blue-500'>•</span> Proposal Threshold:{' '}
              {formState.minimumTokenThreshold}% of total supply
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <span className='text-blue-500'>•</span> Quorum Requirement:{' '}
              {formState.quorumRequirement}% of total tokens
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <span className='text-blue-500'>•</span> Voting Period:{' '}
              {formState.votingPeriodDays} days, {formState.votingPeriodHours}{' '}
              hours
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <span className='text-blue-500'>•</span> Voting End Date:{' '}
              {format(formState.endDate, 'MMMM do, yyyy')} at{' '}
              {formState.endTime}
            </li>
          </ul>
        </div>

        <div className='bg-gray-50 p-4 rounded-md'>
          <h4 className='font-medium'>Basic Rights</h4>
          <ul className='mt-2 space-y-1'>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              Voting Rights: {formState.votingRights ? 'Enabled' : 'Disabled'}
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              Proposal Creation:{' '}
              {formState.proposalCreation ? 'Enabled' : 'Disabled'}
              {formState.proposalCreation &&
                ` (${formState.minimumTokenThreshold}% threshold)`}
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              Admin Vote Power: {formState.adminVeto ? 'Enabled' : 'Disabled'}
            </li>
          </ul>
        </div>

        <div className='bg-gray-50 p-4 rounded-md'>
          <h4 className='font-medium'>Advanced Settings</h4>
          <ul className='mt-2 space-y-1'>
            <li className='flex items-center gap-2 text-sm'>
              <span
                className={
                  formState.voteDelegation ? 'text-green-500' : ''
                }
              >
                •
              </span>
              Vote Delegation:{' '}
              {formState.voteDelegation ? 'Enabled' : 'Disabled'}
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <span
                className={
                  formState.timelock ? 'text-green-500' : ''
                }
              >
                •
              </span>
              Timelock for Execution:{' '}
              {formState.timelock ? 'Enabled' : 'Disabled'}
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <span
                className={
                  formState.quadraticVoting ? 'text-green-500' : ''
                }
              >
                •
              </span>
              Quadratic Voting:{' '}
              {formState.quadraticVoting ? 'Enabled' : 'Disabled'}
            </li>
            <li className='flex items-center gap-2 text-sm'>
              <span className='text-blue-500'>•</span>
              Votable Matters:{' '}
              {formState.votableMatters === 'major-only'
                ? 'Major Decisions Only'
                : formState.votableMatters === 'all'
                ? 'All Decisions'
                : 'Financial Decisions Only'}
            </li>
          </ul>
        </div>

        <div className='bg-blue-50 p-4 rounded-md'>
          <div className='flex gap-2'>
            <CircleHelp className='h-5 w-5 text-blue-500' />
            <div>
              <h3 className='text-sm font-medium text-blue-700'>
                Governance Summary
              </h3>
              <p className='text-sm text-blue-600'>
                Token holders will have proportional voting rights with a{' '}
                {formState.minimumTokenThreshold}% proposal threshold and{' '}
                {formState.quorumRequirement}% quorum requirement. Votes will
                remain open for {formState.votingPeriodDays} days and{' '}
                {formState.votingPeriodHours} hours, and decisions will focus on
                major property matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summary;
