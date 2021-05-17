import UserMethods from '../../models/user/user.methods';

function template(req, res) {
    if (req.session.uid === undefined) return res.redirect('/sign-in');

    UserMethods.access.findOneWithId(req.session.uid)
        .then(user => {
            res.render('pages/account', {
                signedIn: req.session.uid != undefined ? true : false,
                user: {
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                }
            });

        }).catch(err => res.redirect('/'));
}

function action(req, res) {
    res.redirect('/users/account');
}

export default { template, action };