import React, { useState } from 'react';
import Header from '../component/Seller/header';
import AppSidebar from '../component/Seller/sideBar';
import MyOrder from '../component/Seller/MyOrder';

const SellerHomePage = () => {
  const [activeSection, setActiveSection] = useState("my-order");

  const renderSection = () => {
    switch (activeSection) {
      case "my-order":
        return <MyOrder />;
      case "my-product":
        return <div className="text-lg font-semibold">My Product</div>;
      case "add-product":
        return <div className="text-lg font-semibold">Add Product</div>;
      default:
        return <div className="text-lg text-red-500">Not Found</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r shadow-md">
          <AppSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onClose={() => { }}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 transition-all duration-300 ease-in-out overflow-y-auto">

            {renderSection()}

        </main>

      </div>
    </div>
  );
};

export default SellerHomePage;
