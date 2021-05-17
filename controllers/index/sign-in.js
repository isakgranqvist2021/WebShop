function template(req, res) {
    res.render('pages/sign-in', {});
}

function action(req, res) {
    console.log(req.body);

    res.redirect('/sign-in');
}

export default { template, action };