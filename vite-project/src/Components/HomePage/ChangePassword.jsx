import React from "react";
import { useForm } from "react-hook-form";
import "./ChangePassword.css";
import { useChangePasswordMutation } from "../Redux/apiSlice";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await changePassword(data).unwrap();
      console.log(res);
      alert("Password Changed Successfully");
      reset();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-heading">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <input
            type="password"
            placeholder="Old Password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
          />
          {errors.oldPassword && (
            <p className="error-message">{errors.oldPassword.message}</p>
          )}
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.newPassword && (
            <p className="error-message">{errors.newPassword.message}</p>
          )}
        </div>
        <button className="continue-button" type="submit" disabled={isLoading}>
          {isLoading ? "Updating..." : "Continue"}
        </button>
      </form>
      {error && <p className="error-message">{error?.data?.message}</p>}
    </div>
  );
};

export default ChangePassword;
