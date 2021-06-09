import productMethods from '../../models/product.model.js';

async function action(req, res) {
    req.body.on_sale = req.body.on_sale === 'on' ? true : false;
    req.body.on_sale_percentage = parseInt(req.body.on_sale_percentage) || 0;

    try {
        await productMethods.updateOne(req.params.pid, req.body);
        return res.redirect(req.headers.referer + '?success=updated product with id ' + req.params.pid)
    } catch (err) {
        return res.redirect(req.headers.referer + '?err=cannot update product');
    }
}

export default { action };
