import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VariantModel = mongoose.model('Variant', new Schema({
    color: { type: String, required: true },
    img: { type: Schema.Types.ObjectId, ref: 'Image' }
}));

async function saveVariant(data) {
    try {
        return await new VariantModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { saveVariant };