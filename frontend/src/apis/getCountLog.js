import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getCountLog = async ({ name, date }) => {
    const dateString = date.toISOString();
    const res = await axios.get(`/count-logs/${name}?date=${dateString}`);

    return res;
};
export default getCountLog;