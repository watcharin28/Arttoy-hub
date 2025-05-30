import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ShoppingCartIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 3.293A1 1 0 007 18h12M7 13L5.4 5M16 21a1 1 0 11-2 0 1 1 0 012 0zm-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);

const CubeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0v10l-8 4-8-4V7m16 0L12 11 4 7" />
  </svg>
);

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // กำหนด active ตาม path ปัจจุบัน
  const pathToId = {
    "/seller/myOrder": "my-order",
    "/seller/myProduct": "my-product",

  };

  const activeSection = pathToId[location.pathname] || "";

  const isActive = (id) =>
    activeSection === id
      ? "bg-purple-50 text-purple-700 border-r-2 border-purple-500"
      : "hover:bg-gray-50 text-gray-700";

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 p-4 space-y-6">
        {/* Purchase Order Section */}
        <div>
          <h3 className="text-gray-600 font-medium text-sm mb-3">Purchase Order</h3>
          <button
            onClick={() => navigate("/seller/myOrder")}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive("my-order")}`}
          >
            {ShoppingCartIcon}
            <span className="font-medium">My Order</span>
          </button>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="text-gray-600 font-medium text-sm mb-3">Product</h3>

          <button
            onClick={() => navigate("/seller/myProduct")}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${isActive("my-product")}`}
          >
            {CubeIcon}
            <span className="font-medium">My Product</span>
          </button>

        </div>
      </div>
    </div>
  );
}