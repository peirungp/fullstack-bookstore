import { useState } from 'react';
import './Security.css';
import Button from './Button';
import ErrorMessage from './ErrorMessage.jsx';
import SuccessMessage from './SuccessMessage.jsx';
import { FORM } from './setting.js';
import { fetchChangePassword } from './services';
import PasswordInput from './PasswordInput.jsx';

function Security() {
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(false);
    const [error, setError] = useState('');


  function onChangePassword(e) {
    e.preventDefault();

    setError('');
    setSuccessMessage('');

    if (newPassword.length < 6 || newPassword.length > 16) {
      setError(FORM.PASSWORD_TOO_SHORT);
      return;
    } 

    if (!/[A-z]/.test(newPassword) ||!/[a-z]/.test(newPassword) || !/[0-9]/.test(newPassword) && !/[!@#$%^&*()[\]{}]/.test(newPassword)) {
      setError(FORM.PASSWORD_INVALID);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError(FORM.PASSWORD_MISMATCHING);
      return;
    }

    fetchChangePassword(currentPassword, newPassword)
    .then(() => {
        setSuccessMessage('Password changed successfully.');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setTimeout(() => setSuccessMessage(''), 3000);
    })
    .catch(error => {
        setError(error.message);
        setSuccessMessage('');
    });
  }

    return (
        <div className="security__container">
          <h2>Security setting</h2>
            <form className="security__form" onSubmit={onChangePassword}>
              <div>
                <label className="security__label" >
                  Current Password:
                  <PasswordInput
                      value={currentPassword}
                      onChange={e => {
                        setCurrentPassword(e.target.value);
                        if (error) setError('');
                      } }
                  />         
                </label >
                <label className="security__label" >
                  New Password:
                  <PasswordInput
                      value={newPassword}
                      onChange={e => {
                        setNewPassword(e.target.value);
                        if (error) setError('');
                      } }
                  />              
                </label>
                <label className="security__label" >
                  Confirm New Password:
                  <PasswordInput
                      value={confirmNewPassword}
                      onChange={e => {
                        setConfirmNewPassword(e.target.value);
                        if (error) setError('');
                      } }
                  />
                </label>
                {successMessage && <SuccessMessage message={successMessage} />}
                {error && <ErrorMessage error={ error } />}
                <Button
                  className="save__password__button"
                  type="submit"
                >
                    Save New Password
                </Button>                
                </div>               
            </form>
        </div>
    );
}

export default Security;