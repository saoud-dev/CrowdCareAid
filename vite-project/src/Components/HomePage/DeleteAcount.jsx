import React from "react";
import "./Logout.css";
import { useDeleteAccountMutation } from "../Redux/apiSlice";
import { useNavigate } from "react-router-dom";

function DeleteAcount({ onClose, userData }) {
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteAccount().unwrap();
      localStorage.removeItem("accessToken");
      navigate("/signup");
    } catch (err) {
      alert("Failed to delete account");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2>Delete Account</h2>
        <div className="model-name-para">
          <p className="user-name">{userData.firstName}</p>
          <p className="user-para">
            Are you sure you want to delete this account?
          </p>
        </div>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            No
          </button>
          <button className="confirm-btn" onClick={handleDelete}>
            {isLoading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAcount;
