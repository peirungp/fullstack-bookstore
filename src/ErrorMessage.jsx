import { ERRORLIST } from './setting.js';
import './ErrorMessage.css';

function ErrorMessage({ error }) {
  if (!error) {
    return null;
  }
  
  const errorMessage = typeof error === "string" 
  ? ERRORLIST[error] || ERRORLIST.DEFAULT 
  : JSON.stringify(error);
  return (
    <div className="error-message">
      <img className="error__message_icon" src="/images/error.png" alt="error icon" />
      {error && errorMessage}
    </div>
  );
}

export default ErrorMessage;
