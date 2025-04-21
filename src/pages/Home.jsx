import React from 'react';
import Header from '../component/Header.jsx';
import Navbar from '../component/navbar.jsx';
import Banner from '../component/banner.jsx';
import ProductList from '../component/productlist.jsx';


const HomePage = () => {
  return (
    <div>
      <Header />
      <Navbar/>
      <Banner />
      <ProductList/>

    </div>
  );
};

export default HomePage;