import productMethods from '../../models/product.model';

function calculateTotal(p) {
    let total = 0;
    p.forEach(pr => {
        total += (pr.price * pr.qty);
    });

    return Math.ceil(total);
}

async function template(req, res) {
    Promise.all(req.session.cart.map(async (product) =>
    ({
        ...await productMethods.findProduct(product._id),
        qty: product.qty
    })
    )).then(cart => {
        return res.render('pages/cart', {
            title: 'Cart',
            config: req.headers.config,
            totalCost: calculateTotal(cart.map(product => ({ price: product.price, qty: product.qty }))),
            cart: cart || [],
            signedIn: req.session.uid != undefined ? true : false
        });
    });
}

function action(req, res) {
    if (!req.session.cart) {
        req.session.cart = [];
    }

    if (req.params.action === 'add') {
        let foundProduct = req.session.cart.find(product => product._id === req.params.pid);
        foundProduct != undefined ? foundProduct.qty++ : req.session.cart.push({
            _id: req.params.pid,
            qty: 1
        });

        return res.redirect(req.headers.referer + '?success=added to cart');
    }

    if (req.params.action === 'remove') {
        let index = req.session.cart.findIndex(product => product._id === req.params.pid);
        let product = req.session.cart[index];

        if (product.qty > 1) {
            product.qty--;
        } else {
            req.session.cart.splice(index, 1);
        }

        return res.redirect('/cart' + '?success=product removed from cart');
    }

    return res.redirect(req.headers.referer);
}

export default { template, action };