import UserModel from './user.model';
import bcrypt from 'bcryptjs';

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
                        }).save((err) => {
                            if (err) return reject(err);

                            return resolve('saved');
                        });
                    });
                });

            }).catch(err => reject(err));
    });
}

async function signInWithForm(data) {
    console.log(data);

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
        _duplication(data.email) // check for duplication, some nasty errors might occur if the same email is used twice
            .then(() => {
                new UserModel({
                    email: data.email.toLowerCase(),
                    first_name: data.first_name.toLowerCase(),
                    last_name: data.last_name.toLowerCase(),
                    password: null,
                    auth_type: 'google'
                }).save((err) => {
                    console.log(err);

                    if (err) return reject(err);

                    return resolve('saved');
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
            if (!user) return resolve();
        });
    });
}

export default {
    access: {},
    auth: {
        form: {
            signUpWithForm,
            signInWithForm
        },
        google: {
            signUpWithGoogle,
            signInWithGoogle
        }
    }
};