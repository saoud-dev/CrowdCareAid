import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Redux/apiSlice";

function LoginInput() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
        loginType: "email",
      }).unwrap();

      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("RefreshToken", response.data.refresh_token);

      localStorage.setItem("userEmail", formData.email);
      console.log("Saved Token:", localStorage.getItem("accessToken"));
      console.log(response);
      setFormData({
        email: "",
        password: "",
      });

      navigate("/home");
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  return (
    <>
      <div className="login-container"> </div>
      <div className="form-wrapper">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h3>Welcome Back</h3>

          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
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

          <div className="forget">
            <span onClick={() => navigate("/forget")}>Forget Password?</span>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="or">
            <span>OR</span>
          </div>

          <div className="option">
            <img src={google} alt="Google" />
            <img src={facebook} alt="Facebook" />
          </div>

          <div className="signup-option">
            Don't have an account?
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginInput;
