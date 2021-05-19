import userMethods from '../../models/user/user.methods';

function template(req, res) {
    userMethods.findOneWithId(req.session.uid)
        .then(user => {
            res.render('pages/account', {
                title: 'Account',
                config: req.headers.config,
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