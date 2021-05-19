import getCollections from '../../config/page/collections';

function template(req, res) {
    if (!req.query.q || !getCollections().collections.map(c => c.label).includes(req.query.q)) {

        /*
            check if the q parameter is allowed and exists in the collections array
            otherwise assign the q field to 'all' to prevent unwanted queries
        */

        req.query.q = 'all';
    }

    /*
        find all products for the given q parameter
    */

    return res.render('pages/products', {
        title: 'Products',
        config: req.headers.config,
        signedIn: req.session.uid != undefined ? true : false
    });
}

export default { template };