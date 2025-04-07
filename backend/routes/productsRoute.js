import express from 'express';
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { verifyIsAdmin } from '../middlewares/verifyIsAdmin.js';
import upload from '../middlewares/multer.js';

const productRoutes = express.Router();
// isLoggedIn, upload, verifyIsAdmin, 

productRoutes.post('/api/v1/products', upload.single("image"), createProductCtrl);
productRoutes.get('/api/v1/products', getProductsCtrl);
productRoutes.get('/api/v1/products/:id', getProductCtrl);
productRoutes.put('/api/v1/products/:id', upload.single("image"), updateProductCtrl);
productRoutes.delete('/api/v1/products/:id', deleteProductCtrl);

export default productRoutes;