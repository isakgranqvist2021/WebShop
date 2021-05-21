import mongoose from 'mongoose';
import productSchema from './product.schema';

const ProductModel = mongoose.model('Product', productSchema);

async function saveProduct(data) {
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
        let query = {};

        if (filter.product_collection != 'all')
            query = { product_collection: filter.product_collection };



        let options = {
            page: filter.page,
            limit: 10
        }

        ProductModel.paginate(query, options, (err, result) => {
            if (err) return reject(err);
            if (!result.docs) reject('zero docs');
            resolve(result);
        });
    });
}

export default {
    saveProduct,
    findProducts
}