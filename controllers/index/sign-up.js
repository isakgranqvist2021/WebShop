import userMethods from '../../models/user.model';
import validators from '../../utils/validators';

function template(req, res) {
    res.render('pages/sign-up', {
        title: 'Sign Up',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

function action(req, res) {
    if (!req.params.authType)
        return res.redirect('/sign-up?err=we don\'t support the requested auth type');

    switch (req.params.authType) {
        case 'form-auth': return _signUpWithForm(req, res);
        case 'google-auth': return _signUpWithGoogle(req, res);
        default: return res.redirect('/sign-up?err=auth type does not exist');
    }
}

function _signUpWithForm(req, res) {
    if (Object.keys(req.body).length === 0) return res.redirect('/sign-up?err=missing body');
    if (!req.body.email) return res.redirect('/sign-up?err=missing email');
    if (!req.body.first_name) return res.redirect('/sign-up?err=missing first name');
    if (!validators.isOfLength(2, 50, req.body.first_name)) return res.redirect('/sign-up?err=first name has to be between 2 and 50 characters');
    if (!req.body.last_name) return res.redirect('/sign-up?err=missing last name');
    if (!validators.isOfLength(2, 50, req.body.last_name)) return res.redirect('/sign-up?err=last name has to be between 2 and 50 characters');
    if (!req.body.password) return res.redirect('/sign-up?err=missing password');
    if (!validators.isOfLength(8, 100, req.body.password)) return res.redirect('/sign-up?err=password has to be at least 8 characters');
    if (!req.body.confirm_password) return res.redirect('/sign-up?err=missing confirm password');
    if (req.body.password != req.body.confirm_password) return res.redirect('/sign-up?err=passwords do not match');
    if (!validators.emailValidator(req.body.email)) return res.redirect('/sign-up?err=email not approved');

    userMethods.signUpWithForm(req.body)
        .then(result => {
            req.session.regenerate((err) => {
                if (err)
                    return res.redirect('/sign-in?err=an error occured');

                req.session.uid = result;
                return res.redirect('/users/account?success=welcome');
            });
        })
        .catch(err => res.redirect('/sign-up?err=' + err));
}

function _signUpWithGoogle(req, res) {
    if (Object.keys(req.body).length === 0) return res.json({ message: 'missing body', success: false, data: null });
    if (!req.body.email) return res.json({ message: 'missing email', success: false, data: null });
    if (!req.body.first_name) return res.json({ message: 'missing first name', success: false, data: null });
    if (!validators.isOfLength(2, 50, req.body.first_name)) return res.json({ message: 'first name has to be between 2 and 50 characters', success: false, data: null });
    if (!req.body.last_name) return res.json({ message: 'missing last name', success: false, data: null });
    if (!validators.isOfLength(2, 50, req.body.last_name)) return res.json({ message: 'last name has to be between 2 and 50 characters', success: false, data: null });
    if (!validators.emailValidator(req.body.email)) return res.json({ message: 'email to weak', success: false, data: null });

    userMethods.signUpWithGoogle(req.body)
        .then(result => {

            req.session.regenerate((err) => {
                if (err) return res.json({ message: 'an error has occured', success: false, data: { redirect: '/' } })

                req.session.uid = result;
                return res.json({ message: 'account created', success: true, data: { redirect: '/users/account' } });
            });

        }).catch(err => res.json({ message: err, success: false, data: null }));
}

export default { template, action };