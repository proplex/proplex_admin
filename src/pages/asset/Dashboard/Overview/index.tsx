

import { useNavigate, useParams } from 'react-router-dom';
import { DAOGovernance } from './DAOGovernance';
import { OverviewMetrics } from './OverviewMetrics';
import { PropertyDetails } from './PropertyDetails';
import { TokenInformation } from './TokenInformation';
import AssetHost from './AssetHost';

interface IndexProps {
  assetOverview: any; // Replace 'any' with the actual type of assetOverview if known
}

const Index: React.FC<IndexProps> = ({
  assetOverview
}) => {
  const { id } = useParams();
  const Navigate = useNavigate();

  const handleEditAsset = () => {
    Navigate('/edit-asset/' + id);
  };

  return (
    <div className='border border-gray-200 bg-white p-6 rounded-lg'>
      <div className='flex justify-between items-center mb-2'>
        <div />
        <div className='flex space-x-2'>
          <button
            className='flex items-center px-3 py-1.5 text-sm border rounded-md'
            onClick={handleEditAsset}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
              />
            </svg>
            Edit Asset
          </button>
          <button className='flex items-center px-3 py-1.5 text-sm border rounded-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 mr-1'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
            View on Blockchain
          </button>
        </div>
      </div>
      <OverviewMetrics assetOverview={assetOverview} />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <TokenInformation assetOverview={assetOverview} />
        <PropertyDetails assetOverview={assetOverview}  />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
        <AssetHost hostedBy={assetOverview?.hostedBy ?? {}} />
        <DAOGovernance assetOverview={assetOverview} />
      </div>
    </div>
  );
};
export default Index;
