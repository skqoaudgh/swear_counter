import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

userSchema.statics.create = function (payload) {
    const user = new this(payload);
    
    return user.save();
};

userSchema.statics.findById = function ({ id }) {
    return this.findOne({ _id: id });
};

userSchema.statics.findAllUsers = function () {
    return this.find({});
};

export default mongoose.model('user', userSchema);