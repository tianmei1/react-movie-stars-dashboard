import React, { useState } from 'react';
import logo from '../CM_logo.svg';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Allow search to trigger when 'Enter' is pressed
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar-search">
        <i className="fa fa-search"></i>
        <input
            type="text"
            placeholder="Search for a celebrities"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {query && <button className="clear-btn" onClick={clearSearch}>x</button>}
      </div>
    </nav>
  );
};

export default Navbar;
