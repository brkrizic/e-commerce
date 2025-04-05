import React, { useEffect, useState } from "react";
import HomeService from "../../api/HomeService";
import AdminProductModal from "./AdminProductModal";
import ButtonBs from "../../components/ButtonComponent";

const AdminProducts = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [selectedKey, setSelectedKey] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const isAllSelected = products.length > 0 && selectedKey.length === products.length;

    const fetchProducts = async (currentPage) => {
        const response = await HomeService.getAllProducts(currentPage);
        setProducts(response.products);
        setTotalPages(Math.ceil(response.total / 10));
    }

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    useEffect(() => {
        console.log(selectedKey);
    }, [selectedKey]);

    const toggleSelectedKey = (id) => {
        if (selectedKey.includes(id)) {
            setSelectedKey(selectedKey.filter((key) => key !== id));
        } else {
            setSelectedKey([...selectedKey, id]);
        }
    };

    const toggleSelectAll = () => {
        if(isAllSelected){
            setSelectedKey([])
        } else {
            setSelectedKey(products.map((product) => product._id));
        }
    }


    return(
        <div>
            <h1>Product List</h1>
            {/* Action Buttons */}
            <header className="mb-3 d-flex gap-2">
                <button type="button" data-bs-toggle="modal" data-bs-target="#viewModal" className="btn btn-success" disabled={selectedKey.length !== 1}>
                    View Product
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#createModal" className="btn btn-success">
                    Create Product
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#updateModal" className="btn btn-warning" disabled={selectedKey.length !== 1}>
                    Update Product
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" className="btn btn-danger" disabled={selectedKey.length === 0}>
                    Delete Product
                </button>
            </header>

            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col"><input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll}></input></th>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col">Price</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Updated at</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={product._id || index}>
                                <th><input type="checkbox" checked={selectedKey.includes(product._id)} onChange={() => toggleSelectedKey(product._id)}></input></th>
                                <th scope="row">{index + 1}</th>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{new Date(product.createdAt).toLocaleString()}</td>
                                <td>{new Date(product.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No products found.</td>
                        </tr> 
                    )}
                </tbody>
            </table>
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
            {/* Modals */}
            <AdminProductModal
                id="viewModal"
                modalTitle="View Product"
                modalText="Are you sure you want to create a new product?"
                onConfirm={() => console.log("Create product logic")}
                type="viewProduct"
                selectedKey={selectedKey}
            />
            <AdminProductModal
                id="createModal"
                modalTitle="Create Product"
                modalText="Are you sure you want to create a new product?"
                onConfirm={() => console.log("Create product logic")}
                type="createProduct"
            />
            <AdminProductModal
                id="updateModal"
                modalTitle="Update Product"
                modalText="Are you sure you want to update the selected product(s)?"
                onConfirm={() => console.log("Update product logic")}
                type="updateProduct"
                selectedKey={selectedKey}
            />
            <AdminProductModal
                id="deleteModal"
                modalTitle="Delete Product"
                modalText="Are you sure you want to delete the selected product(s)?"
                onConfirm={() => console.log("Delete product logic")}
                type="deleteProduct"
                selectedKey={selectedKey}
            /> 
             
        </div>
        
    );
}
export default AdminProducts;