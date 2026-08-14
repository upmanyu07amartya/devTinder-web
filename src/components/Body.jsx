import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom';
const Body = () => {
  return (
    <div>
      <Navbar />
      <Outlet /> 
      {/* Outlet -  This is where the child routes will be rendered */}
      <Footer />
    </div>
  );
}

export default Body