import React from "react";
import logo from "../../assets/logo.png";
import "./Popup.css";
import { useNavigate } from "react-router-dom";

function Popup() {
  const navigate = useNavigate();
  return (
    <>
      <div className="model-wrapper"></div>
      <div className="popup-container">
        <div className="popup-logo">
          <img src={logo} alt="" />
        </div>

        <div className="popup-name">
          <span>Password Change</span>
        </div>

        <div className="popup-msg">
          <p> Password Change Successfully</p>
        </div>

        <button className="popup-btn" onClick={() => navigate("/login")}>
          Okay
        </button>
      </div>
    </>
  );
}

export default Popup;
