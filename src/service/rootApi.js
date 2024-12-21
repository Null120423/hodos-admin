import initApi from './initApi';

const api = [import.meta.env.REACT_APP_BACKEND_URL];
const rootApi = initApi('http://[::1]:3000');
export default rootApi;
