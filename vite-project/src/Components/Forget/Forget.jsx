import React, { useState } from "react";
import "./Forget.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../Redux/apiSlice";

function ForgetInput() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgetPassword(email).unwrap(); // Remove extra {}
      console.log("API Response:", response);

      localStorage.setItem("userEmail", email); // Save email
      setMessage("OTP sent to your email.");

      setTimeout(() => navigate("/forgetOtp"), 1500);
    } catch (error) {
      console.error("Error Response:", error);
      setMessage(
        error?.data?.message || "Failed to send reset link. Try again."
      );
    }
  };

  return (
    <>
      <div className="forget-container"> </div>
      <div className="form-wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h3>Reset Password</h3>
          <p className="forget-text">
            Please enter your email address that you used to register.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Email"}
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </>
  );
}

export default ForgetInput;
