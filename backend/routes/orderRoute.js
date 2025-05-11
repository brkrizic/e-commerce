import express from 'express';
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrderStatus } from '../controllers/orderController.js';

const orderRoutes = express.Router();

orderRoutes.post('/', createOrder);
orderRoutes.get('/', getOrders);
orderRoutes.get('/:id', getOrderById);
orderRoutes.put('/:id/status', updateOrderStatus);
orderRoutes.delete('/:id', deleteOrder);

export default orderRoutes;