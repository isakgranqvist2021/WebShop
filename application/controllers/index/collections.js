function template(req, res) {
    return res.render('pages/index/collections', {
        title: 'Collections',
        user: req.session.user,
        config: req.headers.config,
    });
}

export default { template };