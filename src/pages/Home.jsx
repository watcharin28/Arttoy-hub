import React from 'react';
import Header from '../component/Header.jsx';
import Navbar from '../component/navbar.jsx';
import Banner from '../component/banner.jsx';
import ProductList from '../component/productlist.jsx';
import { useState } from 'react';



const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div>
      <Header setSearchResults={setSearchResults} />
      
      <Navbar/>
      {searchResults.length === 0 && <Banner />}
      <ProductList searchResults={searchResults}/>

    </div>
  );
};

export default HomePage;