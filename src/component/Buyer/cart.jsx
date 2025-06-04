import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.VITE_API_URL;

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
  const total = subtotal ;

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

  return (
    <div className="min-h-screen ">
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

      <main className="max-w-6xl mx-auto px-20 py-10 pb-48 bg-white">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={cartItems.length > 0 && cartItems.every(item => item.selected)}
            onChange={selectAll}
            className="mr-3"
          />
          <label className=" font-bold text-xl">Select All</label>
        </div>

        {Object.entries(groupedBySeller).map(([sellerName, items]) => {
          const allSelected = items.every(item => item.selected);
          return (
            <div key={sellerName} className="bg-gray-100 border border-gray-200 rounded-xl p-5 mb-6">
              <div className="flex items-center mb-4 gap-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => toggleSellerSelection(sellerName)}
                />
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                    />
                  </svg>
                  {sellerName}
                </h2>
              </div>
              {items.map(({ product, selected, quantity }) => (
                <div
                  key={product.id}
                  className="bg-white flex items-center space-x-4 mb-4 p-4 rounded-md shadow-sm relative"
                  style={{ minHeight: '80px' }}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleItemSelection(product.id)}
                    className="mr-4"
                  />
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 flex flex-col justify-between h-20 relative">
                    <p className="text-base font-medium">{product.name}</p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-red-600 hover:text-red-800 absolute top-0 right-0"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>

                    <p className="text-gray-800 font-bold absolute bottom-0 left-0">
                      ฿{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          );
        })}

        <div className="fixed bottom-0 left-0 right-0 z-10">
          <div className="max-w-6xl mx-auto bg-white shadow-xl border-t px-4 py-4 shadow-[0_-6px_20px_rgba(0,0,0,0.2)]">
            <div className="flex justify-between mb-1 text-sm">
              <span>Subtotal</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between font-semibold text-base border-t pt-2">
              <span>Total</span>
              <span>฿{total.toLocaleString()}</span>
            </div>
            <button
              disabled={selectedItems.length === 0}
              onClick={handleCheckout}
              className={`mt-3 w-full py-2 text-md font-bold text-black rounded ${selectedItems.length === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-yellow-400 hover:bg-yellow-500'
                }`}
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
