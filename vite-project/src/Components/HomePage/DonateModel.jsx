import React, { useState } from "react";
import { useDonateMutation } from "../Redux/apiSlice";
import "./DonateModel.css";

const DonateModel = ({ campaignId, onClose }) => {
  const [donate, { isLoading, error }] = useDonateMutation();
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const response = await donate({
        campaignId,
        amount: parseFloat(amount),
      }).unwrap();

      setSuccessMessage("Donation successful! Thank you for your support.");
      console.log(response);
      setAmount("");
    } catch (err) {
      alert("Failed to donate!");
      console.error(err);
    }
  };

  return (
    <div className="donateModel-overlay">
      <div className="donateModel-content">
        <h2>Donate Now</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="1"
        />
        <button onClick={handleDonate} disabled={isLoading}>
          {isLoading ? "Processing..." : "Donate"}
        </button>
        {successMessage && (
          <p className="donateModelsuccess-message">{successMessage}</p>
        )}
        {error && (
          <p className="donateModelerror-message">
            Donation failed. Try again!
          </p>
        )}
        <button className="donateModelclose-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DonateModel;
