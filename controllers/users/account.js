import userMethods from '../../models/user.model';
import data from '../../utils/data';

function template(req, res) {
    console.log(req.session.user);

    res.render('pages/account', {
        title: 'Account',
        user: req.session.user,
        data: {
            countries: data.countries()
        },
        config: req.headers.config,
    });
}

function action(req, res) {
    res.redirect('/users/account');
}

export default { template, action };