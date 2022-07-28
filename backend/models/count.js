import mongoose from 'mongoose';

const countSchema = new mongoose.Schema({
    name: { type: String, required: true },
    count: { type: Number, required: true },
    date: { type: Date, required: true },
});

countSchema.statics.create = function (payload) {
    const count = new this(payload);
    return count.save();
};

countSchema.statics.updateByName = function (name, payload) {
    const date = new Date(new Date().toDateString());

    return this.findOneAndUpdate(
        { name, date: { $gte: date } },
        { $set: payload },
        { new: true, upsert: true }
    );
};

countSchema.statics.findByName = function (name, { type = 'all' } = {}) {
    if (type === 'today') {
        const date = new Date(new Date().toDateString());
        return this.find({ name, date: { $gte: date } });
    }
    return this.find({ name });
};

countSchema.statics.findAll = function ({ type = 'all' }) {
    if (type === 'week') {
        const today = new Date();
        const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
        const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

        return this.find({ $and: [{ date: { $gte: firstDay } }, { date: { $lte: lastDay } }] });
    }

    return this.find({}).sort({ date: 1 });
};

export default mongoose.model('count', countSchema);