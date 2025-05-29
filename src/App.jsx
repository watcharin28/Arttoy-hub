import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import SellerRegisterPage from './pages/SellerRegister';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminReports from "./pages/admin/Reports";
// import SellerHomePage from './pages/Seller';


function App() {
    return (
        <div>
            <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/sellerRegister" element={<SellerRegisterPage />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                {/* <Route path="/seller" element={<SellerHomePage/>} /> */}

            </Routes>
        </div>
    );

}

export default App;
