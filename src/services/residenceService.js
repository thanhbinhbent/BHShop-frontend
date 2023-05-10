import axios from 'axios';

const serverUrl = process.env.SERVER_URL || 'http://127.0.0.1:3100';

const errorHandler = (err) => {
    console.log(err);
};

const residenceService = {
    getResidences: async () => {
        const response = await axios.get(`${serverUrl}/residences`).catch(errorHandler);
        return response;
    },
    getProvinces: async () => {
        const response = await axios.get(`${serverUrl}/provinces`).catch(errorHandler);
        return response;
    },
};

export default residenceService;
