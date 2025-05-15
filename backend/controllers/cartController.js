import asyncHandler from 'express-async-handler';
import Cart from '../model/Cart.js';
import Product from '../model/Product.js';

// @desc    Get user's cart
// @route   GET /api/v1/cart
// @access  Private (User)
export const getCartCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuthId;
  
    // Optional: validate userId exists (if not handled by middleware)
    if (!userId) {
      res.status(401);
      throw new Error("User not authenticated.");
    }
  
    const userCart = await Cart.findOne({ userId });
  
    if (!userCart) {
      return res.status(200).json({
        message: "Cart is empty",
        items: [],
      });
    }
  
    return res.status(200).json({
      message: "Cart fetched successfully",
      items: userCart.items,
      totalQuantity: userCart.totalQuantity,
      totalPrice: userCart.totalPrice
    });
});

// @desc    Add item to cart
// @route   PUT /api/v1/cart/add
// @access  Private (User)
export const addCartCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuthId;
    const { productId, quantity } = req.body;
  
    if (!productId || !quantity || quantity < 1) {
      res.status(400);
      throw new Error("Product ID and a valid quantity are required.");
    }
  
    // Get current product info
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404);
      throw new Error("Product not found.");
    }
  
    const priceAtPurchase = product.price;
  
    // Find or create cart
    let cart = await Cart.findOne({ userId });
  
    if (!cart) {
      // New cart
      cart = new Cart({
        userId,
        items: [{
          product: productId,
          quantity,
          priceAtPurchase,
        }]
      });
    } else {
        // Check if item already in cart
        const existingIndex = cart.items.findIndex(item =>
            item.product.toString() === productId
      );
  
      if (existingIndex > -1) {
        // Update quantity
        cart.items[existingIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({
          product: productId,
          quantity,
          priceAtPurchase
        });
      }
    }
  
    // Recalculate totals
    cart.calculateTotals();
  
    // Save cart
    await cart.save();
  
    res.status(200).json({
      message: "Item added to cart",
      cart,
    });
});

// @desc    Update item quantity in cart
// @route   PUT /api/v1/cart/update
// @access  Private (User)
export const updateCartItemCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuthId;
    const { productId, quantity } = req.body;
  
    if (!productId || quantity < 0) {
      res.status(400);
      throw new Error("Product ID and valid quantity are required.");
    }
  
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404);
      throw new Error("Cart not found.");
    }
  
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
  
    if (itemIndex === -1) {
      res.status(404);
      throw new Error("Product not in cart.");
    }
  
    if (quantity === 0) {
      // Remove item if quantity is 0
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }
  
    cart.calculateTotals();
    await cart.save();
  
    res.status(200).json({
      message: "Cart item updated",
      cart
    });
});
  

// @desc    Remove one item from cart
// @route   DELETE /api/v1/cart/remove/:productId
// @access  Private (User)
export const removeCartItemCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuthId;
    const productId = req.params.productId;
  
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404);
      throw new Error("Cart not found.");
    }
  
    const itemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );
  
    if (itemIndex === -1) {
      res.status(404);
      throw new Error("Product not found in cart.");
    }
  
    cart.items.splice(itemIndex, 1);
    cart.calculateTotals();
    await cart.save();
  
    res.status(200).json({
      message: "Item removed from cart",
      cart
    });
});

// @desc    Clear entire cart
// @route   DELETE /api/v1/cart/clear
// @access  Private (User)
export const clearCartCtrl = asyncHandler(async (req, res) => {
    const userId = req.userAuthId;
  
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      res.status(404);
      throw new Error("Cart not found.");
    }
  
    cart.items = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
  
    await cart.save();
  
    res.status(200).json({
      message: "Cart cleared",
      cart
    });
});
  