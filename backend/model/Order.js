const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Assuming you have a User model to reference
      required: true
    },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => 'ORD-' + Date.now()  // You could replace this with UUID or some other mechanism.
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer'],
      required: true
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    },
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Assuming you have a Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      price: {
        type: Number,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    }],
    shippingAddress: {
      street: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zipCode: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    shippingMethod: {
      type: String,
      enum: ['standard', 'expedited'],
      required: true
    },
    shippingCost: {
      type: Number,
      required: true,
      min: 0
    },
    trackingNumber: {
      type: String,
      default: null
    },
    estimatedDeliveryDate: {
      type: Date,
      default: null
    },
    paymentInfo: {
      transactionId: {
        type: String,
        required: true
      },
      amountPaid: {
        type: Number,
        required: true,
        min: 0
      },
      paymentDate: {
        type: Date,
        default: Date.now
      }
    },
    discount: {
      type: Number,
      min: 0,
      default: 0
    },
    promoCode: {
      type: String,
      default: null
    },
    history: [{
      status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        required: true
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
