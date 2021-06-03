import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const UserModel = mongoose.model('User', new Schema({
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true, unique: false, min: 2, max: 50 },
    last_name: { type: String, required: true, unique: false, min: 2, max: 50 },
    country: { type: String, required: false, default: '' },
    address: { type: String, required: false, default: '' },
    state: { type: String, required: false, default: '' },
    zip: { type: String, required: false, default: '' },
    auth_type: { type: String, required: true, unique: false },
    password: { type: String, required: false, unique: false },
    admin: { type: Boolean, default: false }
}));

/* form auth */
async function signUpWithForm(data) {
    try {
        await _duplication(data.email); // check for duplication, some nasty errors might occur if the same email is used twice
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);

        return await new UserModel({
            email: data.email.toLowerCase(),
            first_name: data.first_name.toLowerCase(),
            last_name: data.last_name.toLowerCase(),
            password: hash,
            auth_type: 'form'
        }).save();

    } catch (err) {
        return err;
    }
}

async function signInWithForm(data) {
    try {
        const user = await UserModel.findOne({ email: data.email });

        if (!user) throw 'user not found';

        const OK = bcrypt.compareSync(data.password, user.password)

        if (!OK) throw 'not good';

        return user;

    } catch (err) {
        return Promise.reject(err);
    }
}

/* google auth */
async function signUpWithGoogle(data) {
    try {
        await _duplication(data.email); // check for duplication, some nasty errors might occur if the same email is used twice

        return await new UserModel({
            email: data.email.toLowerCase(),
            first_name: data.first_name.toLowerCase(),
            last_name: data.last_name.toLowerCase(),
            password: null,
            auth_type: 'google'
        }).save();

    } catch (err) {
        return Promise.reject(err);
    }
}

async function signInWithGoogle(data) {
    try {
        return await UserModel.findOne({ email: data.toLowerCase() });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function _duplication(email) {
    // make a query and check if a user with the email in the body exists
    // prevent duplicate emails
    try {
        return await UserModel.findOne({ email: email.toLowerCase() });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findOneWithId(id) { // find a user with _id 
    try {
        return UserModel.findOne({ _id: id });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateOne(id, data) {
    try {
        return await UserModel.findByIdAndUpdate(id, data);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function deleteOne(id) {
    try {
        return await UserModel.findByIdAndRemove(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    signUpWithForm,
    signInWithForm,
    signUpWithGoogle,
    signInWithGoogle,
    findOneWithId,
    updateOne,
    deleteOne
};