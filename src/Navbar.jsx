import { useState } from 'react';
import { LOGIN_STATUS } from './setting';
import './NavBar.css';
import menu from './menu';

function NavBar({ navigateTo, loginStatus, onLogout }) {

  const [dropdownOpen, setIsDropdownOpen] = useState(false);
  
  return(
    <nav className="navbar">
      <ul className="menu__list">
        {menu.map(item => (
          <li key={item.name} className="menu__item">
            <a 
              href={item.path} 
              onClick={e => {
              e.preventDefault(); 
              navigateTo(item.path);
              }} 
              className="menu__link"
            >
              {item.name}
            </a>
          </li>
        ))}
        <li className="account__menu"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
              className="account__button"
            >
              <img className="account__icon" src="/images/account.png" alt="account image" />
              <span className="account__text">My Account</span>
              <span className={`account__arrow${dropdownOpen ? ' open' : ''}`}>▲</span>
            </button>
            <div className={`account__dropdown ${dropdownOpen ? 'open' : ''}`}>
                {loginStatus === LOGIN_STATUS.IS_LOGGED_IN ? (
                <>
                  <button
                    className="menu__link"
                    onClick={e => {
                    e.preventDefault(); 
                    onLogout();
                    }}
                  >
                    Sign Out
                  </button>
                  <button 
                    className="menu__link"
                    onClick={e => {
                      e.preventDefault();
                      navigateTo('/manage-account');
                      setIsDropdownOpen(false);
                    }}
                  >
                    Manage Account
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="menu__link"
                    onClick={e => {
                    e.preventDefault(); 
                    navigateTo('/login');
                  }}
                  >
                    Sign In
                  </button>
                  <button
                    className="menu__link"
                    onClick={e => {
                      e.preventDefault(); 
                      navigateTo('/register');
                      }}
                  > 
                    Create Account
                  </button>
                </>
              )}
            </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
