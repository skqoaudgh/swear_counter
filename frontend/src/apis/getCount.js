import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getCount = async (name) => {
    const res = await axios.get(`/count/${name}`);
    
    return res;
};

export default getCount;