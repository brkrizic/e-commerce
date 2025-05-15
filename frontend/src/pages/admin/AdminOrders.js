import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import useOrderApi from "../../hooks/useOrderApi";
import BsActionButton from "../../components/BsActionButton";
import { ListGroup, Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router";

const AdminOrders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const { getAllOrders } = useOrderApi();
    
    const navigate = useNavigate();


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getAllOrders();
    
                setOrders(data.orders);
    
            } catch (error) {
                setError(error);
            }
        }
        fetchOrders();
    }, [getAllOrders]);

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
      </>
    
    );
}
export default AdminOrders;