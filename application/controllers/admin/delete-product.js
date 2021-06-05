import productMethods from '../../models/product.model.js';

async function action(req, res) {
    try {
        await productMethods.deleteOne(req.params.pid);
        return res.redirect('/products' + '?success=deleted product with id ' + req.params.pid)
    } catch (err) {
        return res.redirect(req.headers.referer + '?err=cannot remove that product');
    }
}

export default { action };
