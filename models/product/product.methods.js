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
        ProductModel.find(filter, (err, products) => {
            if (err) return reject(err);
            if (!products) return reject('zero products');

            return resolve(products);
        });
    });
}

export default {
    saveProduct,
    findProducts
}