import initApi from './initApi';

// const rootApi = initApi(import.meta.env.REACT_APP_BACKEND_URL);
const rootApi = initApi('http://localhost:3000');
// const rootApi = initApi('https://travel-app-api.genny.id.vn');

//travel-app-api.genny.id.vn

export default rootApi;