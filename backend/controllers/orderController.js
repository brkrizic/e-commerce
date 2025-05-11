import asyncHandler from 'express-async-handler';
import Order from '../model/Order.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';


const generateInvoicePdf = (order, filePath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text(`Invoice: ${order.orderNumber}`, { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`User ID: ${order.userId}`);
  doc.text(`Status: ${order.status}`);
  doc.text(`Payment Status: ${order.paymentStatus}`);
  doc.text(`Payment Method: ${order.paymentMethod}`);
  doc.text(`Shipping Method: ${order.shippingMethod}`);
  doc.text(`Total Price: $${order.totalPrice}`);
  doc.text(`Shipping Cost: $${order.shippingCost}`);
  doc.moveDown();

  doc.text('Shipping Address:');
  doc.text(`${order.shippingAddress.street}, ${order.shippingAddress.city}`);
  doc.text(`${order.shippingAddress.state}, ${order.shippingAddress.zipCode}, ${order.shippingAddress.country}`);
  doc.moveDown();

  doc.fontSize(14).text('Items:');
  order.items.forEach((item, i) => {
    doc.fontSize(12).text(
      `${i + 1}. Product ID: ${item.productId} | Qty: ${item.quantity} | Price: $${item.price} | Total: $${item.totalPrice}`
    );
  });

  doc.moveDown();
  doc.text(`Discount: $${order.discount || 0}`);
  if (order.promoCode) {
    doc.text(`Promo Code: ${order.promoCode}`);
  }

  doc.moveDown();
  doc.text(`Transaction ID: ${order.paymentInfo.transactionId}`);
  doc.text(`Amount Paid: $${order.paymentInfo.amountPaid}`);
  doc.text(`Payment Date: ${new Date(order.paymentInfo.paymentDate).toLocaleDateString()}`);

  doc.end();
};

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
