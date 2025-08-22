import React, {
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

// Layouts
const MainDashboard = React.lazy(() => import('@/layout/Main'));
const SpvDashboard = React.lazy(() => import('@/layout/SPV'));

// Components
import Loading from '@/components/ui/Loading';
import ErrorPage from '@/components/ui/ErrorPage';
import Protect from '@/middleware/Protect';

// Type definitions
type LazyComponent = LazyExoticComponent<ComponentType<any>>;
interface RouteConfig {
  path: string;
  component: LazyComponent;
  children?: RouteConfig[];
}

/**
 * Helper function to wrap components in Suspense with loading indicator
 */
const lazyLoad = (Component: LazyComponent) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

/**
 * Auth routes
 */
const authRoutes: RouteObject[] = [
  {
    path: '/sign-in',
    element: lazyLoad(React.lazy(() => import('@/pages/auth/SignIn'))),
    errorElement: <ErrorPage />,
  },
  {
    path: '/web3login',
    element: lazyLoad(React.lazy(() => import('@/pages/auth/Web3Login'))),
    errorElement: <ErrorPage />,
  },
];

/**
 * Main dashboard routes organized by feature
 */
const mainRoutes: RouteConfig[] = [
  {
    path: '/',
    component: React.lazy(() => import('@/pages/asset/AssetList')),
  },
  {
    path: '/assets',
    component: React.lazy(() => import('@/pages/asset/AssetList')),
  },
  {
    path: '/add-asset',
    component: React.lazy(() => import('@/pages/asset/AddAsset')),
  },
  {
    path: '/edit-asset/:id',
    component: React.lazy(() => import('@/pages/asset/AddAsset/AddAsset')),
  },
  {
    path: '/dashboard-asset/:id',
    component: React.lazy(() => import('@/pages/asset/Dashboard')),
  },
  {
    path: '/dashboard',
    component: React.lazy(() => import('@/pages/Dashboard')), // Make sure this component exists
  },
  {
    path: 'amenities',
    component: React.lazy(() => import('@/pages/amenities')),
  },
  {
    path: 'channel-assets-partner',
    component: React.lazy(() => import('@/pages/channelAssetsPartner')),
  },
  {
    path: 'token-asset-partner',
    component: React.lazy(() => import('@/pages/tokenAssetPartner')),
  },
  {
    path: '/company',
    component: React.lazy(() => import('@/pages/company')),
  },
  {
    path: '/add-company',
    component: React.lazy(() => import('@/pages/company/AddCompany')),
  },
  {
    path: '/edit-company/:id',
    component: React.lazy(() => import('@/pages/company/AddCompany')),
  },
  {
    path: '/customers',
    component: React.lazy(() => import('@/pages/customers')),
  },
  {
    path: '/add-customer',
    component: React.lazy(() => import('@/pages/customer/AddCustomer')),
  },
  {
    path: '/edit-customer/:id',
    component: React.lazy(() => import('@/pages/customer/AddCustomer')),
  },
  {
    path: 'add-company',
    component: React.lazy(() => import('@/pages/company/AddCompany')),
  },
  {
    path: 'edit-company/:id',
    component: React.lazy(() => import('@/pages/company/AddCompany')),
  },
  {
    path: 'employee',
    component: React.lazy(() => import('@/pages/employee/EmployeeList')),
  },
  {
    path: 'add-employee',
    component: React.lazy(() => import('@/pages/employee/AddEmployee')),
  },
  {
    path: 'edit-employee/:id',
    component: React.lazy(() => import('@/pages/employee/AddEmployee')),
  },
  {
    path: 'customers',
    component: React.lazy(() => import('@/pages/customers')),
  },
  {
    path: 'customer-profile/:id',
    component: React.lazy(() => import('@/pages/customers/customer')),
  },
  {
    path: 'customer-profile-fo/:id',
    component: React.lazy(() => import('@/pages/customers/ForeginInverstors')),
  },
  {
    path: 'orders',
    component: React.lazy(() => import('@/pages/orders')),
  },
  {
    path: 'order-details/:id',
    component: React.lazy(() => import('@/pages/orders/OrderDetail')),
  },
  {
    path: 'cancel',
    component: React.lazy(() => import('@/pages/cancel')),
  },
  {
    path: 'fee',
    component: React.lazy(() => import('@/pages/fee')),
  },
  {
    path: 'fee-management',
    component: React.lazy(() => import('@/pages/feeManagement/FeeDashboard')),
  },
  {
    path: 'super-admin-withdrawal',
    component: React.lazy(() => import('@/pages/superAdminWithdrawal')),
  },
  {
    path: 'spv-list',
    component: React.lazy(() => import('@/pages/SPV/SpvList')),
  },
  {
    path: 'add-spv',
    component: React.lazy(() => import('@/pages/SPV/AddSpv')),
  },
  {
    path: 'edit-spv/:id',
    component: React.lazy(() => import('@/pages/SPV/AddSpv')),
  },
  {
    path: 'blog',
    component: React.lazy(() => import('@/pages/blog')),
  },
  {
    path: 'review',
    component: React.lazy(() => import('@/pages/review')),
  },
  {
    path: 'config',
    component: React.lazy(() => import('@/pages/configuration')),
  },
  {
    path: 'roles',
    component: React.lazy(() => import('@/pages/roles')),
  },
  {
    path: 'roles/:id',
    component: React.lazy(() => import('@/pages/roles/RoleForm')),
  },
  {
    path: 'settings',
    component: React.lazy(() => import('@/pages/setting')),
  },
  {
    path: 'notification',
    component: React.lazy(() => import('@/pages/notification')),
  },
  {
    path: 'report',
    component: React.lazy(() => import('@/pages/report')),
  },
  {
    path: 'EOI',
    component: React.lazy(() => import('@/pages/EOI')),
  },
];

/**
 * SPV dashboard routes
 */
const spvRoutes: RouteConfig[] = [
  {
    path: '',
    component: React.lazy(() => import('@/pages/SPV/SpvDashBoard/overview')),
  },
  {
    path: 'governance',
    component: React.lazy(() => import('@/pages/SPV/SpvDashBoard/governance')),
  },
  {
    path: 'document',
    component: React.lazy(() => import('@/pages/SPV/SpvDashBoard/document')),
  },
  {
    path: 'investors',
    component: React.lazy(() => import('@/pages/SPV/SpvDashBoard/Investor')),
  },
  {
    path: 'orders',
    component: React.lazy(() => import('@/pages/SPV/SpvDashBoard/orders')),
  },
  {
    path: 'documents',
    component: React.lazy(() => import('@/pages/SPV/SpvDashBoard/document')),
  },
  {
    path: 'disturbution',
    component: React.lazy(
      () => import('@/pages/SPV/SpvDashBoard/disturbution')
    ),
  },
];

/**
 * Convert RouteConfig array to React Router's RouteObject array
 */
const convertToRouteObjects = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map(({ path, component, children }) => ({
    path,
    element: lazyLoad(component),
    ...(children && { children: convertToRouteObjects(children) }),
  }));
};

/**
 * Create the main dashboard route with all child routes
 */
const mainDashboardRoute: RouteObject = {
  path: '/',
  element: (
    <Protect>
      <Suspense
        fallback={
          <div className='flex items-center justify-center w-full h-screen'>
            <Loading />
          </div>
        }
      >
        <MainDashboard />
      </Suspense>
    </Protect>
  ),
  errorElement: <ErrorPage />,
  children: convertToRouteObjects(mainRoutes),
};

/**
 * Create the SPV dashboard route with all child routes
 */
const spvDashboardRoute: RouteObject = {
  path: '/spv/:id',
  element: (
    <Protect>
      <Suspense
        fallback={
          <div className='flex items-center justify-center w-full h-screen'>
            <Loading />
          </div>
        }
      >
        <SpvDashboard />
      </Suspense>
    </Protect>
  ),
  errorElement: <ErrorPage />,
  children: convertToRouteObjects(spvRoutes),
};

/**
 * Create and export the router with all routes
 */
const router = createBrowserRouter([
  mainDashboardRoute,
  spvDashboardRoute,
  ...authRoutes,
]);

export default router;
