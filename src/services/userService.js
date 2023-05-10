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

const userService = {
    getAllUsers: async () => {
        const response = await axios.get(`${serverUrl}/users`).catch(errorHandler);
        return response;
    },
    login: async (user) => {
        const response = await axios.post(`${serverUrl}/users`, user).catch(errorHandler);
        return response;
    },
    register: async (user) => {
        const response = await axios
            .post(`${serverUrl}/users/regis`, user)
            .catch(errorHandler);
        return response;
    },
    update: async (user) => {
        const response = await axios.put(`${serverUrl}/users`, user).catch(errorHandler);
        return response;
    },
    changePassword: async (user) => {
        const response = await axios
            .put(`${serverUrl}/users/changePassword`, user)
            .catch(errorHandler);
        return response;
    },
    delete: async (user) => {
        const response = await axios
            .delete(`${serverUrl}/users`, user)
            .catch(errorHandler);
        return response;
    },
};

export default userService;
