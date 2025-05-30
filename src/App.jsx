import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import SellerRegisterPage from './pages/SellerRegister';
import SellerHomePage from './pages/Seller';
import ProductDetailPage from './pages/ProductDetail';


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/sellerRegister" element={<SellerRegisterPage/>} />
                <Route path="/seller/*" element={<SellerHomePage/>} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
        </div>
    );

}

export default App;
