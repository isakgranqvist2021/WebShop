function template(req, res) {
    res.render('pages/home', {
        title: 'Home',
        user: req.session.user,
        config: req.headers.config
    });
}

export default { template };