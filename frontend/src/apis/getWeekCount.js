import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getTodayCount = async (name) => {
    const res = await axios.get(`/count?type=week`);
    
    return res;
};

export default getTodayCount;