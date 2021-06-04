function template(req, res) {
    return res.render('pages/index/404', {
        title: 'Page Not Found',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

export default { template }