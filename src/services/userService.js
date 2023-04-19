import axios from 'axios';

const apiUrl = '/data/orders.json';

const userService = {
  getAllUsers: async () => {
    const response = await axios.get(`http://127.0.0.1:3100/users`).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err);
    });
  },
};

export default orderService;
