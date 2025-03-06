import React, { useState } from "react";
import "./ReportModel.css";
import CloseIcon from "@mui/icons-material/Close";
import { useCreateReportMutation } from "../Redux/apiSlice";

const ReportModel = ({ onClose, userId }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [createReport, { isLoading, isError }] = useCreateReportMutation();

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert("Please select a reason for reporting.");
      return;
    }

    try {
      const res = await createReport({
        campaignId: userId,
        reason: selectedReason,
      }).unwrap();
      alert("Report submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit the report. Please try again.");
    }
  };

  return (
    <div className="report-overlay">
      <div className="report-modal">
        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>

        <h2>Report the user</h2>
        <p>Please help us by selecting a reason.</p>

        {/* Radio Buttons */}
        <div className="report-options">
          {[
            "Identity fraud",
            "Undesirable or harmful",
            "Publication of inappropriate contents",
            "Harassment or bullying",
            "Other",
          ].map((option, index) => (
            <label key={index} className="report-option">
              {option}
              <input
                type="radio"
                name="reportReason"
                value={option}
                className="reportinput"
                checked={selectedReason === option}
                onChange={(e) => setSelectedReason(e.target.value)}
              />
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

        {isError && <p className="error-text">Failed to submit the report.</p>}
      </div>
    </div>
  );
};

export default ReportModel;
