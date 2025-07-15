export const ADMIN_ROUTES = {
  DASHBOARD: "/dashboard",
  //#region locations
  LOCATION_MANAGER: "/location-manager",
  LOCATION_DETAIL: "/location-manager-detail",
  LOCATION_EDIT: "/location-manager-edit",

  //#endregion
  SETTING: "/setting",

  BLOG_MANAGER: "/blog-manager",
  BLOG_MANAGER_CREATE: "/blog-manager/create",
  BLOG_MANAGER_CREATE_PREVIEW: "/blog-manager/create/preview",
  BLOG_MANAGER_DETAIL: "/blog-manager/detail",
  BLOG_MANAGER_EDIT: "/blog-manager/edit",

  //#region users
  USER_LIST: "/user-list",
  USER_POST: "/user-post",
  //#endregion

  //#region master data
  MASTER_DATA: "/master-data",
  PLAN_QUESTION: "/master-data/plan-question",
  RECEIVING_BANK_ACCOUNT: "/master-data/receiving-bank-account",
  PRICING_PLAN: "/master-data/pricing-plan",
  //#endregion

  //#region transactions
  TRANSACTION_LIST: "/transaction-list",
  TRANSACTION_DETAIL: "/transaction-detail",
  //#endregion

  //#region  notifications
  NOTIFICATION_LIST: "/notification-list",
  NOTIFICATION_SCHEDULE_LIST: "/notification-schedule-list",
  //#endregion

  //#region log
  LOG_ERROR: "/log-error",
  LOG_BUILD: "/log-build",
  //#endregion
};

export const AUTH_ROUTES = {
  LOGIN: "/",
};

export const USER_ROUTES = {
  BLOG_DETAIL: "/blog-detail/:id",
  LANDING: "/landing",
};
