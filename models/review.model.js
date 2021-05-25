import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ReviewModel = mongoose.model('Review', new Schema({
    review: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now() },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
}));