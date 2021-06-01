import userMethods from '../../models/user.model';
import validators from '../../utils/validators';
import data from '../../utils/data';

function template(req, res) {
    res.render('pages/account', {
        title: 'Account',
        user: req.session.user,
        data: {
            countries: data.countries()
        },
        config: req.headers.config,
    });
}

async function action(req, res) {
    if (!validators.emailValidator(req.body.email)) return res.redirect('/users/account' + '?err=that email was really poor');

    try {
        await userMethods.updateOne(req.session.user._id, req.body);
        return res.redirect('/users/account' + '?success=your account has been updated');
    } catch (err) {
        return res.redirect('/users/account' + '?err=missing one or more fields');
    }
}

async function action_delete_account(req, res) {
    try {

        await userMethods.deleteOne(req.session.user._id);
        req.session.uid = null;
        req.session.user = null;
        req.session.destroy();
        return res.redirect('/sign-up' + '?err=sorry to see you go');

    } catch (err) {
        return res.redirect('/' + '?err=something went wrong');
    }
}

export default { template, action, action_delete_account };