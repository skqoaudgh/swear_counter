import CountLog from '../models/countLog.js';
import { getDateString } from '../../common/utils/date.js';

export const createCountLog = async ({ name, date, count }) => {
    const dateString = getDateString(date);

    return CountLog.create({ name, count, date: dateString });
};

export const getWeekCountLogByName = async ({ name, date }) => {
    const tmp = new Date(date);
    const firstDayOfWeek = new Date(tmp.setDate(tmp.getDate() - tmp.getDay()));
    const firstDayOfWeekString = getDateString(firstDayOfWeek);
    const lastDayOfWeek = new Date(tmp.setDate(tmp.getDate() - tmp.getDay() + 6));
    const lastDayOfWeekString = getDateString(lastDayOfWeek);

    const list = await CountLog.findByNameBetweenDate({
        name,
        startDate: firstDayOfWeekString,
        endDate: lastDayOfWeekString,
    });

    return list;
};

export default {
    createCountLog,
    getWeekCountLogByName,
};