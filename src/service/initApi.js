import axios from 'axios';

const initApi = (url, headers = {}) => {
  if (url == null) throw new Error('URL is required');
  const api = axios.create({
    baseURL: url,
    headers: {
      ...headers,
    },
  });

  api.interceptors.request.use(async (config) => {
    // try {
    //   const token = await Helper.getToken();
    //   if (token != null) {
    //     // eslint-disable-next-line no-param-reassign
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // } catch (error) {
    //   console.log("AsyncStorage error:", error);
    // }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Accessing the URL and the body of the request
      console.log('\x1b[31m', error.config?.headers?.Authorization);
      console.log('\x1b[31m', 'ERROR REQUEST URL:', error.config?.baseURL + '/' + error.config.url);
      console.log('\x1b[31m', 'ERROR REQUEST BODY:', error.config.data);

      return Promise.reject(error);
    },
  );

  return api;
};

export default initApi;
