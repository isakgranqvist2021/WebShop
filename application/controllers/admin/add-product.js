import getCollections from '../../config/page/collections';
import imageMethods from '../../models/image.model';
import variantMethods from '../../models/variant.model';
import productMethods from '../../models/product.model';

function template(req, res) {
    return res.render('pages/admin/add-product', {
        title: 'Add Product',
        config: req.headers.config,
        data: {
            collections: getCollections().collections.map(c => c.label)
        },
        user: req.session.user
    })
}

async function action(req, res) {
    for (let i = 0; i < req.body.variants.length; i++) {
        req.body.variants[i].img = await imageMethods.saveImage(req.body.variants[i].img);
        req.body.variants[i] = await variantMethods.saveVariant(req.body.variants[i]);
    }

    try {
        const result = await productMethods.saveProduct(req.body);
        return res.json({
            message: 'added product',
            success: true,
            data: result
        });
    } catch (err) {
        return res.json({
            message: null,
            success: false,
            data: null
        });
    }
}

async function upload_img(req, res) {
    if (req.file != undefined) {
        return res.json({
            message: null,
            success: true,
            data: req.file
        });
    }

    return res.json({
        message: null,
        success: false,
        data: null
    });
}

export default { template, action, upload_img };