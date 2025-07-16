import initApi from "./initApi";

const rootApi = initApi("https://hodos-api.gitlabserver.id.vn/");
const rootApi = initApi("http://[::1]:3000/");

export default rootApi;
