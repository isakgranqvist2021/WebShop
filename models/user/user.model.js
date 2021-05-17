import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true,
        unique: false
    },
    last_name: {
        type: String,
        required: true,
        unique: false
    },
    auth_type: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String
    }
});

export default mongoose.model('User', userSchema);