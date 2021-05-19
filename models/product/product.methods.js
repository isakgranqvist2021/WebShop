import mongoose from 'mongoose';
import productSchema from './product.schema';

const ProductModel = mongoose.model('Product', productSchema);

async function saveProduct(data) {

}

export default {
    saveProduct
}