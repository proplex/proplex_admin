

import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, memo, useCallback } from 'react';
import CustomTabs from '@/components/ui/custom-tab';
import Amenity from './Amenity';
import Feature from './Feature';

interface Props {
  tab: string;
  step: string;
}

const FeaturesAndAmenities = memo(({ tab, step }: Props) => {
  const { id = null } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const handleTabChange = useCallback(
    (tabId: string) => {
      const basePath = id ? `/edit-asset/${id}` : '/add-asset';
      navigate(`${basePath}?step=${step}&tab=${tabId}`, { replace: false });
    },
    [id, navigate, step]
  );

  const tabs = [
    {
      id: 'features',
      title: 'Features',
      component: <Feature />,
    },
    {
      id: 'amenities',
      title: 'Amenities',
      component: <Amenity />,
    },
  ];

  return (
    <Suspense fallback={<div>Loading Features and Amenities...</div>}>
      <div className='asset-information'>
        <h1 className='text-2xl font-bold mb-4'>Features and Amenities</h1>
        <CustomTabs
          defaultTab={tab}
          tabs={tabs}
          handleTabChange={handleTabChange}
          aria-label='Features and Amenities tabs'
        />
      </div>
    </Suspense>
  );
});

FeaturesAndAmenities.displayName = 'FeaturesAndAmenities';

export default FeaturesAndAmenities;
