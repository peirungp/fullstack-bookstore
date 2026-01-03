
import './SuccessMessage.css';

function SuccessMessage({ message }) {

     
    return (
        <div className="success__message__container">
            <img className="success__message__icon" src="/images/check_circle.png" alt="check icon" />
            <p className="success__message">{message}</p>
        </div>

    );
}

export default SuccessMessage;