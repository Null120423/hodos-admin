import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

import { ADMIN_ROUTES, AUTH_ROUTES } from "./routes";

import LoadingView from "@/components/loading-view";
import AuthLayout from "@/layouts/auth-layout";
import DefaultAdminLayout from "@/layouts/default";

// #region aut screen
export const LoginPage = lazy(() => import("../pages/auth/sign-in"));

//#endregion

// #region admin
export const DashboardPage = lazy(
  () => import("../pages/admin/dashboard/index"),
);
//#region location
export const LocationManagerPage = lazy(
  () => import("../pages/admin/location/index"),
);
export const DetailLocationPage = lazy(
  () => import("../pages/admin/location/childs/detail/index"),
);
export const EditLocationPage = lazy(
  () => import("../pages/admin/location/childs/edit/index"),
);
//#endregion
export const SettingPage = lazy(() => import("../pages/admin/index"));
export const BlogManagerPage = lazy(
  () => import("../pages/admin/blog-system/index"),
);
export const BlogManagerCreatePage = lazy(() => import("../pages/admin/index"));
export const BuildLogPage = lazy(() => import("../pages/admin/index"));
export const ErrorLogPage = lazy(() => import("../pages/admin/index"));

//#endregion

//#region users
export const UserListPage = lazy(
  () => import("../pages/admin/users/list/index"),
);
export const UserPostPage = lazy(
  () => import("../pages/admin/users/post/index"),
);
//#endregion

//#region master data
export const ReceivingBankAccountPage = lazy(
  () => import("../pages/admin/master-data/receving-bank/index"),
);
export const PlanQuestionPage = lazy(
  () => import("../pages/admin/master-data/plan-question/index"),
);
export const PricingPlanPage = lazy(
  () => import("../pages/admin/master-data/pricing-plan/index"),
);
//#endregion

//#region  transactions
export const TransactionListPage = lazy(
  () => import("../pages/admin/transactions/index"),
);
//#endregion

export const Page404 = lazy(() => import("../pages/not-found"));

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
      <DefaultAdminLayout>
        <Suspense fallback={<LoadingView />}>
          <Outlet />
        </Suspense>
      </DefaultAdminLayout>
    ),
    path: "/",
    children: [
      { path: ADMIN_ROUTES.DASHBOARD, element: <DashboardPage /> },
      //#region locations
      { path: ADMIN_ROUTES.LOCATION_MANAGER, element: <LocationManagerPage /> },
      {
        path: ADMIN_ROUTES.LOCATION_DETAIL,
        element: <DetailLocationPage />,
      },
      {
        path: ADMIN_ROUTES.LOCATION_EDIT,
        element: <EditLocationPage />,
      },
      //#endregion
      { path: ADMIN_ROUTES.SETTING, element: <SettingPage /> },
      { path: ADMIN_ROUTES.BLOG_MANAGER, element: <BlogManagerPage /> },
      {
        path: ADMIN_ROUTES.BLOG_MANAGER_CREATE,
        element: <BlogManagerCreatePage />,
      },
      { path: ADMIN_ROUTES.BUILD_LOGS, element: <BuildLogPage /> },
      { path: ADMIN_ROUTES.ERROR_LOGS, element: <ErrorLogPage /> },

      //#region users
      {
        path: ADMIN_ROUTES.USER_LIST,
        element: <UserListPage />,
      },
      {
        path: ADMIN_ROUTES.USER_POST,
        element: <UserPostPage />,
      },
      //#endregion

      //#region master data
      {
        path: ADMIN_ROUTES.RECEIVING_BANK_ACCOUNT,
        element: <ReceivingBankAccountPage />,
      },
      {
        path: ADMIN_ROUTES.PLAN_QUESTION,
        element: <PlanQuestionPage />,
      },
      {
        path: ADMIN_ROUTES.PRICING_PLAN,
        element: <PricingPlanPage />,
      },
      //#endregion

      //#region transactions
      {
        path: ADMIN_ROUTES.TRANSACTION_LIST,
        element: <TransactionListPage />,
      },
      //#endregion
    ],
  },
];

export default AdminRoute;

function AppRouter() {
  const routes = useRoutes([
    ...AdminRoute,
    ...AuthRoutes,
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate replace to="/404" />,
    },
  ]);

  return routes;
}

export { AppRouter };
