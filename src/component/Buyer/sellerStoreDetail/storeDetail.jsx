import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../home/productcard';

const StoreDetail = () => {
  const { seller_id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState(null);
  const [sellerItems, setSellerItems] = useState([]);

  useEffect(() => {
    if (!seller_id) return;
    const fetchData = async () => {
      try {
        const sellerRes = await axios.get(`http://localhost:8080/api/sellers/${seller_id}`);
        const productRes = await axios.get(`http://localhost:8080/api/sellers/${seller_id}/products`);
        console.log("สินค้า:", productRes.data);
        const availableItems = productRes.data.filter(item => !item.is_sold);

        setSeller(sellerRes.data);
        setSellerItems(availableItems);
      } catch (err) {
        console.error("โหลดข้อมูลไม่สำเร็จ", err);
      }
    };

    fetchData();
  }, [seller_id]);

  if (!seller) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm border-b w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
            <button onClick={() => navigate("/")} className="flex items-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Seller</h1>
            <div style={{ width: 48 }}></div>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center px-6">
          <p className="text-gray-500 text-lg">Seller Not Found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm border-b w-full">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
          <button onClick={() => navigate("/")} className="flex items-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">{seller.username}</h1>
          <div style={{ width: 48 }}></div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-20 py-10 pb-48 bg-white">
        <div className="bg-white rounded-md shadow border mb-8 p-6 flex items-center gap-6">
          <img
            src={seller.profileImage || "/images/default-profile.png"}
            alt="Shop Profile"
            className="w-40 h-40 object-cover rounded-md shadow"
          />
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <svg className="w-8 h-8 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5h3V21H2.36h11.14H18h3.64V9.349M3.75 21V9.349m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 003.75.614M6.75 18h3.75v-4.5H6.75v4.5Z" />
              </svg>
              {seller.sellerInfo?.shop_name || seller.username}
            </h2>
            <div className="text-gray-700 mb-1 flex items-center">
              <svg className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.945a1 1 0 00.95.69h4.152c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.945c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.54-1.118l1.286-3.945a1 1 0 00-.364-1.118L2.028 9.372c-.783-.57-.38-1.81.588-1.81h4.152a1 1 0 00.95-.69l1.286-3.945z" />
              </svg>
              <span>Rating: {seller.rating ? seller.rating.toFixed(1) : "N/A"}</span>
            </div>
            <p className="text-gray-700 flex items-center">
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5H10m4 0h7.875c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375C2.754 4.75 2.25 5.254 2.25 5.875v1.5C2.25 8 2.754 8.5 3.375 8.5H21z" />
              </svg>
              All Art Toy: {sellerItems.length}
            </p>
          </div>
        </div>

        <section>
          <h3 className="text-2xl font-bold mb-4">Art Toys</h3>
          {sellerItems.length === 0 ? (
            <p className="text-gray-600">No items available from this seller.</p>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {sellerItems.map((item) => (
                <ProductCard
                  key={item._id}
                  product_id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.product_image}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StoreDetail;
