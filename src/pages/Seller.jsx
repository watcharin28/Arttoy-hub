import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../component/Seller/header";
import AppSidebar from "../component/Seller/sideBar";
import MyOrder from "../component/Seller/MyOrder";
import MyProductList from "../component/Seller/myProductList";
import AddProduct from "../component/Seller/addProduct";

export default function SellerHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r shadow-md">
          <AppSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 transition-all duration-300 ease-in-out overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="myOrder" replace />} />
            <Route path="myOrder" element={<MyOrder />} />
            <Route path="myProduct" element={<MyProductList />} />
            <Route path="*" element={<div className="text-lg text-red-500">Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
