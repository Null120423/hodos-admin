export const endpoints = {
  API: {
    LOGIN: '/auth/sign-in',
    DASHBOARD: {
      DATA: 'common/dashboard',
    },
    BLOG: {
      CREATE: 'blog',
      FORCE_DELETE: 'blog/force',
      PAGINATION: 'blog/pagination',
    },
    FOOD: {
      PAGINATION: 'food/pagination',
      CREATE: 'food/create',
      CREATE_MULTI: 'food/multi-create',
      REMOVE_SOFT: 'food/soft',
      UPDATE: 'api/update-food',
      DELETE: 'api/delete-food',
      GET_ALL: 'api/get-all-food',
      GET_BY_ID: 'api/get-food',
    },
    LOCATION: {
      PAGINATION: 'location/pagination',
      CREATE: 'location/create',
      CREATE_MULTI: 'location/multi-create',
      REMOVE_SOFT: 'location/soft',
      UPDATE: 'api/update-location',
      DELETE: 'api/delete-location',
      GET_ALL: 'api/get-all-location',
      GET_BY_ID: 'api/get-location',
    },
  },
};
