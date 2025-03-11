import React from "react";
import { useForm } from "react-hook-form";
import "./Signup.css";
import logo from "../../assets/logo.png";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import { useSignUpMutation } from "../Redux/apiSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await signUp(data).unwrap();
      console.log("Signup Successful:", response);
      localStorage.setItem("userEmail", data.email);

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Create your Account</h3>

          <div className="flex">
            <input
              type="text"
              className={errors.firstName ? "error-input" : ""}
              placeholder={
                errors.firstName ? errors.firstName.message : "First Name"
              }
              {...register("firstName", { required: "First name is required" })}
            />

            <input
              type="text"
              className={errors.lastName ? "error-input" : ""}
              placeholder={
                errors.lastName ? errors.lastName.message : "Last Name"
              }
              {...register("lastName", { required: "Last name is required" })}
            />
          </div>

          <input
            type="email"
            className={errors.email ? "error-input" : ""}
            placeholder={errors.email ? errors.email.message : "Enter Email"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />

          <input
            type="password"
            className={errors.password ? "error-input" : ""}
            placeholder={
              errors.password ? errors.password.message : "Enter Password"
            }
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
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
