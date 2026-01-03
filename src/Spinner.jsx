import './Spinner.css';

function Spinner() {
  return (
    <div className="loading__text">
      Loading<span className="dot">.</span>
      <span className="dot">.</span>
      <span className="dot">.</span>
    </div>
  );
}

export default Spinner;