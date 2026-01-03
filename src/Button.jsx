import './Button.css';

function Button({ 
  children,
  className,
  disabled=false,
  onClick,
  type="button",
  visual="button",
}) {
    let buttonClass = "button";
    if (visual === "button") {
      buttonClass = "button button__primary";
    }
    return (
      <button 
        className={`${buttonClass} ${className}`}
        disabled={disabled} type={type}
        onClick={onClick}
      >
        {children}
      </button>
    );
}

export default Button;