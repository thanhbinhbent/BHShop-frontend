import axios from 'axios';

const serverUrl = 'http://127.0.0.1:3100';

const errorHandler = (err) => {
    console.log(err);
};

const addressService = {
    getProvinceName: async (provinceId) => {
        const response = await axios.post(`${serverUrl}/provinceName`,{
          code: provinceId
        }).catch(errorHandler);
        return response;
    },
    getDistrictName: async (provinceId) => {
        const response = await axios.post(`${serverUrl}/districtName`,{
          code: provinceId
        }).catch(errorHandler);
        return response;
    },
    getWardName: async (wardId) => {
        const response = await axios.post(`${serverUrl}/wardName`,{
          code: wardId
        }).catch(errorHandler);
        return response;
    }
};

export default addressService;
