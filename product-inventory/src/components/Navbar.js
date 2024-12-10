import React from 'react';
import '../style/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Raw Food E-commerce</h2>
      <div className="links">
        <a href="/">Home</a>
        <a href="/cart">Cart</a>
      </div>
    </nav>
  );
};

export default Navbar;
