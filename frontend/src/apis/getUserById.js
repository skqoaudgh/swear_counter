import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getUserById = async (id) => {
    const res = await axios.get(`/users/${id}`);

    return res;
};

export default getUserById;