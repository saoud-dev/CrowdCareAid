import React from "react";
import "./Logout.css";
import { useLogoutMutation } from "../Redux/apiSlice";
import { useNavigate } from "react-router-dom";

const Logout = ({ onClose, userData }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log(res);
      localStorage.removeItem("accessToken");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Sign out</h2>
        <div className="model-name-para">
          <p className="user-name">{userData.firstName}</p>
          <p className="user-para">
            Are you sure you want to sign out of this account?
          </p>
        </div>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            No
          </button>
          <button className="confirm-btn" onClick={handleLogout}>
            {isLoading ? "Signing out..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
