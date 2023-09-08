// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../../CSS/Navbar.css'; // Import your custom CSS for styling
import SWFTLogo from '../../assets/SWFT Horizontal.svg'

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false); // Close the menu when a link is clicked
  };

//   const handleLogout = () => {
//     dispatch(logout());
//     handleCloseMenu(); // close menu after logout
//   };

  return (
    <nav className="navigation">
      <Link to='/' className="brand-name">
        <img src={SWFTLogo} alt="Logo" className='logo'/>
      </Link>
      <button 
        className="hamburger"
        onClick={() => {
          toggleMenu();
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          menuOpen ? "navigation-menu expanded" : "navigation-menu"
        }
        >
        <ul>
          <li>
            <Link to="/" onClick={handleCloseMenu}>Home</Link>
          </li>
          <li>
            <Link to="/about" onClick={handleCloseMenu}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={handleCloseMenu}>Contact</Link>
          </li>
          <li>
            {/* {isAuthenticated ? (    
              <button className="logout-button" onClick={handleLogout}>Logout</button> // Render logout
            ) : (
              <Link to="/login" onClick={handleCloseMenu}>Start</Link>
            )} */}
            <Link to="/login" onClick={handleCloseMenu}>Start</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;