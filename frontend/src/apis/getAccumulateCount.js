import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getAccumulateCount = async (date) => {
    const res = await axios.get(`/count?type=accumulate&date=${date}`);
    
    return res;
};

export default getAccumulateCount;