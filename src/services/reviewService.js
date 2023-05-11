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

const reviewService = {
  getReviewById: async (id) => {
    const response = await axios.get(`${serverUrl}/reviews/${id}`).catch(errorHandler);
    return response;
  }
};

export default reviewService;
