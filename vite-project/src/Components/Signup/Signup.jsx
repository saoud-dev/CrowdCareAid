import React, { useState } from "react";
import "./Signup.css";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../Redux/apiSlice";

const Signup = () => {
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(formData).unwrap();
      console.log("Signup Successful:", response);
      localStorage.setItem("userEmail", formData.email); // Save email to localStorage
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      navigate("/otp");
    } catch (err) {
      console.error("Signup Failed:", err);
    }
  };

  return (
    <>
      <div className="signup-container"> </div>
      <div className="form-wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Create your Account</h3>

          <div className="flex">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="input-btn" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Signup"}
          </button>

          <div className="input-or">
            <span>OR</span>
          </div>

          <div className="option">
            <img src={google} alt="Google" />
            <img src={facebook} alt="Facebook" />
          </div>

          <div className="signin-option">
            Already have an account?
            <span onClick={() => navigate("/login")}>Sign in</span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
