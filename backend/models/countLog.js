import mongoose from 'mongoose';

const countLogSchema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, required: true },
    date: { type: Date, required: true },
});

countLogSchema.statics.create = function (payload) {
    const count = new this(payload);

    return count.save();
};

countLogSchema.statics.findByNameBetweenDate = function ({ name, startDate, endDate }) {
    return this.aggregate([
        {
            $match: {
                name,
                date: { $gte: new Date(startDate), $lte: new Date(endDate) },
            },
        },
        {
            $sort: { date: -1 },
        },
        {
            $project: {
                name: 1,
                count: 1,
                date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                time: { $dateToString: { format: '%H시 %M분', date: '$date' } },
            },
        },
        {
            $group: {
                _id: {
                    name: '$name',
                    date: '$date',
                },
                list: { $push: { time: '$time', count: '$count' } },
            },
        },
    ]);
};

export default mongoose.model('count_log', countLogSchema);