import axios from 'axios';

let serverUrl = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    serverUrl = 'http://127.0.0.1:3100';
} else {
    serverUrl = process.env.REACT_APP_SERVER_URL;
}

const errorHandler = (err) => {
    console.log(err);
};

const orderService = {
    getOrdersOfUser: async (id) => {
        const response = await axios.post(`${serverUrl}/orders`, id).catch(errorHandler);
        return response;
    },
    getOrderById: async (orderId) => {
        const response = await axios
            .post(`${serverUrl}/orders/detail`, {
                order_id: orderId,
            })
            .catch(errorHandler);
        return response;
    },
    postOrder: async (order) => {
        const response = await axios
            .post(`${serverUrl}/orders/add`, order)
            .catch(errorHandler);
        return response;
    },
};

export default orderService;
