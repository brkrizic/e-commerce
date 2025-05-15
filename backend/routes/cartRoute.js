import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { addCartCtrl, clearCartCtrl, getCartCtrl, removeCartItemCtrl, updateCartItemCtrl } from '../controllers/cartController.js';

const cartRoutes = express.Router();

cartRoutes.get('/', isLoggedIn, getCartCtrl);
cartRoutes.put('/add', isLoggedIn, addCartCtrl);
cartRoutes.put('/update', isLoggedIn, updateCartItemCtrl);
cartRoutes.delete('/remove/:productId', isLoggedIn, removeCartItemCtrl);
cartRoutes.delete('/clear', isLoggedIn, clearCartCtrl);

export default cartRoutes;