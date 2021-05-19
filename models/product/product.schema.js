import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {},
    description: [

    ],
    price: { type: Number, required: true },
    reviews: { default: [] },
    images: { default: [] }
});

export default productSchema;