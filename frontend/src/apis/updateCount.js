import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const updateCount = async (name, count) => {
    const res = await axios.post(`/counts/${name}`, {
        count,
    });
    
    return res;
};

export default updateCount;