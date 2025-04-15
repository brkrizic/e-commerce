import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const TAX_RATE = 0.1; // 10% tax

const DashboardCart = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Product One",
            price: 29.99,
            quantity: 2,
            image: "https://via.placeholder.com/80"
        },
        {
            id: 2,
            name: "Product Two",
            price: 49.99,
            quantity: 1,
            image: "https://via.placeholder.com/80"
        }
    ]);

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) return;
        setCartItems(prev =>
            prev.map(item => item.id === id ? { ...item, quantity } : item)
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return (
        <div className="container py-5">
            <h2 className="mb-4">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="alert alert-info text-center">
                    Your cart is empty.
                </div>
            ) : (
                <div className="row">
                    <div className="col-md-8">
                        <div className="table-responsive">
                            <table className="table align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th scope="col">Product</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="d-flex align-items-center gap-2">
                                                <img src={item.image} alt={item.name} width="60" height="60" />
                                                <div>{item.name}</div>
                                            </td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    className="form-control w-75"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Summary</h5>
                                <ul className="list-group list-group-flush mb-3">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Tax (10%)</span>
                                        <span>${tax.toFixed(2)}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between fw-bold">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </li>
                                </ul>
                                <button className="btn btn-primary w-100">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardCart;
