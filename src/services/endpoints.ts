export const endpoints = {
  API: {
    LOGIN: "/auth/sign-in",
    DASHBOARD: {
      DATA: "common/dashboard",
    },
    BLOG: {
      CREATE: "blog",
      UPDATE: "blog",
      FORCE_DELETE: "blog/force",
      PAGINATION: "blog/pagination",
      DETAIL: "public/blog",
    },
    FOOD: {
      PAGINATION: "food/pagination",
      CREATE: "food/create",
      CREATE_MULTI: "food/multi-create",
      REMOVE_SOFT: "food/soft",
      UPDATE: "api/update-food",
      DELETE: "api/delete-food",
      GET_ALL: "api/get-all-food",
      GET_BY_ID: "api/get-food",
    },
    LOCATION: {
      PAGINATION: "location/pagination",
      CREATE: "location/create",
      CREATE_MULTI: "location/multi-create",
      REMOVE_SOFT: "location/soft",
      UPDATE: "location/update",
      DELETE: "api/delete-location",
      GET_ALL: "api/get-all-location",
      GET_BY_ID: "location",
    },

    //#region  master data
    PRICING_PLAN: {
      ALL: "master-data/pricing-plan",
      CREATE: "master-data/pricing-plan",
      BY_ID: (id: string) => "master-data/pricing-plan" + `/${id}`,
      UPDATE: (id: string) => "master-data/pricing-plan" + `/${id}`,
      DELETE: (id: string) => "master-data/pricing-plan" + `/${id}`,
    },
    RECEIVING_BANK: {
      ALL: "master-data/receiving-bank",
      CREATE: "master-data/receiving-bank",
      BY_ID: (id: string) => `master-data/receiving-bank/${id}`,
      UPDATE: (id: string) => `master-data/receiving-bank/${id}`,
      DELETE: (id: string) => `master-data/receiving-bank/${id}`,
    },
    PLAN_QUESTION: {
      ALL: "master-data/plan-question",
      CREATE: "master-data/plan-question",
      BY_ID: (id: string) => `master-data/plan-question/${id}`,
      UPDATE: (id: string) => `master-data/plan-question/${id}`,
      DELETE: (id: string) => `master-data/plan-question/${id}`,
      CREATE_OPTION: "master-data/plan-question-option",
      UPDATE_OPTION: (id: string) => `master-data/plan-question-option/${id}`,
      DELETE_OPTION: (id: string) => `master-data/plan-question-option/${id}`,
    },
    //#endregion

    //#region notification
    NOTIFICATION: {
      PAGINATION: "admin/notification/pagination",
      CREATE: "admin/notification",
      GET_BY_ID: (id: string) => `admin/notification/${id}`,
      SCHEDULE_PAGINATION: "admin/notification/schedule/pagination",
      SCHEDULE_CREATE: "admin/notification/schedule",
      SCHEDULE_BY_ID: (id: string) => `admin/notification/schedule/${id}`,
      SCHEDULE_UPDATE: `admin/notification/schedule`,
      SCHEDULE_DELETE: (id: string) => `admin/notification/schedule/${id}`,
    },
    //#endregion

    //#region transaction
    TRANSACTION: {
      PAGINATION: "transaction/pagination",
    },
    //#endregion

    //#region user
    USER: {
      PAGINATION: "user/pagination",
      SELECT_BOX: "admin/user/select-box",
    },
    //#endregion

    LOG: {
      BUILD_LOG_PAG: "admin/log/build-log",
      ERROR_LOG_PAG: "admin/log/error-log",
    },
  },
};
