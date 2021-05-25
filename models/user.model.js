import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const UserModel = mongoose.model('User', new Schema({
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true, unique: false, min: 2, max: 50 },
    last_name: { type: String, required: true, unique: false, min: 2, max: 50 },
    auth_type: { type: String, required: true, unique: false },
    password: { type: String, required: false, unique: false }
}));

/* form auth */
async function signUpWithForm(data) {
    return new Promise((resolve, reject) => {
        _duplication(data.email) // check for duplication, some nasty errors might occur if the same email is used twice
            .then(() => {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) return reject(err);

                    bcrypt.hash(data.password, salt, (err, hash) => {
                        if (err) return reject(err);

                        new UserModel({
                            email: data.email.toLowerCase(),
                            first_name: data.first_name.toLowerCase(),
                            last_name: data.last_name.toLowerCase(),
                            password: hash,
                            auth_type: 'form'
                        }).save((err, newDoc) => {
                            if (err) return reject(err);

                            return resolve(newDoc._id);
                        });
                    });
                });

            }).catch(err => reject(err));
    });
}

async function signInWithForm(data) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: data.email }, (err, user) => {
            if (err) return reject(err);
            if (!user) return reject('no user');

            bcrypt.compare(data.password, user.password)
                .then(result => {
                    if (!result) return reject(false);

                    return resolve(user);
                });
        });
    });
}

/* google auth */
async function signUpWithGoogle(data) {
    return new Promise((resolve, reject) => {
        return _duplication(data.email) // check for duplication, some nasty errors might occur if the same email is used twice
            .then((ok) => {
                new UserModel({
                    email: data.email.toLowerCase(),
                    first_name: data.first_name.toLowerCase(),
                    last_name: data.last_name.toLowerCase(),
                    password: null,
                    auth_type: 'google'
                }).save((err, newDoc) => {
                    if (err) return reject(err);

                    return resolve(newDoc._id);
                });

            }).catch(err => reject(err));
    });
}

async function signInWithGoogle(data) {
    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: data.toLowerCase() }, (err, user) => {
            if (err) return reject(err);
            if (!user) return reject('no user');

            return resolve(user);
        });
    });
}

async function _duplication(email) {
    // make a query and check if a user with the email in the body exists
    // prevent duplicate emails

    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: email.toLowerCase() }, (err, user) => {
            if (err) return reject(err);
            if (user) return reject('user already exists');
            if (!user) return resolve(true);
        });
    });
}

async function findOneWithId(id) { // find a user with _id 
    return new Promise((resolve, reject) => {
        UserModel.findOne({ _id: id }, (err, user) => {
            if (err) return reject(err);
            if (!user) return reject('no user');

            return resolve(user);
        });
    });
}

export default {
    signUpWithForm,
    signInWithForm,
    signUpWithGoogle,
    signInWithGoogle,
    findOneWithId
};