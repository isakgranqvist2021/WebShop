import productMethods from '../../models/product.model.js';

async function action(req, res) {
    try {
        await productMethods.updateOne(req.params.pid, req.body);
        return res.json({
            message: 'updated product with id ' + req.params.pid,
            success: true,
            data: null
        });
    } catch (err) {
        console.log(err);
        return res.json({
            message: 'null',
            success: false,
            data: null
        });
    }
}

export default { action };
