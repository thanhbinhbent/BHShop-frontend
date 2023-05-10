import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://127.0.0.1:3100';

const errorHandler = (err) => {
    console.log(err);
};

const customerService = {
    getCustomer: async (user_id) => {
        const response = await axios
            .post(`${serverUrl}/customers/user_id`, {
                user_id: user_id,
            })
            .catch(errorHandler);
        return response;
    },
    getWishlist: async (id) => {
        const response = await axios
            .post(`${serverUrl}/customers/wishlist`, { user_id: id })
            .catch(errorHandler);
        return response;
    },
    addToWishlist: async (user_id, product) => {
        const response = await axios
            .post(`${serverUrl}/customers/wishlist/add`, {
                user_id: user_id,
                product: product,
            })
            .catch(errorHandler);
        return response;
    },
    removeFromWishlist: async (user_id, product) => {
        const response = await axios
            .post(`${serverUrl}/customers/wishlist/remove`, {
                user_id: user_id,
                product: product,
            })
            .catch(errorHandler);
        return response;
    },
};

export default customerService;
