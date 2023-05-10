import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://127.0.0.1:3100';

const errorHandler = (err) => {
    console.log(err);
};

const categoryService = {
    getAllCategory: async () => {
        const response = await axios.get(`${serverUrl}/categories`).catch(errorHandler);
        return response;
    },
};

export default categoryService;
