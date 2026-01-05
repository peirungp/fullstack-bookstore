import { useState } from 'react';
import './LoginForm.css';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { FORM } from './setting.js';
import PasswordInput from './PasswordInput.jsx';

function LoginForm({ onLogin, navigateTo, onClose, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [clearError, setClearError] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '' ) {
      setLocalError(FORM.REQUIRED_FILL_OUT);
      return;
    }

    setLocalError('');
    setClearError(false);
    onLogin(email, password);
  }

  function handleAddAccount(e) {
    e.preventDefault();
    if (onClose) onClose();
    navigateTo('/register');
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  const displayError = localError || (clearError ? '' : error);

  return (
    <div className="login__overlay" onClick={handleOverlayClick}>
      <div className="login__modal" onSubmit={onSubmit}>
        <button className="login__close" onClick={onClose}>x</button>
        <form className="login__form" onSubmit={onSubmit}>
          <img src="/images/account.png" alt="An icon of a person inside a circle" className="account-icon"/>
          <h1 className="login__title">Sign In</h1>
          {displayError && <ErrorMessage error={displayError} />}
          <label className="login__label">
            <span>Email:</span>
            <input 
              type="email" 
              value={email} 
              onChange={e => {
                setEmail(e.target.value);
                setLocalError('');
                setClearError(true);
              }}
            />
        </label>
        <label className="login__label">
            <span>Password:</span>
            <PasswordInput
              value={password} 
              onChange={e => {
                setPassword(e.target.value);
                setLocalError('');
                setClearError(true);
              }}
            />  
        </label>
        <Button 
            className="login__button" 
            type="submit"
        >
              Sign In
        </Button>
        <Button 
            className="add__account__button" 
            type="button"
            onClick={handleAddAccount}
          >
            Create an Account
          </Button>
          <p>Don't have an account? Click "Create an Account" above.</p>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;