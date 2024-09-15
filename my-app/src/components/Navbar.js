import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
      <h1 style={{ fontSize: '2rem', color: '#ff6347' }}>BiteQuest</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/search/location" className="nav-link">Location Search</Link></li>
        <li><Link to="/search/image" className="nav-link">Image Search</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
