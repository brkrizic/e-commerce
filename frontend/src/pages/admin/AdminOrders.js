import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import useOrderApi from "../../hooks/useOrderApi";
import BsActionButton from "../../components/BsActionButton";
import { ListGroup, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router";

const AdminOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);

    const { getAllOrders } = useOrderApi();
    
    const navigate = useNavigate();

    const fetchOrders = async () => {
        const result = await getAllOrders();
        console.log(result);
        setOrders(result.orders);
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleOrderClick = (id) => {
        navigate(`/dashboard/admin/order/${id}`);
    }

    return (
        <>
        <h1>Order List</h1>
            <Card className="m-4 shadow-sm">
                <Card.Header as="h5">Orders</Card.Header>
                    <ListGroup variant="flush">
                        {orders.map(order => (
                        <ListGroup.Item
                            action
                            key={order._id}
                            onClick={() => handleOrderClick(order._id)}
                        >
                            <div className="d-flex justify-content-between">
                            <div>
                                <strong>Order:</strong> {order.orderNumber} <br />
                                <strong>Status:</strong> {order.status}
                            </div>
                            <div>
                                <strong>Total:</strong> ${order.totalPrice} <br />
                                <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                            </div>
                            </div>
                        </ListGroup.Item>
                        ))}
                    </ListGroup>
            </Card>
    
            {/* Modal to show order details */}
            <Modal
            show={!!selectedOrder}
            onHide={() => setSelectedOrder(null)}
            centered
            size="lg"
            >
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedOrder && (
                <>
                    <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                    <p><strong>User:</strong> {selectedOrder.userId.email}</p>
                    <p><strong>Status:</strong> {selectedOrder.status}</p>
                    <p><strong>Payment:</strong> {selectedOrder.paymentMethod} - {selectedOrder.paymentStatus}</p>
                    <p><strong>Shipping:</strong> {selectedOrder.shippingMethod} - {selectedOrder.trackingNumber}</p>
    
                    <hr />
                    <h6>Items</h6>
                    <ul>
                    {selectedOrder.items.map(item => (
                        <li key={item._id}>
                        {item.productId.name} × {item.quantity} = ${item.totalPrice}
                        </li>
                    ))}
                    </ul>
    
                    <hr />
                    <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
                    <p><strong>Discount:</strong> ${selectedOrder.discount}</p>
                    <p><strong>Paid:</strong> ${selectedOrder.paymentInfo.amountPaid}</p>
                    <p><strong>Shipping To:</strong> {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}</p>
                </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
                    Close
                </Button>
            </Modal.Footer>
            </Modal>
      </>
    
    );
}
export default AdminOrders;