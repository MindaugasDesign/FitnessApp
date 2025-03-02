import { useNavigate } from "react-router-dom";
import "./Return.css";

export function Return() {
  let navigate = useNavigate();

  return (
    <button className="returnBtn" onClick={() => navigate(-1)}>
      <span className="returnText">Go Back</span>
    </button>
  );
}
