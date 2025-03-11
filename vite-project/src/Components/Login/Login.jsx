import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Redux/apiSlice";

function LoginInput() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
        loginType: "email",
      }).unwrap();
      localStorage.setItem("accessToken", response.data.access_token);
      localStorage.setItem("loggedin", true);
      localStorage.setItem("RefreshToken", response.data.refresh_token);

      console.log("Saved Token:", localStorage.getItem("accessToken"));
      console.log(response);

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Welcome Back</h3>

          <input
            type="email"
            placeholder="Enter Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="login-error">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="login-error">{errors.password.message}</p>
          )}

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
