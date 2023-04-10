import axios from 'axios';

const apiUrl = '/data/orders.json'; // đường dẫn của API

const orderService = {
    getAllOrders: async () => {
        const response = await axios.get(`${apiUrl}`);
        return response;
    },
    getOrderById: async (orderId) => {
        const response = await axios.get(`${apiUrl}/${orderId}`);
        return response;
    },
};

export default orderService;
