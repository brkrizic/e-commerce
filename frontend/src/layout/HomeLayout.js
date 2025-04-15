import React from "react";
import { NavLink, Outlet } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeLayout = () => {
  return (
    <div>
      {/* HEADER */}
      <header style={{ backgroundColor: "red" }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
          <div className="container">
            <NavLink to="/" className="navbar-brand">
              MyShop
            </NavLink>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto"> {/* ✅ Proper Bootstrap Nav */}
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main >
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        © 2024 Company Name
      </footer>
    </div>
  );
};

export default HomeLayout;