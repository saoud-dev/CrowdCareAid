import React, { useState } from "react";
import "./ChangePassword.css";
import { useChangePasswordMutation } from "../Redux/apiSlice";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, { isLoading, error }] = useChangePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      alert("Both fields are required!");
      return;
    }

    try {
      const res = await changePassword({ oldPassword, newPassword }).unwrap();
      console.log(res);
      alert("Password Changed Successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="change-password-heading">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
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
