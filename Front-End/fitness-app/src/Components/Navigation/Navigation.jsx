import "./Navigation.css";
import websiteLogo from "../../assets/logo.png";

export function Navigation() {
  return (
    <nav>
      <div className="logo__container">
        <img src={websiteLogo} alt="Website Logo" className="website__logo" />
      </div>
      <h1>Hello</h1>
      <div className="test1">This is a test div to find the colors</div>
      <div className="test2">This is a test div to find the colors</div>
    </nav>
  );
}
