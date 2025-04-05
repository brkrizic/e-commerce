import React, { useEffect } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes, useNavigate } from 'react-router';
import LoginScreen from './pages/public/LoginScreen';
import HomeScreen from './pages/public/HomeScreen';
import HomeLayout from './layout/HomeLayout';
import RegisterScreen from './pages/public/RegisterScreen';
import DashboardLayout from './layout/DashboardLayout';
import DashboardScreen from './pages/DashboardScreen';
import PrivateRoute from './routes/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './redux/authSlice';
import DashboardProfile from './pages/DashboardProfile';
import DashboardProducts from './pages/DashboardProducts';
import DashboardOrders from './pages/DashboardOrders';
import DashboardSettings from './pages/DashboardSettings';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminSettings from './pages/admin/AdminSettings';
import PrivateAdminRoute from './routes/PrivateAdminRoute';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) || localStorage.getItem('token');

  //const isAdmin = useSelector((state) => state.auth.user.isAdmin) || false;
  const isAdminTest = true;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);


  return (
      <BrowserRouter>
        <Routes>

            <Route element={<HomeLayout />}>
              <Route index element={<HomeScreen />}></Route>
              <Route path="/login" element={<LoginScreen />}></Route>
              <Route path="/register" element={<RegisterScreen />}></Route>
            </Route>

            <Route element={<PrivateRoute isLoggedIn={isLoggedIn}/>}>
              <Route path="/dashboard" element={<DashboardLayout />}>         
                <Route index element={<DashboardScreen />} />
                <Route path="/dashboard/home" element={<HomeScreen />}/>
                <Route path="/dashboard/profile" element={<DashboardProfile />}/>
                <Route path="/dashboard/products" element={<DashboardProducts />}/>
                <Route path="/dashboard/orders" element={<DashboardOrders />}/>
                <Route path="/dashboard/settings" element={<DashboardSettings />}/>

                <Route element={<PrivateAdminRoute isAdmin={isAdminTest}/>}>
                  <Route path='/dashboard/admin/products' element={<AdminProducts />}></Route>
                  <Route path='/dashboard/admin/orders' element={<AdminOrders />}></Route>
                  <Route path='/dashboard/admin/settings' element={<AdminSettings />}></Route>
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/"} />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
