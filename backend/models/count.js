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

countSchema.statics.updateByName = function ({ name, date, count }) {
    return this.findOneAndUpdate({ name, date }, { $set: { count } }, { new: false, upsert: true });
};

countSchema.statics.findByName = function ({ name }) {
    return this.find({ name }).sort({ date: 1 });
};

countSchema.statics.findLastByName = function ({ name }) {
    return this.findOne({ name }).sort({ date: -1 });
};

countSchema.statics.findByNameBetweenDate = function ({ name, startDate, endDate }) {
    return this.find({ name, date: { $gte: startDate, $lte: endDate } }).sort({ date: 1 });
};

countSchema.statics.findAll = async function ({ date }) {
    return this.find({}).sort({ date: 1 });
};

export default mongoose.model('count', countSchema);