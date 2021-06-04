import getCollections from '../../config/page/collections';
import productMethods from '../../models/product.model';
import fs from 'fs';

async function get(req, res) {
    let collections = getCollections().collections.map(c => c.label);

    if (!req.query.q || !collections.includes(req.query.q)) {

        /*
            check if the q parameter is allowed and exists in the collections array
            otherwise assign the q field to 'all' to prevent unwanted queries
        */

        req.query.q = 'all';
    }

    const result = await productMethods.findProducts({
        product_collection: req.query.q.toLowerCase(),
        page: req.query.page || '1'
    });

    req.session.referer = `/products?q=${req.query.q.toLowerCase()}&page=${req.query.page || '1'}`;

    return res.json({
        q: req.query.q,
        collections: collections,
        result: result
    });
}

export default { get };