import React, { useEffect, useState, forwardRef, useRef } from "react";
import LabelInputBs from "../../components/LabelInputComponent";
import HomeService from "../../api/PublicService";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import { productImage } from "../../components/constants/imageUrl";

const AdminProductModal = ({ id, modalTitle, modalText, onConfirm, type, selectedKey, onCreate, onUpdate, onDelete, ...props }) => {
    const [name, setName] = useState(props.name || '');
    const [description, setDescription] = useState(props.description || '');
    const [category, setCategory] = useState(props.category || '');
    const [price, setPrice] = useState(props.price || '');
    const [selectedProduct, setSelectedProduct] = useState();
    const [imageFile, setImageFile] = useState(null);  // Track the image file

    const modalRef = useRef(null);
    const [modalInstance, setModalInstance] = useState(null);

    useEffect(() => {
        const handleModalShow = () => {
        // Get the width of the scrollbar
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        // Add padding-right to body to compensate for the scrollbar
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        // Disable scrolling on the body when the modal is open
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        };

        const handleModalHide = () => {
        // Remove padding-right when modal is closed
        document.body.style.paddingRight = '0px';

        // Re-enable scrolling when modal is closed
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
        };

        const modalElement = document.getElementById(id);
        modalElement.addEventListener('show.bs.modal', handleModalShow);
        modalElement.addEventListener('hidden.bs.modal', handleModalHide);

        return () => {
            modalElement.removeEventListener('show.bs.modal', handleModalShow);
            modalElement.removeEventListener('hidden.bs.modal', handleModalHide);
        };
    }, [id]);


    // Initialize the modal when the component mounts
    useEffect(() => {
        if (modalRef.current) {
        const instance = new Modal(modalRef.current); // Initialize the modal instance
        setModalInstance(instance); // Store the modal instance in state
        }
    }, []); // This runs once after the component mounts

    // Fetch selected product details if updating
    useEffect(() => {
        if (selectedKey && selectedKey.length === 1) {
            fetchSelectedProduct();
        }
    }, [selectedKey]);

    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name || '');
            setDescription(selectedProduct.description || '');
            setCategory(selectedProduct.category || '');
            setPrice(selectedProduct.price || '');
        }
    }, [selectedProduct]);

    const fetchSelectedProduct = async () => {
        try {
            const response = await HomeService.getProductById(selectedKey[0]);
            setSelectedProduct(response.product);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    // Handle image file change (capture the file)
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Prepare the form data for submission
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        if (type === "createProduct") {
            onCreate(formData);  // Pass formData to onCreate handler
        } else if (type === "updateProduct" && selectedProduct) {
            onUpdate({...selectedProduct, name, description, category, price, image: imageFile}, selectedProduct?._id);  // Pass formData to onUpdate handler
        }
        closeModal();
    };

    // Handle modal close
    const closeModal = () => {
        if (modalInstance) {
        modalInstance.hide(); // Close the modal
        removeBackdrop();
        }
    };

        // Function to remove the backdrop manually
    const removeBackdrop = () => {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove(); // Remove the backdrop element manually
        }
    };

    const handleDeleteProduct = () => {
        onDelete();
        closeModal();
    }

    return (
        <div className="modal fade" id={id} ref={modalRef} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${id}Label`}>{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {(type === "createProduct" || (type === "updateProduct" && selectedProduct)) && (
                            <form onSubmit={handleFormSubmit}>
                                <LabelInputBs 
                                    lblChild={"Name of product"} 
                                    lblType={"name"}
                                    inpType={"text"}
                                    inpId={"name"}
                                    inpPlaceholder={"Name"}
                                    inpValue={name}
                                    inpOnChange={(e) => setName(e.target.value)}
                                />
                                <LabelInputBs 
                                    lblChild={"Description of product"} 
                                    lblType={"description"}
                                    inpType={"text"}
                                    inpId={"description"}
                                    inpPlaceholder={"Description"}
                                    inpValue={description}
                                    inpOnChange={(e) => setDescription(e.target.value)}
                                />
                                <LabelInputBs 
                                    lblChild={"Category of product"} 
                                    lblType={"category"}
                                    inpType={"text"}
                                    inpId={"category"}
                                    inpPlaceholder={"Category"}
                                    inpValue={category}
                                    inpOnChange={(e) => setCategory(e.target.value)}
                                />
                                <LabelInputBs 
                                    lblChild={"Price of product"} 
                                    lblType={"price"}
                                    inpType={"number"}
                                    inpId={"price"}
                                    inpPlaceholder={"Price"}
                                    inpValue={price}
                                    inpOnChange={(e) => setPrice(e.target.value)}
                                />
                                <img 
                                    src={selectedProduct?.image ? productImage(selectedProduct) : `http://localhost:3001/public/emptyImage.jpg`}  
                                    alt={selectedProduct?.name} 
                                    className="w-20 h-20 object-cover rounded-md"
                                    style={{ height: 160, width: 210}}
                                /> 
                                
                                {/* File Upload */}
                                <div className="mb-3">
                                    <label htmlFor="formFile" className="form-label">Replace Image</label>
                                    <input className="form-control" type="file" id="formFile" onChange={handleImageChange}/>
                                </div>

                                <div className="modal-footer">
                                    {type === "updateProduct" ? 
                                    (<button type="submit" className="btn btn-primary">Save changes</button>) 
                                    : (<button type="submit" className="btn btn-primary">Save</button>)}
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        )}

                        {type === 'viewProduct' && selectedKey && selectedKey.length === 1 && (
                            <form>
                                <LabelInputBs 
                                    lblChild={"Name of product"} 
                                    lblType={"name"}
                                    inpType={"text"}
                                    inpId={"name"}
                                    inpPlaceholder={"Name"}
                                    inpValue={selectedProduct?.name || ""}
                                />
                                <LabelInputBs 
                                    lblChild={"Description of product"} 
                                    lblType={"description"}
                                    inpType={"text"}
                                    inpId={"description"}
                                    inpPlaceholder={"Description"}
                                    inpValue={selectedProduct?.description || ""}
                                />
                                 <LabelInputBs 
                                    lblChild={"Category of product"} 
                                    lblType={"category"}
                                    inpType={"text"}
                                    inpId={"category"}
                                    inpPlaceholder={"Category"}
                                    inpValue={selectedProduct?.category || ""}
                                />
                                <LabelInputBs 
                                    lblChild={"Price of product"} 
                                    lblType={"price"}
                                    inpType={"text"}
                                    inpId={"price"}
                                    inpPlaceholder={"Price"}
                                    inpValue={selectedProduct?.price || ""}
                                />
                                <img 
                                    src={selectedProduct?.image ? productImage(selectedProduct) : `http://localhost:3001/public/emptyImage.jpg`}  
                                    alt={selectedProduct?.name} 
                                    className="w-20 h-20 object-cover rounded-md"
                                    style={{ height: 160, width: 210}}
                                />                                
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={onConfirm}>Confirm</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        )}

                        {type === "deleteProduct" && selectedKey && selectedProduct && (
                            <div>
                                <p>Are you sure you want to delete the product with ID {selectedProduct._id}?</p>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteProduct}>Delete</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProductModal;
