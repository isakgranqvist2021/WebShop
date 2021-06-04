import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

    try {
        return await new ProductModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findProducts(filter) {
    try {
        let query = new Object();
        let options = {
            page: filter.page,
            limit: 20,
            select: {
                variants: 1,
                _id: 1,
                price: 1,
                title: 1
            },
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

        return await ProductModel.paginate(query, options);

    } catch (err) {
        return Promise.reject(err);
    }
}

async function findProduct(filter) {
    try {
        return await ProductModel.findById(filter).populate({
            path: 'variants',
            model: 'Variant',
            populate: {
                path: 'img',
                model: 'Image'
            }
        }).lean().exec();

    } catch (err) {
        return Promise.reject(err);
    }
}

async function findWithLimit(config) {
    try {
        return await ProductModel.find({
            product_collection: config.product_collection,
            _id: { $ne: config.exclude }
        }).limit(config.limit).populate({
            path: 'variants',
            model: 'Variant',
            populate: {
                path: 'img',
                model: 'Image'
            }
        }).exec();

    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    saveProduct,
    findProducts,
    findProduct,
    findWithLimit
}