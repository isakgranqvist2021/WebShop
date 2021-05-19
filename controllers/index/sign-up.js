import userMethods from '../../models/user/user.methods';
import validators from '../../utils/validators';

function template(req, res) {
    res.render('pages/sign-up', {
        title: 'Sign Up',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

function action(req, res) {
    switch (req.params.authType) {
        case 'form-auth': return _signUpWithForm(req, res);
        case 'google-auth': return _signUpWithGoogle(req, res);
        default: return res.redirect('/sign-up');
    }
}

function _signUpWithForm(req, res) {
    if (!req.body.email) return res.redirect('/sign-up?err=missing email');
    if (!req.body.first_name) return res.redirect('/sign-up?err=missing first name');
    if (!req.body.last_name) return res.redirect('/sign-up?err=missing last name');
    if (!req.body.password) return res.redirect('/sign-up?err=missing password');
    if (!req.body.confirm_password) return res.redirect('/sign-up?err=missing confirm password');
    if (req.body.password.length < 8) return res.redirect('/sign-up?err=password too short');
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
    if (!req.body.email) return res.json({ message: 'missing email', success: false, data: null });
    if (!req.body.first_name) return res.json({ message: 'missing first name', success: false, data: null });
    if (!req.body.last_name) return res.json({ message: 'missing last name', success: false, data: null });

    userMethods.signUpWithGoogle(req.body)
        .then(result => {
            req.session.regenerate((err) => {
                if (err)
                    return res.json({ message: 'an error has occured', success: false, data: { redirect: '/' } })

                req.session.uid = result;
                return res.json({ message: 'account created', success: true, data: { redirect: '/users/account' } });
            });
        }).catch(err => res.json({ message: err, success: false, data: null }));
}

export default { template, action };