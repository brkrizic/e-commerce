import express from 'express';
import { createOrder, createPaymentIntent, deleteOrder, downloadOrderPdf, getOrderById, getOrders, signOrder, updateOrderStatus } from '../controllers/orderController.js';

const orderRoutes = express.Router();

orderRoutes.get('/download-invoice/:orderNumber', downloadOrderPdf);

orderRoutes.post('/', createOrder);
orderRoutes.get('/', getOrders);
orderRoutes.get('/:id', getOrderById);
orderRoutes.put('/:id/status', updateOrderStatus);
orderRoutes.delete('/:id', deleteOrder);
orderRoutes.put('/sign-order/:orderNumber', signOrder);
orderRoutes.post('/create-payment-intent', createPaymentIntent);

export default orderRoutes;