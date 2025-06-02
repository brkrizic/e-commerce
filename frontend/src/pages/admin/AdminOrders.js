import React, { useEffect, useState } from "react";
import { ListGroup, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import DownloadStatusBar from "../../components/DownloadStatusBar";
import useOrderApi from "../../hooks/useOrderApi";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const [downloadStatus, setDownloadStatus] = useState({});
  const [downloadProgress, setDownloadProgress] = useState({});
  const [downloadSpeed, setDownloadSpeed] = useState(100);

  const { getAllOrders } = useOrderApi();
  const navigate = useNavigate();

  const handleDownloadInvoice = async (orderNumber) => {
    setDownloadStatus((prev) => ({ ...prev, [orderNumber]: "downloading" }));
    setDownloadProgress((prev) => ({ ...prev, [orderNumber]: 0 }));

    try {
      const response = await axios.get(
        `http://localhost:3001/api/v1/orders/download-invoice/${orderNumber}?speed=${downloadSpeed}`,
        {
          responseType: "blob",
          onDownloadProgress: (e) => {
            if (!e.total) return;
            const percent = Math.round((e.loaded * 100) / e.total);
            setDownloadProgress((prev) => ({ ...prev, [orderNumber]: percent }));
          },
        }
      );

      const contentDisposition = response.headers["content-disposition"];
      const match = contentDisposition?.match(/filename="(.+)"/);
      const fileName = match ? match[1] : `${orderNumber}.pdf`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);

      setDownloadStatus((prev) => ({ ...prev, [orderNumber]: "completed" }));
    } catch (err) {
      console.error("Download error:", err);
      setDownloadStatus((prev) => ({ ...prev, [orderNumber]: "error" }));
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data.orders);
      } catch (error) {
        setError(error);
      }
    };
    fetchOrders();
  }, []);

  const handleOrderClick = (id) => {
    navigate(`/dashboard/admin/order/${id}`);
  };

  return (
    <>
      <h1>Order List</h1>

      <Card className="m-4 shadow-sm">
        <Card.Header as="h5">Orders</Card.Header>

        <Card.Body>
          <Form.Group className="mb-3" controlId="downloadSpeed">
            <Form.Label>Download speed (KB/s):</Form.Label>
            <Form.Control
              type="number"
              value={downloadSpeed}
              onChange={(e) => setDownloadSpeed(Number(e.target.value))}
              min={10}
              max={1000}
              step={10}
            />
          </Form.Group>

          <ListGroup variant="flush">
            {orders.map((order) => (
              <ListGroup.Item
                action
                key={order._id}
                onClick={() => handleOrderClick(order._id)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Order:</strong> {order.orderNumber} <br />
                    <strong>Status:</strong> {order.status}
                  </div>
                  <div>
                    <strong>Total:</strong> ${order.totalPrice} <br />
                    <small>{new Date(order.createdAt).toLocaleDateString()}</small>
                  </div>
                  <div className="w-50">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadInvoice(order.orderNumber);
                      }}
                    >
                      Download Invoice
                    </Button>

                    <DownloadStatusBar
                      status={downloadStatus[order.orderNumber]}
                      progress={downloadProgress[order.orderNumber]}
                    />
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminOrders;
