export const endpoints = {
  API: {
    LOGIN: '/auth/sign-in',
    DASHBOARD: {
      DATA: 'common/dashboard',
    },
    FOOD: {
      PAGINATION: 'food/pagination',
      CREATE: 'api/add-food',
      CREATE_MORE: 'api/add-more-food',
      UPDATE: 'api/update-food',
      DELETE: 'api/delete-food',
      GET_ALL: 'api/get-all-food',
      GET_BY_ID: 'api/get-food',
    },
    LOCATION: {
      PAGINATION: 'location/pagination',
      CREATE: 'api/add-location',
      UPDATE: 'api/update-location',
      DELETE: 'api/delete-location',
      GET_ALL: 'api/get-all-location',
      GET_BY_ID: 'api/get-location',
      CREATE_MORE: 'api/add-more-location',
    },
  },
};
