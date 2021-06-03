function template(req, res) {
    if (!req.session.user.admin) {
        return res.redirect('/');
    }

    return res.render('pages/add-product', {
        title: 'Add Product',
        config: req.headers.config,
        user: req.session.user
    })
}

function action(req, res) {
}

export default { template, action };