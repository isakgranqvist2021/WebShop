import userMethods from '../../models/user.model';

function template(req, res) {
    res.render('pages/account', {
        title: 'Account',
        user: req.session.user,
        config: req.headers.config,
    });
}

function action(req, res) {
    res.redirect('/users/account');
}

export default { template, action };