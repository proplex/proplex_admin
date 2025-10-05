import React, {
  Suspense,
  type ComponentType,
  type LazyExoticComponent,
} from 'react';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

// Layouts
const MainDashboard = React.lazy(() => import('../layout/Main'));
const SpvDashboard = React.lazy(() => import('../layout/SPV'));
const MainLayout = React.lazy(() => import('../layout/MainLayout'));

// Components
import Loading from '../components/ui/Loading';
import ErrorPage from '../components/ui/ErrorPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';

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
 * Helper function to wrap protected routes
 */
const protectedRoute = (Component: LazyComponent) => (
  <ProtectedRoute>
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  </ProtectedRoute>
);

/**
 * Auth routes
 */
const authRoutes: RouteObject[] = [
  // Authentication routes can be added here if needed
];

/**
 * Main dashboard routes organized by feature
 */
const mainRoutes: RouteConfig[] = [
  {
    path: '/assets',
    component: React.lazy(() => import('../pages/asset/AssetList/index')),
  },
  {
    path: '/add-asset',
    component: React.lazy(() => import('../pages/asset/AddAsset/index')),
  },
  {
    path: '/edit-asset/:id',
    component: React.lazy(() => import('../pages/asset/AddAsset/index')),
  },
  {
    path: '/dashboard-asset/:id',
    component: React.lazy(() => import('../pages/asset/Dashboard')),
  },
  {
    path: '/dashboard',
    component: React.lazy(() => import('../pages/Dashboard/index')),
  },
  {
    path: '/amenities',
    component: React.lazy(() => import('../pages/amenities')),
  },
  {
    path: '/channel-assets-partner',
    component: React.lazy(() => import('../pages/channelAssetsPartner')),
  },
  {
    path: '/token-asset-partner',
    component: React.lazy(() => import('../pages/tokenAssetPartner')),
  },
  {
    path: '/company',
    component: React.lazy(() => import('../pages/company')),
  },
  {
    path: '/company/:companyId',
    component: React.lazy(() => import('../pages/company/CompanyDetail')),
  },
  {
    path: '/add-company',
    component: React.lazy(() => import('../pages/company/AddCompany/index')),
  },
  {
    path: '/edit-company/:id',
    component: React.lazy(() => import('../pages/company/AddCompany/index')),
  },
  {
    path: '/customers',
    component: React.lazy(() => import('../pages/customers')),
  },
  {
    path: '/customers/new',
    component: React.lazy(() => import('../pages/customer/AddCustomer')),
  },
  {
    path: '/wallet',
    component: React.lazy(() => import('../pages/wallet')),
  },
];

/**
 * SPV dashboard routes
 */
const spvRoutes: RouteConfig[] = [
  {
    path: '',
    component: React.lazy(() => import('../pages/SPV/SpvDashBoard/overview')),
  },
  {
    path: 'disturbution',
    component: React.lazy(
      () => import('../pages/SPV/SpvDashBoard/disturbution')
    ),
  },
];

/**
 * Convert RouteConfig array to React Router's RouteObject array
 */
const convertToRouteObjects = (routes: RouteConfig[]): RouteObject[] => {
  return routes.map(({ path, component, children }) => ({
    path,
    element: protectedRoute(component),
    ...(children && { children: convertToRouteObjects(children) }),
  }));
};

/**
 * Create the main dashboard route with all child routes
 */
const mainDashboardRoute: RouteObject = {
  path: '/',
  element: (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className='flex items-center justify-center w-full h-screen'>
            <Loading />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    </ProtectedRoute>
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
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className='flex items-center justify-center w-full h-screen'>
            <Loading />
          </div>
        }
      >
        <SpvDashboard />
      </Suspense>
    </ProtectedRoute>
  ),
  errorElement: <ErrorPage />,
  children: convertToRouteObjects(spvRoutes),
};

/**
 * Public routes
 */
const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: lazyLoad(React.lazy(() => import('../pages/LandingPage'))),
    errorElement: <ErrorPage />,
  },
];

/**
 * Create and export the router with all routes
 */
const router = createBrowserRouter([
  ...publicRoutes,
  mainDashboardRoute,
  spvDashboardRoute,
  ...authRoutes,
]);

export default router;