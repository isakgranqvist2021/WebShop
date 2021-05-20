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
        unique: false,
        min: 2,
        max: 50
    },
    last_name: {
        type: String,
        required: true,
        unique: false,
        min: 2,
        max: 50
    },
    auth_type: {
        type: String,
        required: true,
        unique: false
    },
    password: {
        type: String,
        required: false,
        unique: false
    }
});

export default userSchema;