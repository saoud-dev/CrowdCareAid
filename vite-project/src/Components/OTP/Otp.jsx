import React, { useState, useRef } from "react";
import "./Otp.css";
import logo from "../../assets/logo.png";
import otp from "../../assets/otp.png";
import { useNavigate } from "react-router-dom";
import { useVerifyOtpMutation, useResendOtpMutation } from "../Redux/apiSlice";

function Otp() {
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);

  const inputRefs = useRef([]);

  // Handle input change with auto focus
  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move to next input
    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otpValues.join("");

    if (otpCode.length !== 4) {
      alert("Please enter a 4-digit OTP.");
      return;
    }

    try {
      const response = await verifyOtp({ otp: otpCode, email }).unwrap();
      console.log("OTP Verified:", response);
      navigate("/login");
    } catch (err) {
      console.error("OTP Verification Failed:", err);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp(email).unwrap();
      alert("OTP has been resent to your email!");
      console.log(response);
    } catch (err) {
      alert("Failed to resend OTP. Try again.");
    }
  };

  return (
    <>
      <div className="otp-container"> </div>
      <div className="form-wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h3>OTP Verification</h3>
        <p className="otp-send-text">OTP Sent to {email}</p>

        <div className="otp-img">
          <img src={otp} alt="OTP Icon" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otpValues.map((val, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={val}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>

          <p className="resend-otp">
            Didn't receive OTP?
            <span
              className="resend-link"
              onClick={handleResendOtp}
              style={{ cursor: "pointer", color: "blue" }}
            >
              {isResending ? "Resending..." : "Resend"}
            </span>
          </p>

          <button className="verify-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Otp;
