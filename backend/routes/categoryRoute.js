import express from 'express';
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl, getCategoryByIdCtrl, updateCategoryCtrl } from '../controllers/categoryController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { verifyIsAdmin } from '../middlewares/verifyIsAdmin.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/api/v1/categories', isLoggedIn, verifyIsAdmin, createCategoryCtrl);
categoryRoutes.get('/api/v1/categories', getAllCategoriesCtrl);
categoryRoutes.get('/api/v1/categories/:id', getCategoryByIdCtrl);
categoryRoutes.put('/api/v1/categories/:id', verifyIsAdmin, updateCategoryCtrl);
categoryRoutes.delete('/api/v1/categories/:id', verifyIsAdmin, deleteCategoryCtrl);

export default categoryRoutes;