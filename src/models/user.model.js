import mongoose from "mongoose";

const schema = mongoose.Schema;

const userSchema = new schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
    },
    createAt: { type: Date, default: Date.now}
});

const User = mongoose.model('User', userSchema);
export default User;
