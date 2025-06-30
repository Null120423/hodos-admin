export const endpoints = {
  API: {
    LOGIN: "/auth/sign-in",
    DASHBOARD: {
      DATA: "common/dashboard",
    },
    BLOG: {
      CREATE: "blog",
      FORCE_DELETE: "blog/force",
      PAGINATION: "blog/pagination",
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

    LOG: {
      BUILD_LOG_PAG: "log/build-log",
      ERROR_LOG_PAG: "log/error-log",
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
  },
};
