import initApi from './initApi';

const api = [import.meta.env.REACT_APP_BACKEND_URL];
const rootApi = initApi('https://hodos-api.genny.id.vn');
export default rootApi;
