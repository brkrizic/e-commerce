import PDFDocument from 'pdfkit';
import fs, { WriteStream } from 'fs';

export const generateInvoicePdf = (order, filePath) => {
    
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);
  
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

  