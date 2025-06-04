import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ({ searchQuery, setSearchQuery, setSearchResults, setIsSearching }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.API_URL;

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
      navigate('/Login');
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  const handleSellerProfile = () => {
    console.log(" Seller Profile clicked");
    navigate('/SellerProfile');
  };

  const handleBuying = () => {
    console.log("Buyer clicked");
    navigate('/'); 
  };

 return (
    <nav className="flex items-center justify-between h-20 bg-violet-400 shadow-md px-4 sm:px-8 sticky top-0 z-20">
      <div className="flex items-center">
        <img src="/images/AThub.png" alt="Art Toy Hub" className="w-32 h-16" />
        <h1 className='font-semibold text-white text-2xl'>Seller Centre</h1>
      </div>

      {/* ส่วนของโปรไฟล์ */}
      <div className="relative">
        <button onClick={toggleProfileMenu} className="text-white m-2 hover:text-violet-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
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
              onClick={handleSellerProfile}
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
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
              onClick={handleBuying}
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
              Buying
            </button>

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-gray-700 hover:bg-gray-200 text-left flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* เมนูสำหรับมือถือ (จะซ่อนในหน้าจอใหญ่) */}
      <div className="sm:hidden flex items-center">
        <button className="text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Header;