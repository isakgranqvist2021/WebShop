import productMethods from '../../models/product.model';

async function template(req, res) {
    const product = await productMethods.findProduct(req.params.product_id);
    const simillar_products = await productMethods.findWithLimit({
        product_collection: product.product_collection,
        limit: 8,
        exclude: req.params.product_id
    });

    res.render('pages/product', {
        title: 'Product',
        user: req.session.user,
        product: product,
        simillar_products: simillar_products,
        config: req.headers.config,
        referer: req.session.referer
    })
}

export default { template };