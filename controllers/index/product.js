import productMethods from '../../models/product.model';

async function template(req, res) {
    const product = await productMethods.findProduct(req.params.product_id);
    const simillar_products = await productMethods.findWithLimit({ product_collection: product.product_collection }, 8);
    console.log(simillar_products);
    res.render('pages/product', {
        title: 'Product',
        product: product,
        simillar_products: simillar_products,
        config: req.headers.config,
        referer: req.session.referer,
        signedIn: req.session.uid != undefined ? true : false
    })
}

export default { template };