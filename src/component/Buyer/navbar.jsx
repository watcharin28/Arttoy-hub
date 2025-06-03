import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ setSearchResults, setIsSearching, setSearchQuery, setCategory }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  const categories = [
    'Crybaby', 'Labubu', 'Dimoo', 'Skullpanda', 'Hacipupu',
    'Molly', 'Pucky', 'Instinctoy', 'Hirono', 'Baby three',
    'Dodowo puppy', 'Crayon shinchan', 'Nyota', 'Farmer Bob',
    'Panghu', 'Lulu', 'Zsiga', 'Panda Roll', 'Kimmon',
  ];

  useEffect(() => {
    if (window.location.pathname === '/') {
      setActiveTab('home');
    } else {
      setActiveTab(null);
    }
  }, []);

  const handleAllCategoryClick = async () => {
    setShowDropdown(prev => !prev);
  };

  const handleHomeClick = (e) => {
  e.preventDefault();
  setActiveTab('home');
  setShowDropdown(false);
  setSearchQuery('');
  setCategory('');
  setIsSearching(false);     
  setSearchResults([]);     
  navigate('/');
};
  const handleCategoryClick = async (category) => {
    setActiveTab(category);
    setCategory(category);
    setSearchQuery('');
    setIsSearching(true);
    setShowDropdown(false);
    try {
      const res = await axios.get(`http://localhost:8080/api/products/search?category=${category}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error("Error loading category products:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sticky top-20 bg-gray-100 shadow-md z-10">
      <nav className="bg-violet-400 flex justify-start h-10 px-4 z-20">
        <div className="flex items-end ml-24">
          <button
            onClick={handleAllCategoryClick}
            className={`flex items-center px-6 py-2 font-semibold text-white
    ${showDropdown ? 'bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'}`}
          >
            All Category
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showDropdown ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} // 👈 เปลี่ยนตรงนี้
              />
            </svg>
          </button>


          <button
            onClick={handleHomeClick}
            className={`text-white font-medium px-6 py-2 ml-4 h-10 flex items-center
              ${activeTab === 'home'
                ? 'bg-violet-600'
                : 'bg-violet-400 hover:bg-violet-600'}
              transition-colors duration-200`}
          >
            Home
          </button>
        </div>
      </nav>

      {showDropdown && (

        <div className="p-10 flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-x-12 gap-y-6 max-w-6xl  ">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`p-2text-center transition-colors 
                    ${activeTab === category
                    ? 'bg-violet-400 text-white border-violet-600'
                    : 'text-gray-800 hover:bg-gray-50 hover:border-violet-300'}`}
              >
                <div className="text-sm font-medium">{category}</div>
              </button>
            ))}
          </div>
        </div>

      )}
    </div>
  );
};


export default NavBar;
