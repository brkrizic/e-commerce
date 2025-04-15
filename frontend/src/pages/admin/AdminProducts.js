import React, { useEffect, useRef, useState } from "react";
import HomeService from "../../api/PublicService";
import AdminProductModal from "./AdminProductModal";
import ButtonBs from "../../components/ButtonComponent";
import { AdminService } from "../../api/AdminService";
import { AxiosError } from "axios";
import { NotificationComponent } from "../../components/NotificationComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TableComponent from "../../components/TableComponent";

const AdminProducts = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [selectedKey, setSelectedKey] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [notification, setNotification] = useState(null);


    const isAllSelected = products.length > 0 && selectedKey.length === products.length;

    const fetchProducts = async (currentPage) => {
        const response = await HomeService.getAllProducts(currentPage);
        setProducts(response.products);
        setTotalPages(Math.ceil(response.total / 10));
    }

    const handleCreateProduct = async (formData) => {
 
         const response = await AdminService.createProduct(formData);
         console.log(response);
 
         if(response?.success){
             setNotification({
                 message: response.message,
                 title: "Success",
                 type: "success"
         });
 
         } else {
             setNotification({
                 message: AxiosError.ERR_BAD_REQUEST,
                 title: "Error",
                 type: "error"
             })
        }
     };

    const handleUpdateProduct = async (selectedProduct, id) => {

        try {
            const response = await AdminService.updateProduct(selectedProduct, id);
            if (response?.success) {
                setNotification({
                    message: response.message,
                    title: "Success",
                    type: "success"
                });
            } else {
                setNotification({
                    message: response.message || "Something went wrong.",
                    title: "Error",
                    type: "error"
                });
            }
        } catch (error) {
            setNotification({
                message: "An error occurred, please try again.",
                title: "Error",
                type: "error"
            });
        } 
    };

    const handleDeleteProduct = async () => {
        const response = await AdminService.deleteProduct(selectedKey[0]);
        if(response?.success){
            setNotification({
                message: response.message,
                title: "Success",
                type: "success"
        });

        } else {
            setNotification({
                message: "An error occurred, please try again.",
                title: "Error",
                type: "error"
            });
        }
    };

    useEffect(() => {
        fetchProducts(page);
    }, [page, notification]);

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
    };


    return(
        <div>
            <h1>Product List</h1>
            {/* Action Buttons */}
            <header className="mb-3 d-flex gap-2">
                <button type="button" data-bs-toggle="modal" data-bs-target="#viewModal" className="btn btn-success" disabled={selectedKey?.length !== 1}>
                    View Product
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#createModal" className="btn btn-success">
                    Create Product
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#updateModal" className="btn btn-warning" disabled={selectedKey?.length !== 1}>
                    Update Product
                </button>
                <button type="button" data-bs-toggle="modal" data-bs-target="#deleteModal" className="btn btn-danger" disabled={selectedKey?.length === 0}>
                    Delete Product
                </button>
            </header>

            <TableComponent
                data={products}
                columns={[
                    { label: "#", key: "index", format: (_, row, i) => i + 1 },
                    { label: "ID", key: "_id" },
                    { label: "Name", key: "name" },
                    { label: "Description", key: "description" },
                    { label: "Category", key: "category" },
                    { label: "Price", key: "price", format: (val) => `$${val?.toFixed(2)}` },
                    { label: "Created At", key: "createdAt", format: (val) => new Date(val).toLocaleString() },
                    { label: "Updated At", key: "updatedAt", format: (val) => new Date(val).toLocaleString() },
                ]}
                selectedKey={selectedKey}
                onSelect={toggleSelectedKey}
                onSelectAll={toggleSelectAll}
            />
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
                    name={name}
                    description={description}
                    category={category}
                    price={price}
                    imageFile={imageFile}
                    //closeModal={closeModal}
                />
                <AdminProductModal
                    id="createModal"
                    onCreate={handleCreateProduct}
                    modalTitle="Create Product"
                    modalText="Are you sure you want to create a new product?"
                    onConfirm={() => console.log("Create product logic")}
                    type="createProduct"
                    name={name}
                    description={description}
                    category={category}
                    price={price}
                    imageFile={imageFile}
                />
                <AdminProductModal
                    id="updateModal"
                    onUpdate={handleUpdateProduct}
                    modalTitle="Update Product"
                    modalText="Are you sure you want to update the selected product(s)?"
                    onConfirm={() => console.log("Update product logic")}
                    type="updateProduct"
                    selectedKey={selectedKey}
                    name={name}
                    description={description}
                    category={category}
                    price={price}
                    imageFile={imageFile}
                />
                <AdminProductModal
                    id="deleteModal"
                    onDelete={handleDeleteProduct}
                    modalTitle="Delete Product"
                    modalText="Are you sure you want to delete the selected product(s)?"
                    onConfirm={() => console.log("Delete product logic")}
                    type="deleteProduct"
                    selectedKey={selectedKey}
                    name={name}
                    description={description}
                    category={category}
                    price={price}
                    imageFile={imageFile}
                />
            
            {notification && (
                <NotificationComponent
                    title={notification.title}
                    message={notification.message}
                    onClose={() => setNotification(null)}
                />
            )}             
             
        </div>
        
    );
}
export default AdminProducts;