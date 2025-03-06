import { useState } from "react";
import React from "react";
import "./ChangePassword.css";
import logo from "../../assets/logo.png";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../Redux/apiSlice";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword({ email, newPassword }).unwrap();
      console.log("Password Changed:", response);
      setShowModel(true);

      // Navigate to login page after success
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="change-container"> </div>
      <div className="form-wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h3>OTP Verification</h3>
        <p className="change-text">
          To change your account password, please fill in the fields below.
        </p>

        <form className="changePassword-input" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="changePassword-btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Change Password"}
          </button>
        </form>

        {showModel && <Popup />}
      </div>
    </>
  );
}

export default ChangePassword;
