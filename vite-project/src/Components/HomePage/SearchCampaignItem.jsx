import React from "react";
import { useState } from "react";
import "./SearchCampaignItem.css";
import { Avatar } from "@mui/material";
import { useGetCampaignDonatorsQuery } from "../Redux/apiSlice";
import DonateModel from "./DonateModel";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ReportModel from "./ReportModel";

const SearchCampaignItem = ({ campaign, goBack, images }) => {
  const [isDonateModalOpen, setDonateModalOpen] = useState(false); // State for modal

  const [reportModel, setReportModel] = useState(false);

  const { data, error, isLoading } = useGetCampaignDonatorsQuery(campaign._id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading donators</p>;

  return (
    <div className="searchCampaign-container">
      {/* Campaign Image */}
      <ReportProblemIcon
        className="searchCampaign-report"
        onClick={() => setReportModel(true)}
      />
      <img
        src={
          images[campaign._id] ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&s"
        }
        className="campaign-image"
      />

      {/* Title & Description */}
      <div className="searchCampaign-details">
        <h2>{campaign.title}</h2>
        <p className="searchCampaign-description">{campaign.description}</p>
        {/* Amount Raised */}
        <div className="searchCampaign-amounts">
          <div>
            <p>Total Fundraise</p>
            <strong>${campaign.raisedAmount}</strong>
          </div>
          <div>
            <p>Target Amount</p>
            <strong>${campaign.amount}</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="searchCampaign-progress-bar">
          <div
            className="searchCampaign-progress"
            style={{
              width: `${(campaign.raisedAmount / campaign.amount) * 100}%`,
            }}
          >
            <span className="progress-text">
              {Math.round((campaign.raisedAmount / campaign.amount) * 100)}%
            </span>
          </div>
        </div>

        {/* Location & Duration */}
        <div className="searchCampaign-info">
          <div>
            <p>Location</p>
            <strong>{campaign.location}</strong>
          </div>
          <div>
            <p>Duration Dates</p>
            <strong>
              {campaign.duration[0].split("T")[0]}--
              {campaign.duration[1].split("T")[0]}
            </strong>
          </div>
        </div>

        {/* Donor List */}

        <h3 className="donor-heading">Donor List</h3>
        {data.data.length > 0 ? (
          <div className="donor-list">
            {data.data.map((donor, index) => (
              <div key={index} className="donor-item">
                <div className="donor-avatar">
                  <Avatar />
                  <div className="donor-name">
                    <span>{donor.donator.firstName}</span>
                    <p className="donor-email">{donor.donator.email}</p>
                  </div>
                </div>

                <div className="donor-date">
                  <p className="donor-light">Donation Date:</p>
                  <p className="donor-light1">
                    {new Date(donor.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <div className="donor-amount">
                  <p className="donor-light">Donation Amount:</p>
                  <p className="donor-light1">${donor.amount}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          "This Campaign have zero donar"
        )}

        {/* Buttons */}
        <div className="searchCampaign-buttons">
          <button className="back-btn" onClick={goBack}>
            Back
          </button>
          <button
            className="donate-btn"
            onClick={() => setDonateModalOpen(true)}
          >
            Donate
          </button>
        </div>
      </div>

      {/* Donate Model */}
      {isDonateModalOpen && (
        <DonateModel
          campaignId={campaign._id}
          onClose={() => setDonateModalOpen(false)}
        />
      )}

      {/* Report Model */}

      {reportModel && (
        <ReportModel
          onClose={() => setReportModel(false)}
          userId={campaign._id}
        />
      )}
    </div>
  );
};

export default SearchCampaignItem;
