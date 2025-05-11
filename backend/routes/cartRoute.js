import express from 'express';
import { addToCart, clearCart, removeFromCart } from '../controllers/cartController';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const cartRoutes = express.Router();

cartRoutes.post('/api/v1/cart', isLoggedIn, addToCart);
cartRoutes.put('/api/v1/cart/:id', isLoggedIn, removeFromCart);
cartRoutes.post('/api/v1/cart/:id', isLoggedIn, clearCart);

export default cartRoutes;