import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    review: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now() },
    user: {
        email: { type: String, required: true, unique: false },
        _id: { type: Schema.Types.ObjectId, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true }
    }
});

const imgSchema = new Schema({
    src: { type: String, required: true },
    alt: { type: String, required: true }
});

const variantSchema = new Schema({
    color: { type: String, required: true },
    img: { type: imgSchema, required: true }
});

const productSchema = new Schema({
    title: { type: String, required: true },
    product_collection: { type: String, required: true },
    on_sale: { type: Boolean, default: false },
    on_sale_price: { type: Number, required: false },
    description: [String],
    price: { type: Number, required: true },
    reviews: { type: Array, default: [] },
    variants: [variantSchema]
});

export default productSchema;