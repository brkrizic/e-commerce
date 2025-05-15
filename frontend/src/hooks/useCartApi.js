import React from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/cart";

const useCartApi = () => {

    const getCart = async () => {
        try {
            const response = await axios.get(`${baseUrl}`, { withCredentials: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    };

    const addCartItem = async (productId, quantity) => {
        try {
            const response = await axios.put(`${baseUrl}/add`, { productId, quantity }, { withCredentials: true });
            console.log(response);
            return response;
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
            throw error;
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            const response = await axios.put(`${baseUrl}/update`, { productId, quantity }, { withCredentials: true });
            return response;
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
            throw error;
        }
    };

    const removeCartItem = async (productId) => {
        try {
            const response = await axios.put(`${baseUrl}/remove/${productId}`, { withCredentials: true });
            return response;
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data || error.message);
            throw error;
        }
    };



    return { getCart, addCartItem, updateCartItem, removeCartItem };
};

export default useCartApi;