import Count from '../models/count.js';
import { getDateString } from '../../common/utils/date.js';

export const createCount = async (name, date) => {
    const dateString = getDateString(date);
    const data = await Count.findLastByName({ name });
    const lastCount = data?.count || 0;

    return Count.create({ name, count: lastCount, date: dateString });
};

export const updateCount = ({ name, date, count }) => {
    const dateString = getDateString(date);

    return Count.updateByName({ name, date: dateString, count });
};

export const getTotalCountByName = async ({ name }) => {
    const data = await Count.findLastByName({ name });
    const totalCount = data?.count || 0;

    return totalCount;
};

export const getWeekCountByName = async ({ name, date }) => {
    const tmp = new Date(date);
    const firstDayOfWeek = new Date(tmp.setDate(tmp.getDate() - tmp.getDay()));
    const firstDayOfWeekString = getDateString(firstDayOfWeek);
    const lastDayOfWeek = new Date(tmp.setDate(tmp.getDate() - tmp.getDay() + 6));
    const lastDayOfWeekString = getDateString(lastDayOfWeek);

    const list = await Count.findByNameBetweenDate({
        name,
        startDate: firstDayOfWeekString,
        endDate: lastDayOfWeekString,
    });

    const current = new Date(firstDayOfWeek);
    const accumulateList = new Array(7).fill().map((_, index) => {
        const currentDateString = getDateString(current);
        const data = list.find(({ date }, index) => getDateString(date) === currentDateString);
        const count = data?.count || null;

        current.setDate(current.getDate() + 1);
        return count;
    });

    return accumulateList;
};

export const getRawDataByName = ({ name }) => {
    return Count.findByName({ name });
};

export default {
    createCount,
    updateCount,
    getTotalCountByName,
    getWeekCountByName,
    getRawDataByName,
};