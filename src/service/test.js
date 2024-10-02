import axios from '../axios';

const testService = {
    fetch: async () => {
        return await axios.get('/api/get-all-users?id=All');
    },
}

export default testService;