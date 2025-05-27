import React, { useState } from 'react';
import Header from '../component/Buyer/Header';
import NavBar from '../component/Buyer/navbar';
import Banner from '../component/Buyer/banner';
import ProductList from '../component/Buyer/home/productlist';

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

      <NavBar />

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
