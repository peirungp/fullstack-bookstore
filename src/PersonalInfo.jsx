import { useState } from 'react';
import './PersonalInfo.css';
import Button from './Button'; 
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage.jsx';
import { FORM } from './setting.js'; 
import { fetchUpdateProfile } from './services';



function PersonalInfo({ email, firstName, lastName, phone, address, onProfileUpdated }) {
  const [newFirstName, setNewFirstName] = useState(firstName || '');
  const [newLastName, setNewLastName] = useState(lastName || '');
  const [newPhone, setNewPhone] = useState(phone || '');
  const [newAddress, setNewAddress] = useState(address || '');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  function onUpdate(e) {
    e.preventDefault();
    if (newFirstName.trim() === '' || newLastName.trim() === '') {
      setError(FORM.REQUIRED_FILL_OUT);
      return;
    }
    setError('');

    fetchUpdateProfile(newFirstName, newLastName, newPhone, newAddress)
    .then(data => {
        setSuccessMessage('Profile updated successfully.');
        onProfileUpdated(data.firstName, data.lastName, data.phone, data.address);
        setTimeout(() => setSuccessMessage(''), 3000);
    })
    .catch(err => {
        setError(err.error);
        setSuccessMessage('');
    });

  }
    
    return (
      <div className="personal__info__container">
        <form className="account__form" onSubmit={onUpdate}>
            <div className="account__section">
                <h2>Personal Information</h2>
                <label className="manage__account__label">
                <span>First Name:</span>
                <input 
                    type="text" 
                    value={newFirstName} 
                    onChange={e => {
                    setNewFirstName(e.target.value);
                    if (error) setError('');
                    }}
                />
                </label>
                <label className="manage__account__label">
                <span>Last Name:</span>
                <input 
                    type="text" 
                    value={newLastName} 
                    onChange={e => {
                    setNewLastName(e.target.value);
                    if (error) setError('');
                    }}
                />
                </label>
                <label className="manage__account__label">
                <span>Email:</span>
                <input 
                    className="manage__account__email"
                    type="email" 
                    value={email} 
                    disabled           
                />
                </label>
                <label className="manage__account__label">
                <span>Phone:</span>
                <input 
                    className="manage__account__phone"
                    type="phone" 
                    value={newPhone} 
                    onChange={e => setNewPhone(e.target.value)}
                />
                </label>
                <label className="manage__account__label">
                <span>Address:</span>
                <input 
                    className="manage__account__address"
                    type="address" 
                    value={newAddress} 
                    onChange={e => setNewAddress(e.target.value)}
                />
                </label>
            </div>
            {successMessage && <SuccessMessage message={successMessage} />}
            {error && <ErrorMessage error={ error } />}      
            <Button 
              className="save__button" 
              type="submit"
            >
              Save Changes
            </Button>
          </form>  
      </div>
    );
}

export default PersonalInfo;