import React, { useState } from 'react';
import Header from '../component/Header.jsx';
import Navbar from '../component/navbar.jsx';
import Banner from '../component/banner.jsx';
import ProductList from '../component/productlist.jsx';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); // ระบุว่ามีการค้นหาหรือยัง

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching} // ส่งเข้า Header
      />

      <Navbar />

      {/* ✅ แสดง Banner เฉพาะตอนยังไม่ค้นหา */}
      {!isSearching && <Banner />}

      <ProductList
        searchResults={searchResults}
        keyword={searchQuery}
        isSearching={isSearching}
      />
    </div>
  );
};

export default HomePage;
