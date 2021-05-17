function template(req, res) {
    res.render('pages/account', {});
}

function action(req, res) {
    res.redirect('/users/account');
}

export default { template, action };