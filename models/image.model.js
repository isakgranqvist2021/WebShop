import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ImgModel = mongoose.model('Image', new Schema({
    src: { type: String, required: true },
    alt: { type: String, required: true }
}));

async function saveImage(data) {
    return new Promise((resolve, reject) => {
        new ImgModel(data)
            .save((err, newImg) => {
                if (err) return reject(err);
                return resolve(newImg._id);
            });
    });
}

export default { saveImage };