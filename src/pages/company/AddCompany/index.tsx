import { lazy } from 'react';

// Re-export the enhanced component as the default
const EnhancedAddCompany = lazy(() => import('./EnhancedAddCompany'));

const AddCompany = () => (
  <EnhancedAddCompany />
);

export default AddCompany;
