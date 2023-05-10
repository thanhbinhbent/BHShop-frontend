import axios from 'axios';

let serverUrl = '';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    serverUrl = 'http://127.0.0.1:3100';
} else {
    serverUrl = process.env.REACT_APP_SERVER_URL;
}

const errorHandler = (error) => {
    if (error.response) {
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        return error.response;
    }
};

const newsLetterService = {
    postEmail: async (email) => {
        const response = await axios
            .post(`${serverUrl}/newsletters`, email)
            .catch(errorHandler);
        return response;
    },
};

export default newsLetterService;
