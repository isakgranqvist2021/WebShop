import productMethods from '../../models/product.model';

async function template(req, res) {
    let products = await productMethods.populateCart(req.session.cart) || [];
    let totalCost = 0;

    products.map((product) => totalCost += product.price);

    return res.render('pages/cart', {
        title: 'Cart',
        config: req.headers.config,
        totalCost: Math.ceil(totalCost),
        cart: products,
        signedIn: req.session.uid != undefined ? true : false
    });
}

function action(req, res) {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    req.session.cart.push(req.params.pid);

    return res.redirect(req.headers.referer + '?success=added to cart');
}

export default { template, action };