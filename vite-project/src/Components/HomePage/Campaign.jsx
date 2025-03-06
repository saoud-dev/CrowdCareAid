import React from "react";
import "./Campaign.css";

function Campaign({ setActiveComponent }) {
  return (
    <div className="campaign-wrapper">
      <h2 className="campaign-question">What Do you want to donate today?</h2>
      <div className="campaign-container">
        <div className="overlay">
          <div className="campaign-margin">
            <h2 className="campaign-heading">Start Your own Funding</h2>
            <button
              className="campaign-btn"
              onClick={() => setActiveComponent("FundraiserDetails")}
            >
              Start Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Campaign;
