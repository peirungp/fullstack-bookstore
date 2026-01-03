import { useState } from 'react';
import './ManageAccount.css';
import PersonalInfo from './PersonalInfo.jsx';
import Security from './Security.jsx';
import OrderHistory from './OrderHistory.jsx';

function ManageAccount({ email, firstName, lastName, phone, address, onProfileUpdated }) {

  const [activeTab, setActiveTab] = useState('personal');
    
  
    
    return (
        <div className="manage__account__container"> 
          <h1 className="manage__account__title">Manage Account</h1>
          <aside className="account__sidebar">
            <h2>Account Settings</h2>
            <nav className="account__nav">   
              <button 
                className={`nav__item ${activeTab === 'personal' ? 'active' : ''}`} 
                onClick={() => setActiveTab('personal')}
              >
                <img className="nav__icon" src="/images/edit_document.png" alt="document icon" />
                Personal Information
              </button>
              <button 
                className={`nav__item ${activeTab === 'security' ? 'active' : ''}`} 
                onClick={() => setActiveTab('security')}
              >
                <img className="nav__icon" src="/images/lock.png" alt="lock icon" />
                Security
              </button>
              <button 
                className={`nav__item ${activeTab === 'order' ? 'active' : ''}`} 
                onClick={() => setActiveTab('order')}
              >
                <img className="nav__icon" src="/images/credit_card.png" alt="credit card icon" />
                Order History
              </button>
            </nav>
          </aside>
          <div className="account__content">
            {activeTab === 'personal' && (
              <PersonalInfo
                email={email}
                firstName={firstName}
                lastName={lastName}
                phone={phone}
                address={address}
                onProfileUpdated={onProfileUpdated}
              /> 
            )}
            {activeTab === 'security' && (
              <Security 
                email={email}
              />
            )}
            {activeTab === 'order' && (
              <OrderHistory 
                email={email}
              />
            )}
          </div>           
        </div>
    );
  }

export default ManageAccount;