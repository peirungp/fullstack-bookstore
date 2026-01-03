import { useState } from 'react';
import './RegisterForm.css';
import Button from './Button';  
import ErrorMessage from './ErrorMessage';
import { FORM } from './setting.js';
import PasswordInput from './PasswordInput.jsx';

function RegisterForm({ onRegister, onClose, navigateTo }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function validPassword(password) {
    if (password.length < 6 || password.length > 16) {
      return FORM.PASSWORD_TOO_SHORT;
    } 

    if (!/[A-z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) && !/[!@#$%^&*()[\]{}]/.test(password)) {
      return FORM.PASSWORD_INVALID;
    }

    return null;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      setError(FORM.REQUIRED_FILL_OUT);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(FORM.EMAIL_INVALID);
      return;
    }

    const passwordError = validPassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setError(FORM.PASSWORD_MISMATCHING);
      return;
    }

    onRegister(email, password, firstName, lastName);
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  function handleSignIn(e) {
    e.preventDefault();
    if (onClose) onClose();
    navigateTo('/login');
  }
 
  return (
    <div>
      <div className="login__overlay" onClick={handleOverlayClick}>
        <div className="login__modal" onSubmit={onSubmit}>
          <button className="login__close" onClick={onClose}>x</button>
          <form className="login__form" onSubmit={onSubmit}>
          <img src="/images/account.png" alt="An icon of a person inside a circle" className="account-icon"/>
          <h1 className="login__title">Create an Account</h1>
          {error && <ErrorMessage error={error} />}
          <label className="login__label">
            <span>First Name:</span>
            <input 
              type="text" 
              value={firstName} 
              onChange={e => {
                setFirstName(e.target.value);
                if (error) setError('');
              }}
            />
        </label>
        <label className="login__label">
            <span>Last Name:</span>
            <input 
              type="text" 
              value={lastName} 
              onChange={e => {
                setLastName(e.target.value);
                if (error) setError('');
              }}
            />
        </label>
        <label className="login__label">
            <span>Email:</span>
            <input 
              type="email" 
              value={email} 
              onChange={e => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
            />
        </label>
        <label className="login__label">
            <span>Password:</span>
            <PasswordInput 
              value={password} 
              onChange={e => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
            /> 
        </label>
        <label className="login__label">
            <span>Confirm Password:</span>
            <PasswordInput
              value={confirmPassword} 
              onChange={e => {
                setConfirmPassword(e.target.value);
                  if (error) setError('');
                }}
            />
        </label>
        <Button 
            className="login__button" 
            type="submit"
        >
            Create Account    
        </Button>
        <Button 
            className="signin__button" 
            type="button"
            onClick={handleSignIn}
          >
            Sign In
        </Button>
        <p>Already have an account? Click "Sign In" above.</p>
        </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;