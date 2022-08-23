import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getAllUsers = async () => {
    const res = await axios.get('/users');

    return res;
};

export default getAllUsers;