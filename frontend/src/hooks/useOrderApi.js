import axios from "axios";
import React from "react";

const baseUrl = "http://localhost:3001/api/v1/orders";

const useOrderApi = () => {
    const getAllOrders = async () => {
        try {
            const response = await axios.get(`${baseUrl}`, { withCredentials: true });
            if(response.status === 200){
                return response.data;
            } else {
                console.log("Failed to fetch orders");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getOrderById = async (id) => {
        try {
            const response = await axios.get(`${baseUrl}/${id}`, { withCredentials: true });
            if(response.status === 200){
                console.log(response.data);
                return response.data;
            } else {
                console.log("Failed to fetch order");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { getAllOrders, getOrderById };
}

export default useOrderApi;