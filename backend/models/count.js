import mongoose from 'mongoose';

const countSchema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, required: true },
    date: { type: Date, required: true, default: new Date() },
});

countSchema.statics.create = function (payload) {
    const count = new this(payload);
    return count.save();
};

countSchema.statics.updateByName = function (name, payload) {
    const date = new Date(new Date().toDateString());

    return this.findOneAndUpdate(
        { name, date: { $gte: date } },
        { $inc: { count: payload.count } },
        { new: false, upsert: true }
    );
};

countSchema.statics.findByName = function (name, { type = 'all' } = {}) {
    if (type === 'today') {
        const date = new Date(new Date().toDateString());
        return this.find({ name, date: { $gte: date } });
    }
    return this.find({ name });
};

countSchema.statics.findAll = async function ({ type = 'all', date }) {
    if (type === 'accumulate') {
        const current = new Date(date);
        current.setHours(0);
        current.setMinutes(0);
        current.setSeconds(0);

        const lastDay = new Date(current.setDate(current.getDate() - current.getDay() + 7));

        let lastDate = null;
        let lastCount = {};

        const res = await this.find({ date: { $lte: lastDay.toISOString() } }).sort({ date: 1 });
        const accumulateList = res.reduce((acc, cur) => {
            if (!acc || !acc[cur.name]) {
                acc[cur.name] = {};
            }

            const current = new Date(cur.date);
            const currentDate = current.getDate();
            
            if (lastDate && lastCount) {
                const timeA = current.getTime();
                const timeB = lastDate.getTime();

                const diffDay = Math.floor((timeA - timeB) / (1000 * 60 * 60 * 24));
                for (let i = 0; i < diffDay; i++) {
                    const a = new Date(current);
                    
                    a.setDate(a.getDate() - i);
                    acc[cur.name][a.getDate()] = lastCount[cur.name] || 0;
                }
            }

            
            if(!acc[cur.name][currentDate]) {
                acc[cur.name][currentDate] = lastCount[cur.name] || 0;
            }
            
            acc[cur.name][currentDate] += Number(cur.count);

            lastDate = current;
            lastCount[cur.name] = acc[cur.name][currentDate];

            return acc;
        }, {});

        return accumulateList;
    }

    return this.find({}).sort({ date: 1 });
};

export default mongoose.model('count', countSchema);