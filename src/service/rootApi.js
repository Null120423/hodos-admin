import initApi from './initApi';

const api = [import.meta.env.REACT_APP_BACKEND_URL];
const rootApi = initApi('https://hodos-hackathon.genny.id.vn');
export default rootApi;
