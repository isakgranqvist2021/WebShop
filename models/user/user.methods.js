import UserModel from './user.model';

async function signUpWithForm(data) {
    return new Promise((resolve, reject) => {
        _duplication(data.email)
            .then(() => {
                new UserModel({
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    password: data.password,
                    auth_type: 'form'
                }).save((err) => {
                    if (err) return reject(err);

                    return resolve('saved');
                });
            }).catch(err => reject(err));
    });
}

async function signUpWithGoogle(data) {
    return new Promise((resolve, reject) => {
        _duplication(data.email)
            .then(() => {
                new UserModel({
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    password: null,
                    auth_type: 'google'
                }).save((err) => {
                    if (err) return reject(err);

                    return resolve('saved');
                });
            }).catch(err => reject(err));
    });
}

async function _duplication(email) {
    // make a query and check if a user with the email in the body exists
    // prevent duplicate emails

    return new Promise((resolve, reject) => {
        UserModel.findOne({ email: email }, (err, user) => {
            if (err) return reject(err);
            if (user) return reject('user already exists');
            if (!user) return resolve();
        });
    });
}

export default { signUpWithForm, signUpWithGoogle };