

import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, memo } from 'react';
import CustomTabs from '@/components/ui/custom-tab';
import RiskFactors from './RiskFactors';
import RiskDisclosures from './RiskDisclosures';
import ExitOpportunity from './ExitOpportunities';
import AdditionalTaxes from './AdditionalTaxes';

interface Props {
  tab: string;
  step: string;
}

const AdditionalDetails = memo(({ tab }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const handleTabChange = (tabId: string) => {
    const basePath = id ? `/edit-asset/${id}` : '/add-asset';

    navigate(`${basePath}?step=additional-details&tab=${tabId}`, {
      replace: false,
    });
  };

  const tabs = [
    {
      id: 'risk-factors',
      title: 'Risk Factors',
      component: <RiskFactors />,
    },
    {
      id: 'exit-opportunities',
      title: 'Exit Opportunities',
      component: <ExitOpportunity />,
    },
    {
      id: 'risk-disclosure',
      title: 'Risk Disclosure',
      component: <RiskDisclosures />,
    },
    {
      id: 'additional-tax',
      title: 'Additional Tax',
      component: <AdditionalTaxes />,
    },
  ];

  return (
    <Suspense fallback={<div>Loading Additional Details ...</div>}>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Additional Details</h1>
        <CustomTabs
          defaultTab={tab}
          tabs={tabs}
          handleTabChange={handleTabChange}
          aria-label='Additional Details'
        />
      </div>
    </Suspense>
  );
});

export default AdditionalDetails;
