const onlyWithoutAuth = [
    '/sign-in',
    '/sign-up'
];

function hasNotAuth(req, res, next) {
    if (onlyWithoutAuth.includes(req.url) && req.session.uid != undefined) {
        return res.redirect('/users/account');
    }

    return next();
}

function hasAuth(req, res, next) {
    if (!req.session.uid) {
        return res.redirect('/sign-in');
    }

    return next();
}

export default { hasNotAuth, hasAuth };