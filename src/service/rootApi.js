import initApi from './initApi';
const api = [import.meta.env.REACT_APP_BACKEND_URL, 'https://hodos-hackaton.genny.id.vn'];
const rootApi = initApi(api[0] || api[1]);
export default rootApi;
