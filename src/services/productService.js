import axios from 'axios';

const serverUrl = 'http://127.0.0.1:3100';

const errorHandler = (err) => {
    console.log(err);
};

const productService = {
    getAllProduct: async () => {
        const response = await axios.get(`${serverUrl}/products`).catch(errorHandler);
        return response;
    },
    getProduct: async (id) => {
        const response = await axios.get(`${serverUrl}/products/${id}`).catch(errorHandler);
        return response;
    },
    getAllProductWithOnlyName: async () => {
        const response = await axios.post(`${serverUrl}/products/allWithOnlyName`).catch(errorHandler);
        return response;
    },
    getCategoryNameByProductId: async (id) => {
        const response = await axios.post(`${serverUrl}/categories/name`,id).catch(errorHandler);
        return response;
    },
};

export default productService;
