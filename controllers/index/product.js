function template(req, res) {
    res.render('pages/product', {
        title: 'Product',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    })
}

export default { template };