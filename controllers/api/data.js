import productMethods from '../../models/product.model';
import variantMethods from '../../models/variant.model';
import imageMethods from '../../models/image.model';

async function set(req, res) {

    for (let i = 0; i < req.body.variants.length; i++) {
        req.body.variants[i].img = await imageMethods.saveImage(req.body.variants[i].img);
        req.body.variants[i] = await variantMethods.saveVariant(req.body.variants[i]);
    }

    try {
        const result = await productMethods.saveProduct(req.body);
        return res.json(result);
    } catch (err) {
        return res.json(err);
    }
}

async function get(req, res) {
    let products = await productMethods.findProducts({ product_collection: 'all' });

    return res.json(products);
}

export default { get, set };