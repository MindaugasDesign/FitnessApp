import "./Button.css";

export function Button({ buttonText }) {
  return (
    <button className="controlBtn">
      <span className="buttonText">{buttonText}</span>
    </button>
  );
}
