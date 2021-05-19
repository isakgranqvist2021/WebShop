function template(req, res) {
    const query = {
        filter: req.query.q || 'all'
    }

    return res.render('pages/products', {
        title: 'Products',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

export default { template };