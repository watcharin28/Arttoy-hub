import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ({ searchQuery, setSearchQuery, setSearchResults, setIsSearching }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.VITE_API_URL;
  const [inputValue, setInputValue] = useState("");
  const handleSearch = async (event) => {
  event.preventDefault();

    const keyword = inputValue.trim(); //ดึงค่าจาก input
    if (!keyword) {
      setSearchResults([]);
      return;
    }

    setSearchQuery(keyword);       //บันทึกคำที่ค้นหาจริง
    setIsSearching(true);          //กำหนดว่าอยู่ในโหมดค้นหาแล้ว

    try {
      const response = await axios.get(`${API_URL}/api/products/search?keyword=${keyword}`);
      setSearchResults(response.data);
    } catch (err) {
      console.error("Error occurred while searching:", err);
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // เปลี่ยนสถานะเมนูโปรไฟล์
  };

  const handleLogout = async () => {
    try {
      console.log("Logout clicked");

      // เรียก API ลบ cookie/token ที่ backend
      await axios.post(`${API_URL}/api/user/logout`, {}, {
        withCredentials: true, 
      });

      // นำทางไปยังหน้า Login
      navigate('/login');
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };
  const handleMyProfile = () => {
    console.log("My Profile clicked");
    navigate('/profile'); // นำทางไปยังหน้าโปรไฟล์
  };

  const handleSelling = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/user/Profile`, {
        withCredentials: true,
      });
      const user = response.data;

      if (user.is_seller) {
        navigate("/seller");
      } else {
        navigate("/sellerRegister");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between h-20 bg-white shadow-md px-4 sm:px-8 sticky top-0 z-20">
      {/* ส่วนของ Logo */}
      <div className="flex items-center">
        <img src="/images/AThub.png" alt="Art Toy Hub" className="w-32 h-16" />
      </div>

      {/* ส่วนของ search bar ตรงกลาง */}
      <div className="flex-grow flex justify-center mx-4">
        <form onSubmit={handleSearch} className="w-full max-w-md relative">
          <input
            type="text"
            placeholder=" Search for Product"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-4 pr-10 py-1.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </span>
        </form>
      </div>

      {/* ส่วนของเมนูนำทาง */}
      <div className="flex items-center space-x-4 mr-6 hidden sm:flex">
        <button
          onClick={goToCart}
          className="text-gray-700 hover:text-violet-500 transition m-2 duration-200"
          aria-label="Go to Cart"
          type="button"
        >
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
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>

        {/* ส่วนของโปรไฟล์ */}
        <div className="relative">
          <button onClick={toggleProfileMenu} className="text-gray-700 m-2 hover:text-violet-500">
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
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501
                                20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676
                                0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>

          {/* เมนู Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <button
                onClick={handleMyProfile}
                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                  />
                </svg>
                My Profile
              </button>

              <button
                onClick={handleSelling}
                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                </svg>

                Selling
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>

                Logout
              </button>
            </div>
          )}

        </div>
      </div>

      {/* เมนูสำหรับมือถือ (จะซ่อนในหน้าจอใหญ่) */}
      <div className="sm:hidden flex items-center">
        <button className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Header;