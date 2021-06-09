import userMethods from '../../models/user.model';
import validators from '../../utils/validators';


function template(req, res) {
    res.render('pages/index/sign-in', {
        title: 'Sign In',
        user: req.session.user,
        config: req.headers.config
    });
}

async function action(req, res) {
    switch (req.params.authType) {
        case 'form-auth':
            try {
                const result = await _signInWithForm(req.body);

                if (typeof (result) === 'string') throw result;

                req.session.uid = result._id;
                return res.redirect('/users/account' + '?success=' + 'you have been signed in');

            } catch (err) {
                return res.redirect('/sign-in' + '?err=' + err)
            }

        case 'google-auth':
            try {
                const result = await _signInWithGoogle(req.body.email);
                req.session.uid = result.uid;
                delete result.uid;
                return res.json(result);
            } catch (err) {
                return res.json(err);
            }

        default: return res.status(403).redirect('/sign-in?err=auth type does not exist');
    }
}

async function _signInWithForm(data) {
    if (!data.email) throw Error('missing email');;
    if (!data.password) throw Error('missing password');
    if (!validators.emailValidator(data.email)) throw Error('email not approved');

    return await userMethods.signInWithForm(data);
}


async function _signInWithGoogle(email) {
    if (!email) return {
        message: 'missing email',
        success: false,
        data: null
    };

    try {
        const user = await userMethods.signInWithGoogle(email);

        return {
            uid: user._id,
            message: 'welcome ' + user.first_name,
            success: true,
            data: { redirect: '/users/account' }
        }
    } catch (err) {
        return {
            message: 'you probably have an account already',
            success: false,
            data: null
        }
    }
}



export default { template, action };