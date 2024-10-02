import axios from '../axios';

const adminService = {
    createFood: async (data) => {
        return await axios.post('/crud/add-food', data);
    },
    getAllFood: async (id) => {
        return await axios.get(`/crud/get-all-food?id=${id}`);
    },
    deleteFood: async (id) => {
        return await axios.delete(`/crud/delete-food?id=${id}`);
    },
}

export default adminService;