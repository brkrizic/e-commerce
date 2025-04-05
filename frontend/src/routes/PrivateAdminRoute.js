import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateAdminRoute = ({ isAdmin }) => {
    return isAdmin ? <Outlet/> : <Navigate to="/dashboard/home" replace/>
}
export default PrivateAdminRoute;