

import { FormFieldConfig } from '@/components/UseForm/ControllerMap';
import { Percent } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

export const governanceConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  return [
    {
      label: 'Proposal Threshold',
      name: `daoConfiguration.proposalThresholdPercent`,
      type: 'number',
      fullWidth: false,
      icon: <Percent size={16} />,
      iconPosition: 'right',
      control,
      rules: {
        required: 'Proposal Threshold is required',
        min: {
          value: 0,
          message: 'Proposal Threshold must be greater than 0',
        },
        max: {
          value: 100,
          message: 'Proposal Threshold must be less than 100',
        },
      },
    },
    {
      label: 'Quorum',
      name: `daoConfiguration.quorumPercent`,
      type: 'number',
      control,
      icon: <Percent size={16} />,
      iconPosition: 'right',
      rules: {
        required: 'Quorum Percentage is required',
        min: {
          value: 0,
          message: 'Proposal Threshold must be greater than 0',
        },
        max: {
          value: 100,
          message: 'Proposal Threshold must be less than 100',
        },
      },
    },
    {
      label: 'Days',
      name: `daoConfiguration.votingPeriod.days`,
      type: 'number',
      control,
      icon: <p>D</p>,
      iconPosition: 'right',
      rules: {
        required: 'Voting Period is required',
        min: {
          value: 0,
          message: 'Days must be at least 0',
        },
        max: {
          value: 365,
          message: 'Days cannot exceed 365',
        },
      },
    },
    {
      label: 'Hours',
      name: `daoConfiguration.votingPeriod.hours`,
      type: 'number',
      control,
      icon: <p>H</p>,
      iconPosition: 'right',
      rules: {
        required: 'Voting Period is required',
        min: {
          value: 0,
          message: 'Proposal Threshold must be greater than 0',
        },
        max: {
          value: 23,
          message: 'Proposal Threshold must be less than 24',
        },
      },
    },
    {
      label: 'Desicion Type',
      name: 'daoConfiguration.decisionType',
      type: 'select',
      control,
      options: [
        {
          label: 'Major Decision Only',
          value: 'major-decision-only',
        },
        {
          label: 'All Decisions',
          value: 'all-decisions',
        },
      ],
      rules: {
        required: 'Desicion Type is required',
      },
    },
  ];
};

export const votingRightsConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  return [
    {
      label: 'Voting Rights',
      name: 'daoConfiguration.governanceRights.votingRights',
      type: 'switch',
      control,
    },
  ];
};

export const proposalCreationConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  return [
    {
      label: 'Proposal Rights',
      name: 'daoConfiguration.governanceRights.proposalCreation',
      type: 'switch',
      control,
    },
  ];
};

export const adminVetoPowerConfig = (): FormFieldConfig[] => {
  const { control } = useFormContext<any>();
  return [
    {
      label: 'Admin Vote Power',
      name: 'daoConfiguration.governanceRights.adminVotePower',
      type: 'switch',
      control,
    },
  ];
};
