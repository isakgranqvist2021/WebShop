import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VariantModel = mongoose.model('Variant', new Schema({
    color: { type: String, required: true },
    img: { type: Schema.Types.ObjectId, ref: 'Image' }
}));

async function saveVariant(data) {
    return new Promise((resolve, reject) => {
        new VariantModel(data)
            .save((err, newVariant) => {
                if (err) return reject(err);
                return resolve(newVariant._id);
            });
    });
}

export default { saveVariant };