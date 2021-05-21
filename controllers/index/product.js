function template(req, res) {
    res.render('pages/product', {
        title: 'Product',
        product_id: req.params.product_id,
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    })
}

export default { template };