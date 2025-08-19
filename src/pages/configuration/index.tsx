

import { useNavigate, useLocation } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';


// Import components directly instead of lazy loading to prevent routing issues
import AssetConfig from './assetconfig'
import SideNav from "@/components/common/SideNav";
// import CompanyConfig from './companyconfig'
// import EmployeeConfig from './employeeconfig'

const CONFIG_TABS = [
  { 
    id: 'asset-config', 
    label: 'Asset Configuration', 
    title: 'Asset Configuration', 
    sections: [
      { id: 'feature-amenties', label: 'Feature Amenties' },
      { id: 'terms-and-conditions', label: 'Terms and Conditions' },
      { id: 'risk-factors', label: 'Risk Factors' },
      { id: 'documents', label: 'Documents' }
    ] 
  },
  { 
    id: 'people-config', 
    label: 'asset-manager',
    title: 'People Configuration', 
    sections: [
      { id: 'asset-manager', label: 'Asset Manger' },
      { id: 'legal-adivisor', label: 'Legal Adivisor' }
      
    ] 
  },

];

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const methods = useForm();
  const searchParams = new URLSearchParams(location.search);
  const step = searchParams.get('step') || 'asset-config';
  const tab = searchParams.get('tab') || CONFIG_TABS[0].sections[0].id;

  const renderContent = () => {
    switch(step) {
      case 'asset-config':
        return <AssetConfig tab={tab} step={step} />;
      case 'company-config':
        return <div>Company Config</div>;
      case 'employee-config':
        return <div>Employee Config</div>;
      default:
        return <div>Asset Config</div>;
    }
  };

  const nextStep = () => {
    const currentIndex = CONFIG_TABS.findIndex((ele) => ele.id === step);
    if (currentIndex !== -1 && currentIndex < CONFIG_TABS.length - 1) {
      const nextStep = CONFIG_TABS[currentIndex + 1];
      navigate(`/config?step=${nextStep.id}&tab=${nextStep.sections[0].id}`);
    }
  };

  const handleBack = () => {
    const currentIndex = CONFIG_TABS.findIndex((ele) => ele.id === step);
    if (currentIndex > 0) {
      const prevStep = CONFIG_TABS[currentIndex - 1];
      navigate(`/config?step=${prevStep.id}&tab=${prevStep.sections[0].id}`);
    }
  };

  const changeStep = (step: string) => {
    const selectedStep = CONFIG_TABS.find(t => t.id === step);
    if (selectedStep) {
      navigate(`/config?step=${step}&tab=${selectedStep.sections[0].id}`);
    }
  };

  return (
    <div className=' flex gap-2'>
      <div className="space-y-2">
        <h1 className='text-xl font-semi-bold text-gray-800  '>Configuration</h1>

        <SideNav
          steps={CONFIG_TABS}
          currentStep={step}
          changeStep={changeStep}
        />
      
      </div>
      <FormProvider {...methods}>
        <form className='bg-white rounded-lg shadow p-2 w-full'>
          {renderContent()}
          {/* <div className='py-4 flex justify-between'>
            <Button
              type='button'
              variant='outline'
              disabled={step === 'asset-config'}
              onClick={handleBack}
              className={`${
                step === 'asset-config'
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer bg-transparent-400 hover:bg-transparency-500'
              }`}
            >
              Back
            </Button>
            <Button type='button' onClick={nextStep}>Next</Button>
          </div> */}
        </form>
      </FormProvider>
    </div>
  );
}

export default Index;
