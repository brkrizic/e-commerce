import express, { Router } from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { getConversations, sendMessage } from '../controllers/conversationController.js';

const conversationRoute = express.Router();

conversationRoute.post('/api/v1/conversations', isLoggedIn, sendMessage);
conversationRoute.get('/api/v1/conversations', isLoggedIn, getConversations);

export default conversationRoute;