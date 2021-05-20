import mongoose from 'mongoose';
import productSchema from './product.schema';

const ProductModel = mongoose.model('Product', productSchema);

const demoProduct = {
    title: 'Red Coat',
    product_collection: 'shirts',
    description: ['Waterproof coat', 'Super useful for dog owners who like to walk in the rain'],
    price: 39.99,
    variants: [
        {
            color: 'Red',
            img: {
                src: 'https://website.static/images/red.jpg',
                alt: 'Red Item'
            }
        },
        {
            color: 'Blue',
            img: {
                src: 'https://website.static/images/blue.jpg',
                alt: 'Blue Item'
            }
        }
    ]
}

async function saveProduct(data) {
    new ProductModel(demoProduct)
        .save(err => {
            if (err) {
                console.log(err);
            }

            console.log('saved product');
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