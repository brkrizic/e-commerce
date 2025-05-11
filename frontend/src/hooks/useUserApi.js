import axios from "axios";
import React from "react";

const baseUrl = "http://localhost:3001/api/v1/users"

const useUserApi = () => {

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/v1/users`, { withCredentials: true });
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

    const getUserById = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/users/${id}`, { withCredentials: true });
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

    const updateUser = async (id, user) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/users/${id}`, user, { withCredentials: true });
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

    const deleteUser = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/users/${id}`, { withCredentials: true });
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

    return { getAllUsers, getUserById, updateUser, deleteUser };
}

export default useUserApi;