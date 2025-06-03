import React, { useState } from 'react';
import Header from '../component/Buyer/Header';
import NavBar from '../component/Buyer/navbar';
import Banner from '../component/Buyer/banner';
import ProductList from '../component/Buyer/home/productlist';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // state สำหรับเก็บหมวดหมู่ที่เลือกจาก NavBar (ส่งไป FilterSidebar ด้วย)
  const [selectedCategories, setSelectedCategories] = useState([]);
  // state สำหรับเก็บตัวละครที่เลือกจาก FilterSidebar (ถ้ามี)
  const [selectedCharacters, setSelectedCharacters] = useState([]);

  // ฟังก์ชันรับค่าจาก NavBar เมื่อเลือกหมวดหมู่ (ส่งเป็น array หรือ string ก็ได้ตาม design)
  const handleCategorySelect = (category) => {
    if (!category) {
      // กรณีกด All Category หรือ Home ให้ล้างตัวกรองหมวดหมู่
      setSelectedCategories([]);
      setIsSearching(false);
      setSearchResults([]);
    } else {
      setSelectedCategories([category]);
      setIsSearching(true);
      // สามารถเรียก API หรือทำการค้นหาตาม category ที่เลือกได้ที่นี่
      // ตัวอย่าง: fetchSearchResults({ categories: [category], keyword: searchQuery })
    }
  };

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchResults={setSearchResults}
        setIsSearching={setIsSearching}
      />

      {/* ส่ง callback ให้ NavBar เพื่อรับ category ที่เลือก */}
      <NavBar onCategorySelect={handleCategorySelect} />

      {!isSearching && <Banner />}

      <div className="flex">
        {isSearching && (
          <FilterSidebar
            selectedCategories={selectedCategories}
            selectedCharacters={selectedCharacters}
            onCategoryChange={setSelectedCategories}
            onCharacterChange={setSelectedCharacters}
          />
        )}

        <div className="flex-1">
          <ProductList
            searchResults={searchResults}
            keyword={searchQuery}
            isSearching={isSearching}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
