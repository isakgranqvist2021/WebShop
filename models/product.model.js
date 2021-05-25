import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import variantMethods from './variant.model';
import imageMethods from './image.model';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    product_collection: { type: String, required: true },
    on_sale: { type: Boolean, default: false },
    on_sale_price: { type: Number, required: false },
    description: [String],
    price: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    variants: [{ type: Schema.Types.ObjectId, ref: 'Variant' }]
});

productSchema.plugin(mongoosePaginate);

const ProductModel = mongoose.model('Product', productSchema);

async function saveProduct(data) {
    data["product_collection"] = data["product_collection"].toLowerCase();
    data["title"] = data["title"].toLowerCase();

    return new Promise((resolve, reject) => {
        new ProductModel(data)
            .save((err, newProduct) => {
                if (err) return reject(err);
                return resolve(newProduct);
            });
    });
}

async function findProducts(filter) {
    return new Promise((resolve, reject) => {
        let query = new Object();
        let options = {
            page: filter.page,
            limit: 25,
            populate: {
                path: 'variants',
                model: 'Variant',
                populate: {
                    path: 'img',
                    model: 'Image'
                }
            }
        };

        if (filter.product_collection != 'all')
            query = { product_collection: filter.product_collection };

        if (filter.product_collection === 'on_sale')
            query = { on_sale: true };

        ProductModel.paginate(query, options, (err, result) => {
            if (err) return reject(err);
            if (!result.docs) reject('zero docs');
            resolve(result);
        });
    });
}

async function findProduct(filter) {
    return new Promise((resolve, reject) => {
        ProductModel.findById(filter).populate({
            path: 'variants',
            model: 'Variant',
            populate: {
                path: 'img',
                model: 'Image'
            }
        }).exec((err, product) => {
            if (err) return reject(err);
            return resolve(product);
        });
    });
}

export default {
    saveProduct,
    findProducts,
    findProduct
}