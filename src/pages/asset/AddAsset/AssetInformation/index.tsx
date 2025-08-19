

import { useNavigate, useParams } from 'react-router-dom';
import { lazy, Suspense, useCallback, useMemo, JSX } from 'react';
import CustomTabs from '@/components/ui/custom-tab';
import { ASSET_STEPS_TABS } from '@/constants/global';
import Loading from '@/components/ui/Loading';

// Lazy-loaded components
const AssetType = lazy(() => import('./AssetType'));
const InvestmentDetails = lazy(() => import('./InvestmentDetails'));
const EscrowLegal = lazy(() => import('./EscrowLegal'));
const TenantInformation = lazy(() => import('./TenantInformation'));

interface Props {
  tab: string;
  step: string;
  asset: any;
}


const AssetInformation = ({ tab, step, asset }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  // Inside AssetInformation
const getComponentByTabId = (tabId: string): JSX.Element => {
  switch (tabId) {
    case 'asset-type':
      return (
        <Suspense fallback={<Loading />}>
          <AssetType asset={asset} />
        </Suspense>
      );
    case 'investment-details':
      return (
        <Suspense fallback={<Loading />}>
          <InvestmentDetails asset={asset} />
        </Suspense>
      );
    case 'rent-information':
      return (
        <Suspense fallback={<Loading />}>
          <TenantInformation asset={asset} />
        </Suspense>
      );
    case 'escrow-legal':
      return (
        <Suspense fallback={<Loading />}>
          <EscrowLegal asset={asset} />
        </Suspense>
      );
    default:
      return <div />;
  }
};

  // Memoized tab change handler
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = id ? `/edit-asset/${id}` : '/add-asset';
      navigate(`${basePath}?step=${step}&tab=${tabId}`, { replace: false });
    },
    [id, navigate, step]
  );

  // Memoized tabs computation
  const tabs = useMemo(() => {
    const stepTabs =
      ASSET_STEPS_TABS.find((ele) => ele.id === step)?.tabs || [];
    return stepTabs.map((tabItem) => ({
      id: tabItem.id,
      title: tabItem.title,
      component: getComponentByTabId(tabItem.id) || <div />,
    }));
  }, [step, asset]);

  const disabledTabs = useMemo(() => {
    if (id) {
      return [];
    } else {
      return tabs.slice(1, tabs.length).map((tab) => tab.id);
    }
  }, [tabs]);

  return (
    <Suspense fallback={<div>Loading Asset Information...</div>}>
      <div className='asset-information shadow-none'>
        <h1 className='text-2xl font-bold mb-4'>Asset Information</h1>
        <CustomTabs
          defaultTab={tab}
          tabs={tabs}
          handleTabChange={handleTabChange}
         disabledTabs={disabledTabs}
        />
      </div>
    </Suspense>
  );
}

AssetInformation.displayName = 'AssetInformation';

export default AssetInformation;
