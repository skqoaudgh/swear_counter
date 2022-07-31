import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getWeekCount = async (date) => {
    const res = await axios.get(`/count?type=week&date=${date}`);
    
    return res;
};

export default getWeekCount;