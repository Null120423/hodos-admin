import initApi from "./initApi";

const rootApi = initApi(process.env.REACT_APP_BACKEND_URL);

export default rootApi;
