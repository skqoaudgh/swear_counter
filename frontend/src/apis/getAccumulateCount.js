import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getAccumulateCount = async ({ name, date }) => {
    const dateString = date.toISOString();
    const res = await axios.get(`/count/${name}?type=accumulate&date=${dateString}`);

    return res;
};

export default getAccumulateCount;