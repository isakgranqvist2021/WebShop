import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/')
        },
        filename(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })
});

import addProductController from '../controllers/admin/add-product';
import updateProductController from '../controllers/admin/update-product';
import deleteProductController from '../controllers/admin/delete-product';

router.get('/', (req, res) => res.redirect('/admin/add-product'));
router.get('/add-product', addProductController.template);
router.post('/add-product', addProductController.action);
router.post('/add-product/upload-img', upload.single('img'), addProductController.upload_img);
router.post('/update-product/:pid', updateProductController.action);
router.get('/delete-product/:pid', deleteProductController.action);

export default router;