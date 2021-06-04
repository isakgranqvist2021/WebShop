import productMethods from '../../models/product.model';
import data from '../../utils/data';

// helper functions
function calculateTotal(p) {
    let total = 0;
    p.forEach(pr => {
        total += (pr.price * pr.qty);
    });

    return Math.ceil(total);
}

async function getProduct(product) {
    return {
        ...await productMethods.findProduct(product._id),
        qty: product.qty
    };
}

async function template(req, res) {
    let cart = [];
    let totalCost = 0;

    if (req.session.cart) {
        cart = await Promise.all(req.session.cart.map(product => getProduct(product)));
        totalCost = calculateTotal(cart.map(product => ({ price: product.price, qty: product.qty })))
    }

    return res.render('pages/index/cart', {
        title: 'Cart',
        config: req.headers.config,
        totalCost: totalCost,
        cart: cart,
        user: req.session.user,
        data: {
            countries: data.countries()
        }
    });
}

function action_add(req, res) {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    let foundProduct = req.session.cart.find(product => product._id === req.params.pid);
    foundProduct != undefined ? foundProduct.qty++ : req.session.cart.push({
        _id: req.params.pid,
        qty: 1
    });

    return res.redirect(req.headers.referer + '?success=added to cart');
}

function action_remove(req, res) {
    let index = req.session.cart.findIndex(product => product._id === req.params.pid);
    let product = req.session.cart[index];

    if (product.qty > 1) {
        product.qty--;
    } else {
        req.session.cart.splice(index, 1);
    }

    return res.redirect('/cart' + '?success=product removed from cart');
}

function action(req, res) {
    return res.redirect(req.headers.referer);
}

export default { template, action, action_add, action_remove };