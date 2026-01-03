import { useState } from 'react';
import Navbar from './Navbar';
import Logo from '/images/logo.png';
import './Header.css';

function Header({ navigateTo, loginStatus, onLogout, isAdmin }) {
  const [searchBar, setSearchbar] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchBar.trim()) {
      navigateTo(`/search?query=${encodeURIComponent(searchBar.trim())}`);
      setSearchbar('');
    }
  }

  return (
    <header className="header">
      <a className="skip-to-content-link" href="#main">Skip to content</a>
      <div className="header__logo">
        <a href="/" onClick={(e) => { e.preventDefault(); navigateTo('/') }}>
          <img src={Logo} alt="A white snowflake icon" className="header__logo-image" />
        </a>
      </div>
        <h1 className="header__title">BookSpace</h1>
        <form className="header__search" onSubmit={handleSearch}>
          <input 
            type="text"
            placeholder="Search by Title, Author, or Keyword"
            value={searchBar}
            onChange={(e) => setSearchbar(e.target.value)}
            className="header__search-input"
          />
          <button type="submit" className="header__search-button">🔍</button>
        </form>
          <Navbar 
            navigateTo={navigateTo} 
            loginStatus={loginStatus} 
            onLogout={onLogout}
            isAdmin={isAdmin}
            className="header__nav" 
          />
    </header>
  );
}

export default Header;
