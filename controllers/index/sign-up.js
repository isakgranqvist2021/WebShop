import UserMethods from '../../models/user/user.methods';

function template(req, res) {
    res.render('pages/sign-up', {});
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
    if (req.body.password != req.body.confirm_password) return res.redirect('/sign-up?err=passwords do not match');

    UserMethods.signUpWithForm(req.body)
        .then(result => res.redirect('/sign-in?success=account created'))
        .catch(err => res.redirect('/sign-up?err=' + err));
}

function _signUpWithGoogle(req, res) {
    if (!req.body.email) return res.json({ message: 'missing email', success: false, data: null });
    if (!req.body.first_name) return res.json({ message: 'missing first name', success: false, data: null });
    if (!req.body.last_name) return res.json({ message: 'missing last name', success: false, data: null });

    UserMethods.signUpWithGoogle(req.body)
        .then(result => res.json({ message: 'account created', success: true, data: null }))
        .catch(err => res.json({ message: err, success: false, data: null }));
}

export default { template, action };