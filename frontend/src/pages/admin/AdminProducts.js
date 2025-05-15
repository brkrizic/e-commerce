import React, { useEffect, useRef, useState } from "react";
import HomeService from "../../api/PublicService";
import AdminProductModal from "./modals/AdminProductModal";
import ButtonBs from "../../components/ButtonComponent";
import { AdminService } from "../../api/AdminService";
import { AxiosError } from "axios";
import { NotificationComponent } from "../../components/NotificationComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import TableComponent from "../../components/TableComponent";
import BsActionButton from "../../components/BsActionButton";
import { useCallback } from "react";
import { useMemo } from "react";

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

    const isAllSelected = useMemo(() => products.length > 0 && selectedKey.length === products.length, [products, selectedKey]);

    const fetchProducts = async (currentPage) => {
        const response = await HomeService.getAllProducts(currentPage);
        setProducts(response.products);
        setTotalPages(Math.ceil(response.total / 10));
    }

    const handleCreateProduct = useCallback(async (formData) => {
 
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
     }, []);

    const handleUpdateProduct = useCallback(async (selectedProduct, id) => {

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
    }, []);

    const handleDeleteProduct = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchProducts(page);
    }, [page, handleCreateProduct, handleUpdateProduct, handleDeleteProduct]);

    useEffect(() => {
        console.log(selectedKey);
    }, [selectedKey]);

    const toggleSelectedKey = useCallback((id) => {
        if (selectedKey.includes(id)) {
            setSelectedKey(selectedKey.filter((key) => key !== id));
        } else {
            setSelectedKey([...selectedKey, id]);
        }
    }, [selectedKey]);

    const toggleSelectAll = useCallback(() => {
        if(isAllSelected){
            setSelectedKey([])
        } else {
            setSelectedKey(products.map((product) => product._id));
        }
    }, [products, isAllSelected]);


    return(
        <div>
            <h1>Product List</h1>
            {/* Action Buttons */}
            <header className="mb-3 d-flex gap-2">
                <BsActionButton
                label="View Product"
                variant="success"
                dataBsTarget="#viewModal"
                disabled={selectedKey?.length !== 1}
                />
                <BsActionButton
                label="Create Product"
                variant="success"
                dataBsTarget="#createModal"
                />
                <BsActionButton
                label="Update Product"
                variant="warning"
                dataBsTarget="#updateModal"
                disabled={selectedKey?.length !== 1}
                />
                <BsActionButton
                label="Delete Product"
                variant="danger"
                dataBsTarget="#deleteModal"
                disabled={selectedKey?.length === 0}
                />
            </header>

            <TableComponent
                data={products}
                columns={[
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
            <ButtonBs onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}>
                Next
            </ButtonBs>
        </div>
            {/* Modals */}
                <AdminProductModal
                    id="viewModal"
                    modalTitle="View Product"
                    modalText="Are you sure you want to create a new product?"
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