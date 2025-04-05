import React, { useEffect, useState } from "react";
import LabelInputBs from "../../components/LabelInputComponent";
import HomeService from "../../api/HomeService";

const AdminProductModal = ({ id, modalTitle, modalText, onConfirm, type, selectedKey }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [selectedProduct, setSelectedProduct] = useState();
    const [imageFile, setImageFile] = useState('');

    const fetchSelectedProduct = async () => {
        const response = await HomeService.getProductById(selectedKey[0]);
        console.log(response);
        setSelectedProduct(response.product);
    }

    useEffect(() => {
        if(selectedKey && selectedKey.length === 1){
            fetchSelectedProduct();
        } 
    }, [selectedKey]);

    useEffect(() => {
        if (type === "updateProduct" && selectedProduct) {
            setName(selectedProduct?.name || '');
            setDescription(selectedProduct?.description || '');
            setCategory(selectedProduct?.category || '');
            setPrice(selectedProduct?.price || '');
        }
        console.log(selectedProduct?.name);
    }, [selectedProduct, type]);

    const handleUpdateProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        if (imageFile) formData.append('image', imageFile);  // Append the image file

        const response = await HomeService.updateProduct(formData, selectedProduct?._id);
        console.log(response);
    };

    const handleDeleteProduct = () => {

    };

    const handleCreateProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        if (imageFile) formData.append('image', imageFile);  // Append the image file

        const response = await HomeService.createProduct(formData);

        console.log(response);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];  // Get the selected file
        if (file) {
            setImageFile(file);  // Store the file object
        }
    }


    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={`${id}Label`}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${id}Label`}>{modalTitle}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {(type === "createProduct" || (type === "updateProduct" && selectedProduct && selectedProduct?.name)) && (
                            <form>
                                <LabelInputBs 
                                    lblChild={"Name of product"} 
                                    lblType={"name"}
                                    inpType={"name"}
                                    inpId={"name"}
                                    inpPlaceholder={"Name"}
                                    inpValue={name}
                                    inpOnChange={(e) =>setName(e.target.value)}
                                />
                                <LabelInputBs 
                                    lblChild={"Description of product"} 
                                    lblType={"description"}
                                    inpType={"description"}
                                    inpId={"description"}
                                    inpPlaceholder={"Description"}
                                    inpValue={description}
                                    inpOnChange={(e) =>setDescription(e.target.value)}
                                />
                                 <LabelInputBs 
                                    lblChild={"Category of product"} 
                                    lblType={"category"}
                                    inpType={"category"}
                                    inpId={"category"}
                                    inpPlaceholder={"Category"}
                                    inpValue={category}
                                    inpOnChange={(e) =>setCategory(e.target.value)}
                                />
                                <LabelInputBs 
                                    lblChild={"Price of product"} 
                                    lblType={"price"}
                                    inpType={"price"}
                                    inpId={"price"}
                                    inpPlaceholder={"Price"}
                                    inpValue={price}
                                    inpOnChange={(e) =>setPrice(e.target.value)}
                                />
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={handleImageChange}/>
                                    <label class="custom-file-label" for="inputGroupFile01">{imageFile ? imageFile.name : "Choose file"}</label>
                                </div>
                                <div className="modal-footer">
                                    {type === "updateProduct" ? 
                                    (<button type="button" className="btn btn-primary" onClick={handleUpdateProduct}>Save changes</button>) 
                                    : (<button type="button" className="btn btn-primary" onClick={handleCreateProduct}>Save</button>)}
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        )}

                        {type === 'viewProduct' && selectedKey && selectedKey.length === 1 && (
                            <form>
                                <LabelInputBs 
                                    lblChild={"Name of product"} 
                                    lblType={"name"}
                                    inpType={"name"}
                                    inpId={"name"}
                                    inpPlaceholder={"Name"}
                                    inpValue={selectedProduct ? selectedProduct?.name : ""}
                                />
                                <LabelInputBs 
                                    lblChild={"Description of product"} 
                                    lblType={"description"}
                                    inpType={"description"}
                                    inpId={"description"}
                                    inpPlaceholder={"Description"}
                                    inpValue={selectedProduct ? selectedProduct?.description : ""}
                                />
                                 <LabelInputBs 
                                    lblChild={"Category of product"} 
                                    lblType={"category"}
                                    inpType={"category"}
                                    inpId={"category"}
                                    inpPlaceholder={"Category"}
                                    inpValue={selectedProduct ? selectedProduct?.category : ""}
                                />
                                <LabelInputBs 
                                    lblChild={"Price of product"} 
                                    lblType={"price"}
                                    inpType={"price"}
                                    inpId={"price"}
                                    inpPlaceholder={"Price"}
                                    inpValue={selectedProduct ? selectedProduct?.price : ""}
                                />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={onConfirm}>Sign</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        )}

                        {type === "deleteProduct" && selectedKey && selectedProduct && (
                            <div>
                                <p>Are you sure to delete product {selectedProduct._id}</p>
                                 <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
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