import Conversation from "../model/Conversation.js";
import asyncHandler from 'express-async-handler';
import { io } from '../server.js';
import Product from "../model/Product.js";


// @desc Create a new message and store it in the conversation
// @route POST /api/v1/conversations
// @access PRIVATE
export const sendMessage = asyncHandler(async (req, res) => {
    const senderId = req.userAuthId;
    const { receiverId, productId, message } = req.body;

    if (!senderId || !receiverId || !productId || !message) {
        return res.status(400).json({ success: false, message: 'Invalid input' });
    }

    // Check if the conversation already exists between the sender and receiver
    let conversation = await Conversation.findOne({ senderId, receiverId, productId });

    // If no conversation exists, create a new one
    if (!conversation) {
        conversation = new Conversation({
            senderId,
            receiverId,
            productId,
            messages: [],
        });
    }

    // Add the new message to the conversation
    conversation.messages.push({
        message,
        timestamp: new Date(),
    });

    // Save the conversation in the database
    await conversation.save();

    // Emit the new message to the receiver via socket
    io.to(receiverId).emit('newMessage', {
        senderId,
        receiverId,
        message,
        timestamp: new Date(),
    });

    // Respond to the client
    res.json({
        success: true,
        message: 'Message sent successfully',
        conversation,
    });
});

// @desc Get all conversations for a user
// @route GET /api/v1/conversations
// @access PRIVATE
export const getConversations = asyncHandler(async (req, res) => {
    const senderId = req.userAuthId;

    const conversations = await Conversation.find({
        $or: [{ senderId }, { receiverId: senderId }],
    }).populate('receiverId senderId productId', 'name');

    if (!conversations.length) {
        return res.status(404).json({ success: false, message: 'No conversations found' });
    }

    res.json({
        success: true,
        conversations,
    });
});
