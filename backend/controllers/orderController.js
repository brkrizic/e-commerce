import asyncHandler from 'express-async-handler';
import Order from '../model/Order.js';
import fs from 'fs';
import path from 'path';
import { generateInvoicePdf } from '../utils/generateInvoicePdf.js';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


//🔹 Download order
export const downloadOrderPdf = asyncHandler(async(req, res) => {
  const { orderNumber } = req.params;

  const order = await Order.findOne({ orderNumber });
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  //const rawOrderNumber = orderNumber.replace('ORD-', '');

  //console.log(orderNumber);

  const fileName = `${orderNumber}.pdf`;
  const filePath = path.join('invoices', fileName);

  console.log(filePath);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    res.status(404);
    throw new Error('Invoice file not found');
  }

  res.download(filePath, fileName, (err) => {
    if(err){
      res.status(500).json({
        message: 'Failed to download Invoice'
      });
    }
  })
});

//🔹 Sign order
export const signOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;

    // 1. Find order
    const order = await Order.findOne({ orderNumber });
    console.log(order);
    if (!order) return res.status(404).json({ error: "Order not found" });

    // 2. Check for invoice file
    const invoicePath = path.join(__dirname, `../invoices/${orderNumber}.pdf`);
    if (!fs.existsSync(invoicePath)) {
      return res.status(404).json({ error: "Invoice PDF not found" });
    }

    // 3. Sign PDF (mock function or real signing process)
    const signedPdfPath = path.join(__dirname, `../invoices/${orderNumber}-signed.pdf`);
    await signPDF(invoicePath, signedPdfPath); // <-- you'd implement or import this

    console.log(req.user);

    // 4. Update DB with signature metadata
    order.signature = {
      signed: true,
      signedAt: new Date(),
      signedBy: req.user.email, // assuming you have auth middleware
      signatureHash: generateHash(signedPdfPath) // optional: SHA-256 or similar
    };
    await order.save();

    return res.json({ message: "Invoice signed", signedInvoice: `/invoices/${orderNumber}-signed.pdf` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// 🔹 Create new order
export const createOrder = asyncHandler(async (req, res) => {
  const order = new Order(req.body);
  await order.save();

  const invoiceDir = path.join('invoices');
  if(!fs.existsSync(invoiceDir)){
    fs.mkdirSync(invoiceDir);
  }

  const invoicePath = path.join(invoiceDir, `${order.orderNumber}.pdf`);
  generateInvoicePdf(order, invoicePath);

  res.status(201).json({ success: true, order });
});

// 🔹 Get all orders (with filtering, pagination, sorting)
export const getOrders = asyncHandler(async (req, res) => {
  const { status, userId, page = 1, limit = 10, sortBy = 'createdAt', order = 'desc' } = req.query;
  
  const query = {};
  if (status) query.status = status;
  if (userId) query.userId = userId;

  const sortOrder = order === 'asc' ? 1 : -1;

  const total = await Order.countDocuments(query);
  const orders = await Order.find(query)
    .populate('userId', 'name email')
    .populate('items.productId', 'name price')
    .sort({ [sortBy]: sortOrder })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json({ total, page: Number(page), limit: Number(limit), orders });
});

// 🔹 Get single order
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('userId', 'name email')
    .populate('items.productId', 'name price');
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json(order);
});

// 🔹 Update order status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = status;
  order.history.push({ status });
  await order.save();

  res.json({ success: true, order });
});

// 🔹 Delete order
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.json({ success: true, message: 'Order deleted' });
});

// 🔹 Payment Intent
// route POST /create-payment-intent
export const createPaymentIntent = asyncHandler(async (req, res) => {
    try {
      const { amount, payment_method } = req.body;

      if (!amount || !payment_method) {
        return res.status(400).json({ error: 'Amount and payment method are required' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount), // in cents: $5.00 => 500
        currency: 'usd',
        payment_method,
        confirm: true, // confirm immediately
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        }
      });

      res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
      console.error('Stripe error:', error);
      res.status(400).json({ error: error.message });
    }
});
