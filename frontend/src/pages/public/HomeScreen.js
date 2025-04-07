import React, { useEffect, useState } from "react";
import HomeService from "../../api/PublicService";
import "bootstrap/dist/css/bootstrap.min.css";
import TitleBs from "../../components/TitleComponent";
import ButtonBs from "../../components/ButtonComponent";
import { productImage } from "../../components/constants/imageUrl";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async (currentPage, search = '') => {
        let response;
        if (search) {
            response = await HomeService.getProductsByName(search, currentPage);
        } else {
            response = await HomeService.getAllProducts(currentPage);
        }

        if (response) {
            setProducts(response.products);
            setTotalPages(Math.ceil(response.total / 10)); // Assuming 10 items per page
        }
    };

    const fetchCategories = async () => {
        const response = await HomeService.getAllCategories();
        if (response) {
            setCategories(response.categories);
        }
    };

    useEffect(() => {
        fetchProducts(page);
        fetchCategories();
    }, [page, searchTerm]);

    const searchProducts = (name) => {
        setPage(1);  // Reset to the first page when searching
        fetchProducts(1, name);  // Fetch with search term and reset to page 1
    };

return (
    <div className="container mx-auto max-w-3xl">
        <TitleBs type={'h1'}>Home</TitleBs>
        
        {/* Search Bar */}
        <div className="mb-4 flex gap-2">
            <input
                type="text"
                className="form-control flex-1"
                placeholder="Search for products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ButtonBs onClick={() => searchProducts(searchTerm)}>Search</ButtonBs>
        </div>

        {/* Categories Section */}
        <TitleBs type={'h3'}>Category</TitleBs>
        <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((category) => (
                <span key={category.key} className="badge bg-secondary">{category.name}</span>
            ))}
        </div>

        {/* Products List */}
        <ul className="grid grid-cols-1 gap-4 place-items-center">
            {products.length > 0 ? (
                products.map((product, index) => (
                    <button
                        key={product._id || `${product.name}-${index}`}
                        className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition w-80 h-24"
                    >
                        {/* Image */}
                        <img 
                            src={product.image ? productImage(product) : `http://localhost:3001/public/emptyImage.jpg`}  
                            alt={product.name} 
                            className="w-20 h-20 object-cover rounded-md"
                            style={{ height: 160, width: 210}}
                        />
                        
                        {/* Text */}
                        <div className="text-sm font-medium truncate w-full text-left">
                            {product.name}
                        </div>
                    </button>
                ))
            ) : (
                <p className="text-center text-sm text-gray-500">No products found.</p>
            )}
        </ul>

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-between mt-3">
            <ButtonBs onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                Previous
            </ButtonBs>
            <span className="text-sm font-medium">Page {page} of {totalPages - 1}</span>
            <ButtonBs onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                Next
            </ButtonBs>
        </div>
    </div>
);
};

export default HomeScreen;