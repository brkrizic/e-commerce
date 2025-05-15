import axios from "axios";
import React from "react";

const baseUrl = "http://localhost:3001/api/v1/orders";

const useOrderApi = () => {
    const getAllOrders = async () => {
        try {
            const response = await axios.get(`${baseUrl}`, { withCredentials: true });
            if (response.status === 200) {
                return response.data;  // Return the data when successful
            } else {
                throw new Error("Failed to fetch orders, unexpected status code: " + response.status); // Handle non-200 responses
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw new Error("Error fetching orders: " + error.message);  // Propagate the error
        }
    };

    const getOrderById = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/${id}`, { withCredentials: true });
            if(response.status === 200){
                return response.data;
            } else {
                throw new Error("Failed to fetch order");
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    return { getAllOrders, getOrderById };
}

export default useOrderApi;