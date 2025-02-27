import "./Navigation.css";
import websiteLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav>
      <div className="logo__container">
        <img src={websiteLogo} alt="Website Logo" className="website__logo" />
      </div>
      <div className="nav__links">
        <Link className="navigation__link" to={"/"}>
          Homepage
        </Link>
        <Link className="navigation__link" to={"/logs"}>
          Logs
        </Link>
        <Link className="navigation__link" to={"/goals"}>
          Goals
        </Link>
      </div>
    </nav>
  );
}
