import productMethods from '../../models/product.model';

async function template(req, res) {
    const product = await productMethods.findProduct(req.params.product_id);

    console.log(req.session.referer);

    res.render('pages/product', {
        title: 'Product',
        product: product,
        config: req.headers.config,
        referer: req.session.referer,
        signedIn: req.session.uid != undefined ? true : false
    })
}

export default { template };