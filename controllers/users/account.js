function template(req, res) {
    if (req.session.uid === undefined) return res.redirect('/sign-in');


    res.render('pages/account', {
        signedIn: req.session.uid != undefined ? true : false
    });
}

function action(req, res) {
    res.redirect('/users/account');
}

export default { template, action };