import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router";  // Fixed import path
import { logoutUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header (Navbar) */}
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <NavLink to="/dashboard/home" className="navbar-brand">
                            MyShop
                        </NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/home">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/dashboard/profile">{user?.fullname || ""}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Sidebar */}
            <div className="d-flex">
                <aside className="bg-dark text-white p-3 h-screen fixed top-0 left-0 flex flex-col items-start" style={{ width: '200px' }}>

                    {user?.isAdmin ? (
                        <div className="d-flex flex-column">
                            <button className="btn btn-secondary mb-2" onClick={() => navigate("/dashboard/profile")}>My Profile</button>
                            <button className="btn btn-secondary mb-2" onClick={() => navigate("/dashboard/products")}>My Products</button>
                            <button className="btn btn-secondary mb-2" onClick={() => navigate("/dashboard/orders")}>My Orders</button>
                            <button className="btn btn-secondary mb-2" onClick={() => navigate("/dashboard/settings")}>Settings</button>
                        </div> 
                    ) : (
                        <div className="d-flex flex-column">
                            <button className="btn btn-secondary mb-2" onClick={() => navigate("/dashboard/admin/products")}>Products</button>
                            <button className="btn btn-secondary mb-2" onClick={() => navigate("/dashboard/admin/orders")}>Orders</button>
                            <button className="btn btn-secondary mb-2" onClick={() => navigate("/dashboard/admin/settings")}>Settings</button>
                        </div> 
                    )}
                </aside>

                {/* Main Content */}
                <main className="flex-grow-1 bg-light p-4" style={{ marginLeft: "0px", minHeight: "100vh" }}>
                    <Outlet />
                </main>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <p>&copy; 2025 MyShop. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default DashboardLayout;
