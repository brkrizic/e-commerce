import axios from "axios";

const HomeService = {
    getAllProducts: async (page = 1, limit = 20) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/products?page=${page}&limit=${limit}`, {
                withCredentials: true
            });
            if(response.data.success){
                return response.data;
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.error(error);
        }
    },
    getProductsByName: async (name) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/products?name=${name}`, {
                withCredentials: true
            });
            if(response.data.success){
                return response.data;
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.log(error);
        }
    },
    getAllCategories: async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/v1/categories");
            if(response.status === 200){
                return response.data;
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.error(error);
        }
    },
    getProductById: async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/products/${id}`);
            if(response.status === 200){
                return response.data;
            } else {
                console.error("Failed to fetch products");
            }
        } catch (error) {
            console.log(error);
        }
    },
}

export default HomeService;