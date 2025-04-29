import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [searchQuery, setSearchQuery] = useState(""); // ค่าค้นหาจาก input
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // เปิด-ปิด เมนูโปรไฟล์
    const navigate = useNavigate(); // สำหรับการนำทางไปหน้าอื่น

    const handleSearch = (event) => {
        event.preventDefault();
        console.log("Search Query: ", searchQuery);
        // ฟังก์ชันค้นหาที่นี่ เช่นส่งค่าไปยัง API หรือเปลี่ยนเส้นทางไปหน้าผลลัพธ์การค้นหา
    };

    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen); // เปลี่ยนสถานะเมนูโปรไฟล์
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        // เพิ่มการออกจากระบบที่นี่ เช่น ลบ token หรือข้อมูลการเข้าสู่ระบบ
        navigate('/Login'); // นำทางไปยังหน้า Login
    };

    const handleMyProfile = () => {
        console.log("My Profile clicked");
        navigate('/profile'); // นำทางไปยังหน้าโปรไฟล์
    };

    return (
        <nav className="flex items-center justify-between h-20 bg-white shadow-md px-4 sm:px-8 sticky top-0 z-20">
            {/* ส่วนของ Logo */}
            <div className="flex items-center">
                <img src="/images/AThub.png" alt="Art Toy Hub" className="w-32 h-16" />
            </div>

            {/* ส่วนของ search bar ตรงกลาง */}
            <div className="flex items-center justify-center flex-grow">
                <form onSubmit={handleSearch} className="w-full max-w-md relative">
                    <input
                        type="text"
                        placeholder="  Search for Product"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // อัพเดตค่าของ searchQuery
                        className="w-full p-1 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                            className="w-5 h-5 text-gray-400 m-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>
                    </span>
                </form>
            </div>

            {/* ส่วนของเมนูนำทาง */}
            <div className="flex items-center space-x-4 mr-4 hidden sm:flex">
                <a
                    href="/Login"
                    className="text-gray-700 hover:text-violet-500 transition duration-200"
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
                </a>

                {/* ส่วนของโปรไฟล์ */}
                <div className="relative">
                    <button onClick={toggleProfileMenu} className="text-gray-700 hover:text-violet-500">
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
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                            <a
                                href="/profile"
                                className="text-gray-700 hover:text-violet-500 transition duration-200"
                            ></a>
                            <button
                                onClick={handleMyProfile}
                                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                            >
                                My Profile
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-left"
                            >
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
