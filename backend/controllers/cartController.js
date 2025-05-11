import asyncHandler from 'express-async-handler';
import Cart from '../model/Cart';


export const addToCart = asyncHandler(async (req, res) => {
    try {
        const { productId, quantity, selectedOptions, priceAtPurchase } = req.body;
        const userId = req.user._id; // assuming you have auth middleware

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            // Product already in cart, update quantity
            existingItem.quantity += quantity;
        } else {
            // Add new item
            cart.items.push({
                product: productId,
                quantity,
                priceAtPurchase,
                selectedOptions
            });
        }

        cart.calculateTotals();
        await cart.save();

        return res.status(200).json({ message: "Cart updated successfully", cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

export const removeFromCart = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        cart.calculateTotals();
        await cart.save();

        return res.status(200).json({ message: "Item removed", cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});

export const clearCart = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.items = [];
        cart.totalQuantity = 0;
        cart.totalPrice = 0;
        await cart.save();

        return res.status(200).json({ message: "Cart cleared", cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});


