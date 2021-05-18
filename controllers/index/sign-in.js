import UserMethods from '../../models/user/user.methods';
import validators from '../../utils/validators';

function template(req, res) {
    res.render('pages/sign-in', {
        signedIn: req.session.uid != undefined ? true : false
    });
}

function action(req, res) {
    switch (req.params.authType) {
        case 'form-auth': return _signInWithForm(req, res);
        case 'google-auth': return _signInWithGoogle(req, res);
        default: return res.redirect('/sign-in');
    }
}

function _signInWithForm(req, res) {
    if (!req.body.email) return res.redirect('/sign-in?err=missing email');
    if (!req.body.password) return res.redirect('/sign-in?err=missing password');
    if (!validators.emailValidator(req.body.email)) return res.redirect('/sign-in?err=email not approved');

    UserMethods.auth.form.signInWithForm(req.body)
        .then(result => {
            req.session.regenerate((err) => {
                if (err) return res.redirect('/sign-in?err=internal error');

                req.session.uid = result._id;
                return res.redirect('/users/account?success=whalecum ' + result.first_name);
            });

        }).catch(err => res.redirect('/sign-in?err=invalid email or password'));
}


function _signInWithGoogle(req, res) {
    if (!req.body.email) return res.json({ message: 'missing email', success: false, data: null });

    UserMethods.auth.google.signInWithGoogle(req.body.email)
        .then(result => {
            req.session.regenerate((err) => {
                if (err) return res.json({ message: 'internal server error', success: false, data: null });

                req.session.uid = result._id;
                return res.json({ message: 'whalecum ' + result.first_name, success: true, data: { redirect: '/users/account' } });
            });

        }).catch(err => res.redirect('/sign-in?err=invalid email or password'));
}

export default { template, action };