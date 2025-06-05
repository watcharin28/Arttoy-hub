import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const NavBar = ({ setSearchResults, setIsSearching, setSearchQuery, setCategory }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const API_URL = import.meta.env.VITE_API_URL;

  const categories = [
    'Crybaby', 'Labubu', 'Dimoo', 'Skullpanda', 'Hacipupu',
    'Molly', 'Pucky', 'Instinctoy', 'Hirono', 'Baby three',
    'Dodowo puppy', 'Crayon shinchan', 'Nyota', 'Farmer Bob',
    'Panghu', 'Lulu', 'Zsiga', 'Panda Roll', 'Kimmon','Other'
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

  if (location.pathname === '/') {
    setSearchQuery('');
    setCategory('');
    setIsSearching(false);
    setSearchResults([]);
  }

  navigate('/');
};
  const handleCategoryClick = async (category) => {
    setActiveTab(category);
    setCategory(category);
    setSearchQuery('');
    setIsSearching(true);
    setShowDropdown(false);
    try {
      const res = await axios.get(`${API_URL}/api/products/search?category=${category}`);
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
      <nav className="bg-violet-400 flex flex-wrap justify-start px-2 sm:px-4 md:px-8 
                      h-8 md:h-10 z-20">
        <div className="flex items-center ml-2 sm:ml-8 md:ml-16 lg:ml-24 space-x-1 sm:space-x-2 md:space-x-4">
          {/* All Category Button */}
          <button
            onClick={handleAllCategoryClick}
            className={`flex items-center px-2 md:px-6 py-2  font-semibold text-white
              ${showDropdown ? 'bg-yellow-600' : 'bg-yellow-400 hover:bg-yellow-500'}
              text-xs sm:text-sm md:text-base`}
          >
            All Category
            <svg
              className={`w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showDropdown ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
          </button>

          {/* Home Button */}
          <button
            onClick={handleHomeClick}
            className={`flex items-center px-2 md:px-6 py-4  font-medium text-white
              ${activeTab === 'home'
                ? 'bg-violet-600'
                : 'bg-violet-400 hover:bg-violet-600'}
              transition-colors duration-200
              text-xs sm:text-sm md:text-base
              h-6 sm:h-8 md:h-10`}
          >
            Home
          </button>
        </div>
      </nav>

      {showDropdown && (
        <div className="p-4 sm:p-6 md:p-8 flex justify-center"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 sm:gap-x-12 gap-y-4 sm:gap-y-6 max-w-6xl w-full">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`text-center rounded transition-colors border
                  ${activeTab === category
                    ? 'bg-violet-400 text-white border-violet-600'
                    : 'text-gray-800 border-transparent hover:bg-gray-50 hover:border-violet-300'}
                  text-xs sm:text-[0.65rem] md:text-sm
                  p-1 sm:p-2 md:p-3
                  truncate`}
              >
                <div className="font-medium">{category}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;