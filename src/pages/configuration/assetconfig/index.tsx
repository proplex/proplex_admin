import React, { useCallback } from 'react'
import CustomTabs from '@/components/ui/custom-tab';
import { useNavigate } from 'react-router-dom';
import FeatureAmenties from './FeatureAmenties';

interface Props {
  tab: string;
  step: string;
}

const index = ({ tab, step }: Props) => {
  const navigate = useNavigate();
  const tabs = [
    {
      id: 'feature-amenties ',
      title: 'Feature Amenties',
      component: <FeatureAmenties />,
    },
    {
      id: 'terms-and-conditions',
      title: 'Terms and Conditions',
      component: <div>Terms and Conditions</div>,
    },
    {
      id: 'risk-factors',
      title: 'Risk Factors',
      component: <div>Risk Factors</div>,
    },
    {
      id: 'documents',
      title: 'Documents',
      component: <div>Documents</div>,
    },
  ];
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = `/config?step=${step}&tab=${tabId}`;
      navigate(`${basePath}`, { replace: false });
    },
    [navigate, step]
  );

  return (
    <div>
      <CustomTabs
        defaultTab={tab}
        tabs={tabs}
        handleTabChange={handleTabChange}
        aria-label='Asset information tabs'
      />
    </div>
  );
};

export default index
