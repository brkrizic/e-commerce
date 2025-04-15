import React from "react";

const order = {
  _id: "661355d9348306f65b8c9e21",
  user: {
    _id: "660fe0a7f1cce933fdb7f123",
    fullname: "John Doe",
    email: "john@example.com"
  },
  orderNumber: "ORD-1712472900000",
  status: "processing",
  paymentStatus: "completed",
  paymentMethod: "credit_card",
  totalPrice: 129.98,
  discount: 10,
  promoCode: "SPRING10",
  items: [
    {
      productId: {
        _id: "660fc9b7f1cce933fdb7f111",
        name: "Bluetooth Speaker"
      },
      quantity: 2,
      price: 49.99,
      totalPrice: 99.98
    },
    {
      productId: {
        _id: "660fc9b7f1cce933fdb7f112",
        name: "USB-C Charger"
      },
      quantity: 1,
      price: 40.00,
      totalPrice: 40.00
    }
  ],
  shippingAddress: {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA"
  },
  shippingMethod: "expedited",
  shippingCost: 5.00,
  trackingNumber: "1Z9999W99999999999",
  estimatedDeliveryDate: "2025-04-15T00:00:00.000Z",
  paymentInfo: {
    transactionId: "txn_1J2Z3YZKXGQe",
    amountPaid: 129.98,
    paymentDate: "2025-04-07T14:12:00.000Z"
  },
  history: [
    { status: "pending", timestamp: "2025-04-06T10:00:00.000Z" },
    { status: "processing", timestamp: "2025-04-07T08:30:00.000Z" }
  ],
  createdAt: "2025-04-06T09:55:00.000Z",
  updatedAt: "2025-04-07T08:30:00.000Z"
};


const AdminOrders = () => {
  if (!order) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Order Details - {order.orderNumber}</h2>

      <div className="row mt-4">
        {/* Customer & Order Info */}
        <div className="col-md-6 mb-3">
          <h5>Customer Info</h5>
          <ul className="list-group">
            <li className="list-group-item"><strong>Name:</strong> {order.user?.fullname}</li>
            <li className="list-group-item"><strong>Payment Method:</strong> {order.paymentMethod}</li>
            <li className="list-group-item"><strong>Payment Status:</strong> {order.paymentStatus}</li>
            <li className="list-group-item"><strong>Transaction ID:</strong> {order.paymentInfo.transactionId}</li>
          </ul>
        </div>

        {/* Shipping Info */}
        <div className="col-md-6 mb-3">
          <h5>Shipping Info</h5>
          <ul className="list-group">
            <li className="list-group-item"><strong>Address:</strong> {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zipCode}, ${order.shippingAddress.country}`}</li>
            <li className="list-group-item"><strong>Shipping Method:</strong> {order.shippingMethod}</li>
            <li className="list-group-item"><strong>Shipping Cost:</strong> ${order.shippingCost.toFixed(2)}</li>
            <li className="list-group-item"><strong>Tracking Number:</strong> {order.trackingNumber || "Not assigned"}</li>
          </ul>
        </div>
      </div>

      {/* Items Ordered */}
      <div className="mt-4">
        <h5>Items</h5>
        <table className="table table-bordered table-striped align-middle">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.productId.name || item.productId}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pricing Summary */}
      <div className="d-flex justify-content-end mt-3">
        <div className="w-50">
          <ul className="list-group">
            <li className="list-group-item"><strong>Subtotal:</strong> ${(order.totalPrice - order.discount).toFixed(2)}</li>
            <li className="list-group-item"><strong>Discount:</strong> ${order.discount}</li>
            <li className="list-group-item"><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</li>
            <li className="list-group-item"><strong>Promo Code:</strong> {order.promoCode || "None"}</li>
          </ul>
        </div>
      </div>

      {/* Order Status Actions */}
      <div className="mt-4">
        <h5>Order Status</h5>
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select w-auto"
            value={order.status}
            onChange={(e) => {
              // handleUpdateStatus(order._id, e.target.value);
            }}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button className="btn btn-primary">Update Status</button>
          <button className="btn btn-danger">Cancel Order</button>
        </div>
      </div>

      {/* History */}
      <div className="mt-4">
        <h5>Status History</h5>
        <ul className="list-group">
          {order.history.map((entry, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <span>{entry.status}</span>
              <span>{new Date(entry.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default AdminOrders;