import axios from "axios";

export const AdminService = {
    createProduct: async (product) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/products`, product);
            if(response.status === 200){
                return response.data;
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async (product, id) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/v1/products/${id}`, product);
            if(response.status === 200){
                console.log(response);
                return response.data;
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/products/${id}`);
            if(response.status === 200){
                console.log(response);
                return response.data;
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.log(error);
        }
    }
}