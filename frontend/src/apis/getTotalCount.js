import axios from 'axios';

axios.defaults.baseURL = 'https://swear-count-api.run.goorm.io';

const getTotalCount = async (name) => {
    const res = await axios.get(`/count/${name}?type=sum`);

    return res;
};

export default getTotalCount;