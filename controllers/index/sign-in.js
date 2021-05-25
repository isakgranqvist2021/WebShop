import userMethods from '../../models/user.model';
import validators from '../../utils/validators';


function template(req, res) {
    res.render('pages/sign-in', {
        title: 'Sign In',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

function action(req, res) {
    switch (req.params.authType) {
        case 'form-auth': return _signInWithForm(req, res);
        case 'google-auth': return _signInWithGoogle(req, res);
        default: return res.status(403).redirect('/sign-in?err=auth type does not exist');
    }
}

function _signInWithForm(req, res) {
    if (!req.body.email) return res.redirect('/sign-in?err=missing email');
    if (!req.body.password) return res.redirect('/sign-in?err=missing password');
    if (!validators.emailValidator(req.body.email)) return res.redirect('/sign-in?err=email not approved');

    userMethods.signInWithForm(req.body)
        .then(result => {
            req.session.regenerate((err) => {
                if (err) return res.redirect('/sign-in?err=internal error');

                req.session.uid = result._id;
                return res.redirect('/users/account?success=welcome ' + result.first_name);
            });

        }).catch(err => res.redirect('/sign-in?err=invalid email or password'));
}


function _signInWithGoogle(req, res) {
    if (!req.body.email) return res.json({ message: 'missing email', success: false, data: null });

    userMethods.signInWithGoogle(req.body.email)
        .then(result => {
            req.session.regenerate((err) => {
                if (err) return res.json({ message: 'internal server error', success: false, data: null });

                req.session.uid = result._id;
                return res.json({ message: 'welcome ' + result.first_name, success: true, data: { redirect: '/users/account' } });
            });

        }).catch(err => res.redirect('/sign-in?err=invalid email or password'));
}

export default { template, action };