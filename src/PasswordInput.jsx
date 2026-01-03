import { useState } from 'react';
import './PasswordInput.css';

function PasswordInput({ value, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="input-wrapper">
      <input 
        type={isPasswordVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
      />
      <span
        className="password__toggle"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? 
          <img src="/images/visibility_on.png" alt="Show password icon" /> 
          : <img src="/images/visibility_off.png" alt="Hide password icon" />
        }
      </span>
    </div>   
  );
}

export default PasswordInput;