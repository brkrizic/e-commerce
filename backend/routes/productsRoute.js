import express from 'express';
import { createProductCtrl, deleteProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { verifyIsAdmin } from '../middlewares/verifyIsAdmin.js';
import upload from '../middlewares/multer.js';
import { createJsonProduct, deleteJsonProduct, getAllJsonProducts, getJsonProductById, updateJsonProduct } from '../controllers/json/productJsonController.js';

const productRoutes = express.Router();
// isLoggedIn, upload, verifyIsAdmin, 

productRoutes.post('/api/v1/products', upload.single("image"), isLoggedIn, verifyIsAdmin, createProductCtrl);
productRoutes.get('/api/v1/products', getProductsCtrl);
productRoutes.get('/api/v1/products/:id', getProductCtrl);
productRoutes.put('/api/v1/products/:id', upload.single("image"), isLoggedIn, verifyIsAdmin, updateProductCtrl);
productRoutes.delete('/api/v1/products/:id', isLoggedIn, verifyIsAdmin, deleteProductCtrl);

//JSON
productRoutes.post('/api/v1/json-products', createJsonProduct);
productRoutes.get('/api/v1/json-products', getAllJsonProducts);
productRoutes.get('/api/v1/json-products/:id', getJsonProductById);
productRoutes.put('/api/v1/json-products/:id', updateJsonProduct);
productRoutes.delete('/api/v1/json-products/:id', deleteJsonProduct);

export default productRoutes;