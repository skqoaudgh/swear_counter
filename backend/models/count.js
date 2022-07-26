import mongoose from 'mongoose';

const countSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    count: { type: Number, required: true },
    date: { type: Date, required: true },
});

countSchema.statics.create = function (payload) {
    const count = new this(payload);
    return count.save();
};

countSchema.statics.updateByName = function (name, payload) {
  return this.findOneAndUpdate({ name }, payload, { new: true, upsert: true });
};

countSchema.statics.findByName = function (name) {
  return this.find({ name });
};

countSchema.statics.findAll = function () {
  return this.find({});
};


export default mongoose.model('count', countSchema);