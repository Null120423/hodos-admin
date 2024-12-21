import { lazy, Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import LoadingView from '../components/loading-view';
import AuthLayout from '../layouts/auth';
import DashboardLayout from '../layouts/layout';
import { ADMIN_ROUTES, AUTH_ROUTES } from './endpoint';

// #region aut screen
export const LoginPage = lazy(() => import('../screens/auth/login/index'));

//#endregion

// #region admin
export const DashboardPage = lazy(() => import('../screens/admin/dashboard/index'));
export const LocationManagerPage = lazy(() => import('../screens/admin/location/index'));
export const SettingPage = lazy(() => import('../screens/admin/setting/index'));
export const BlogManagerPage = lazy(() => import('../screens/admin/blog/index'));
export const BlogManagerCreatePage = lazy(() => import('../screens/admin/blog/child/create/index'));

//#endregion

export const Page404 = lazy(() => import('../screens/not-found/index'));

// ----------------------------------------------------------------------
const AuthRoutes = [
  {
    element: (
      <AuthLayout>
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    ),
    path: AUTH_ROUTES.LOGIN,
    children: [{ element: <LoginPage />, index: true }],
  },
];
const AdminRoute = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    path: '/',
    children: [
      { path: ADMIN_ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ADMIN_ROUTES.LOCATION_MANAGER, element: <LocationManagerPage /> },
      { path: ADMIN_ROUTES.SETTING, element: <SettingPage /> },
      { path: ADMIN_ROUTES.BLOG_MANAGER, element: <BlogManagerPage /> },
      { path: ADMIN_ROUTES.BLOG_MANAGER_CREATE, element: <BlogManagerCreatePage /> },
    ],
  },
];

export default AdminRoute;

function AppRouter() {
  const routes = useRoutes([
    ...AdminRoute,
    ...AuthRoutes,
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to='/404' replace />,
    },
  ]);

  return routes;
}

export { AppRouter };
