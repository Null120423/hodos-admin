import initApi from './initApi';
const api = ['http://[::1]:3000', import.meta.env.REACT_APP_BACKEND_URL, 'https://hodos-hackaton.genny.id.vn'];
const rootApi = initApi(api[0]);
export default rootApi;
