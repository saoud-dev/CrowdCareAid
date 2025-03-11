import React, { useState } from "react";
import "./MyCampaignSelect.css";
import { FaArrowLeft } from "react-icons/fa";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDeleteCampaignMutation } from "../Redux/apiSlice";

const MyCampaignSelect = ({
  donation,
  onBack,
  images,
  setActiveComponent,
  setFormData,
}) => {
  const [deleteCampaign] = useDeleteCampaignMutation();
  console.log(donation);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      try {
        await deleteCampaign(donation._id).unwrap();
        alert("Campaign deleted successfully!");
        onBack();
      } catch (error) {
        alert("Failed to delete campaign.");
      }
    }
  };

  return (
    <div className="myCampaignSelect-donation-card">
      <div className="myCampaignSelect-donation-image-container">
        {/* Back Arrow - Left Top */}
        <FaArrowLeft
          className="myCampaignSelect-donation-back"
          onClick={onBack}
        />

        {/* Delete Icon - Right Top */}
        <DeleteForeverIcon className="delete-icon" onClick={handleDelete} />

        {/* Donation Image */}
        <img
          src={
            images && images[donation._id]
              ? images[donation._id]
              : "https://via.placeholder.com/300" // Default placeholder image
          }
          alt="Donation"
          className="myCampaignSelect-donation-image"
        />
      </div>

      <div className="myCampaignSelect-donation-content">
        <h2>{donation.title}</h2>
        <p>{donation.description || "No description available."}</p>

        {/* Fundraise Details */}
        <div className="myCampaignSelect-donation-fundraise">
          <div>
            <span className="myCampaignSelect-label">Total Fundraise</span>
            <h3 className="myCampaignSelect-label-h3">
              ${donation.raisedAmount}
            </h3>
          </div>
          <div>
            <span className="myCampaignSelect-label">Target Amount</span>
            <h3 className="myCampaignSelect-label-h3">${donation.amount}</h3>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="myCampaignSelect-progress-bar">
          <div
            className="myCampaignSelect-progress"
            style={{
              width: `${(donation.raisedAmount / donation.amount) * 100}%`,
            }}
          ></div>
        </div>

        {/* Location & Date */}
        <div className="myCampaignSelect-donation-info">
          <div>
            <span className="myCampaignSelect-label">Country</span>
            <h3 className="myCampaignSelect-label-h3">
              {donation.location || "Not specified"}
            </h3>
          </div>
          <div>
            <span className="myCampaignSelect-label">Duration Date</span>
            <h3 className="myCampaignSelect-label-h3">
              {donation.duration[0]} - {donation.duration[1]}
            </h3>
          </div>
        </div>

        {/* Buttons */}
        <div className="myCampaignSelect-donation-buttons">
          <button
            className="myCampaignSelect-edit-btn"
            onClick={() => {
              setFormData({
                title: donation.title,
                category: donation.category._id || "",
                location: donation.location || "",
                amount: donation.amount || "",
                duration: donation.duration || [],
                description: donation.description || "",
                images: donation.images || [],
              });
              setActiveComponent("Create Campaign");
            }}
          >
            Edit
          </button>

          <button className="myCampaignSelect-donate-btn">Donate</button>
        </div>
      </div>
    </div>
  );
};
export default MyCampaignSelect;
