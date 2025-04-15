import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

const ProductDetailScreen = () => {
    const [selectedImage, setSelectedImage] = useState("https://via.placeholder.com/500");
    const [quantity, setQuantity] = useState(1);

    const navigate = useNavigate();

    const handleGoBack = () => navigate(-1); 

    const product = {
        id: 1,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
        price: 199.99,
        stock: 12,
        category: "Electronics",
        images: [
            "https://via.placeholder.com/500",
            "https://via.placeholder.com/100x100?text=Side",
            "https://via.placeholder.com/100x100?text=Back",
            "https://via.placeholder.com/100x100?text=In-Use",
        ]
    };

    const relatedProducts = [
        { id: 2, name: "Smartwatch", price: 99.99, image: "https://via.placeholder.com/150" },
        { id: 3, name: "Bluetooth Speaker", price: 49.99, image: "https://via.placeholder.com/150" },
        { id: 4, name: "Noise-Canceling Earbuds", price: 149.99, image: "https://via.placeholder.com/150" },
    ];

    const handleAddToCart = () => {
        alert(`Added ${quantity} x "${product.name}" to cart.`);
    };

    return (
        <div className="container py-5">
            <button className="btn btn-outline-secondary mb-3" onClick={handleGoBack}>
        ← Go Back
    </button>
            <div className="row">
                {/* Image Section */}
                <div className="col-md-6">
                    <img src={selectedImage} alt="Product" className="img-fluid rounded shadow-sm mb-3" />
                    <div className="d-flex gap-2">
                        {product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumb ${index}`}
                                className="img-thumbnail"
                                width="80"
                                role="button"
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p className="text-muted">{product.category}</p>
                    <h4 className="text-primary">${product.price.toFixed(2)}</h4>
                    <p>{product.description}</p>
                    <p className={product.stock > 0 ? "text-success" : "text-danger"}>
                        {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                    </p>

                    {/* Quantity + Add to Cart */}
                    <div className="d-flex align-items-center gap-2 my-3">
                        <label htmlFor="quantity" className="form-label mb-0">Qty:</label>
                        <input
                            id="quantity"
                            type="number"
                            className="form-control w-auto"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.min(Math.max(1, e.target.value), product.stock))}
                        />
                        <button
                            className="btn btn-success"
                            onClick={handleAddToCart}
                            disabled={product.stock < 1}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="mt-5">
                <h4>Related Products</h4>
                <div className="row">
                    {relatedProducts.map(item => (
                        <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
                            <div className="card mb-3 shadow-sm">
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h6 className="card-title">{item.name}</h6>
                                    <p className="card-text text-primary">${item.price.toFixed(2)}</p>
                                    <button className="btn btn-outline-primary btn-sm w-100">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailScreen;
