import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  //ดึง Api 
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/cart`, {
          withCredentials: true,
        });

        const cart = res.data.cart || [];

        // แปลงเป็นโครงสร้างที่ Cart ใช้
        const formattedItems = cart.map(item => ({
          id: item.id,
          quantity: item.quantity,
          selected: false,
          product: {
            id: item.product_id,
            name: item.name,
            image: item.product_image,
            price: item.price,
            seller: item.seller_name,
          }
        }));

        setCartItems(formattedItems);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${API_URL}/api/cart/${productId}`, {
        withCredentials: true,
      });

      setCartItems(items => items.filter(item => item.product.id !== productId));
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item from cart.");
    }
  };

  const toggleItemSelection = (productId) => {
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const selectAll = () => {
    const allSelected = cartItems.every(item => item.selected);
    setCartItems(items => items.map(item => ({ ...item, selected: !allSelected })));
  };

  const toggleSellerSelection = (seller) => {
    const sellerItems = cartItems.filter(item => item.product.seller === seller);
    const allSelected = sellerItems.every(item => item.selected);
    setCartItems(items =>
      items.map(item =>
        item.product.seller === seller ? { ...item, selected: !allSelected } : item
      )
    );
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.product.price * (item.quantity || 1),
    0
  );
  // const shippingFee = 40;
  const total = subtotal;

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to proceed to checkout.');
      return;
    }

    navigate('/checkout', { state: { items: selectedItems } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading your cart...</p>
      </div>
    );
  }
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm border-b w-full">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
            <button
              onClick={() => navigate("/")}
              className="flex items-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-xl font-bold text-gray-900">Shopping Cart</h1>
            <div style={{ width: 48 }}></div>
          </div>
        </header>

        <main className="flex-grow flex flex-col justify-center items-center px-6">
          <p className="text-gray-500 text-lg mb-48">Your cart is empty</p>
        </main>
      </div>
    );
  }

  const groupedBySeller = cartItems.reduce((groups, item) => {
    const seller = item.product.seller || 'Unknown Seller';
    if (!groups[seller]) groups[seller] = [];
    groups[seller].push(item);
    return groups;
  }, {});

// ... รหัส import และ logic เหมือนเดิม

return (
  <div className="min-h-screen">
    <header className="bg-white shadow-sm border-b w-full">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between w-full">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-base sm:text-lg font-medium">Back</span>
        </button>
        <h1 className="text-2xl font-extrabold text-gray-900">Shopping Cart</h1>
        <div style={{ width: 48 }}></div>
      </div>
    </header>

    <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 md:px-10 bg-white pb-48">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
          onChange={selectAll}
          className="mr-3 w-5 h-5 cursor-pointer"
        />
        <label className="font-semibold text-lg sm:text-xl cursor-pointer select-none">Select All</label>
      </div>

      {Object.entries(groupedBySeller).map(([sellerName, items]) => {
        const allSelected = items.every(item => item.selected);
        return (
          <div key={sellerName} className="bg-gray-100 border border-gray-300 rounded-xl p-4 sm:p-5 mb-6">
            <div className="flex items-center mb-4 gap-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={() => toggleSellerSelection(sellerName)}
                className="w-5 h-5 cursor-pointer"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{sellerName}</h2>
            </div>
            {items.map(({ product, selected, quantity }) => (
              <div
                key={product.id}
                className="bg-white flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-5 mb-5 p-3 sm:p-4 rounded-md shadow-sm relative"
                style={{ minHeight: '80px' }}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleItemSelection(product.id)}
                  className="mr-4 self-start sm:self-auto w-5 h-5 cursor-pointer"
                />
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full max-w-[120px] h-auto object-cover rounded"
                />
                <div className="flex-1 flex flex-col justify-between h-full relative w-full">
                  <p className="text-base sm:text-lg font-medium text-gray-900">{product.name}</p>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-800 absolute top-0 right-0"
                    aria-label="Remove item"
                  >
                    {/* trash icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <p className="text-gray-800 font-bold mt-2 sm:mt-auto text-lg">
                    ฿{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <div className="fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-6xl mx-auto bg-white shadow-xl border-t px-4 py-5 sm:px-6 shadow-[0_-6px_20px_rgba(0,0,0,0.2)]">
          <div className="flex justify-between mb-1 text-base sm:text-lg">
            <span className="font-medium">Subtotal</span>
            <span>฿{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between font-semibold text-xl border-t pt-3">
            <span>Total</span>
            <span>฿{total.toLocaleString()}</span>
          </div>
          <button
            disabled={selectedItems.length === 0}
            onClick={handleCheckout}
            className={`mt-4 w-full py-3 text-lg font-extrabold rounded transition-colors duration-200
              ${selectedItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500'}
            `}
          >
            Checkout ฿{total.toLocaleString()}
          </button>
        </div>
      </div>
    </main>
  </div>
);

};
export default Cart;
