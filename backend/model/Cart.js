import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity can't be less than 1"]
    },
    priceAtPurchase: {
        type: Number,
        required: true
    },
    selectedOptions: {
        // for variants like size, color etc
        type: Map,
        of: String,
        default: {}
    }
}, { _id: false }); // No separate ID for items

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [CartItemSchema],
    totalQuantity: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

// Optionally: You can add methods for calculating totals

CartSchema.methods.calculateTotals = function() {
    this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce((sum, item) => sum + (item.priceAtPurchase * item.quantity), 0);
};

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
