import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImgModel = mongoose.model('Image', new Schema({
    src: { type: String, required: true },
    alt: { type: String, required: true }
}));

async function saveImage(data) {
    try {
        return await new ImgModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { saveImage };