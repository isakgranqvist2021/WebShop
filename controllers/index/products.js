import getCollections from '../../config/page/collections';
import productMethods from '../../models/product/product.methods';

async function template(req, res) {
    if (!req.query.q || !getCollections().collections.map(c => c.label).includes(req.query.q)) {

        /*
            check if the q parameter is allowed and exists in the collections array
            otherwise assign the q field to 'all' to prevent unwanted queries
        */

        req.query.q = 'all';
    }


    const result = await productMethods.findProducts({
        product_collection: req.query.q,
        page: req.query.page || '1'
    });

    return res.render('pages/products', {
        title: 'Products',
        q: req.query.q,
        result: result,
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

export default { template };