import React, { useState } from "react";
import "./AmountDetails.css";
import AddIcon from "@mui/icons-material/Add";

const AmountDetails = ({ setActiveComponent, formData, setFormData }) => {
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      setFormData({
        ...formData,
        duration:
          name === "startDate"
            ? [value, formData.duration[1] || ""]
            : [formData.duration[0] || "", value],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (formData.images.length + files.length > 10) {
      alert("You can only upload up to 10 images.");
      return;
    }

    // Create image URLs for preview
    const newImageUrls = files.map((file) => URL.createObjectURL(file));

    setFormData({
      ...formData,
      images: [...formData.images, ...files], // Storing files in formData
    });

    setPreviewUrls((prev) => [...prev, ...newImageUrls]);
  };

  return (
    <div className="amount-container">
      <div className="amount-header">
        <h2>Amount Details</h2>
      </div>

      <div className="amount-content">
        {/* Sidebar Steps */}
        <div className="amount-sidebar">
          {["Fundraiser Details", "Amount Details", "Review"].map(
            (step, index) => (
              <React.Fragment key={index}>
                <div className="amount-step">
                  <div
                    className={`amount-step-circle ${
                      index === 0
                        ? "completed"
                        : index === 1
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {index === 0 ? "✔" : index + 1}
                  </div>
                  <span>{step}</span>
                </div>
                {index < 2 && <div className="amount-line"></div>}
              </React.Fragment>
            )
          )}
        </div>

        {/* Form Section */}
        <div className="amount-form-container">
          <div className="amount-input-group">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <input
              type="date"
              name="startDate"
              value={formData.duration[0]}
              onChange={handleChange}
            />
            <input
              type="date"
              name="endDate"
              value={formData.duration[1]}
              onChange={handleChange}
            />
          </div>

          {/* Image Upload */}
          <div className="amount-image-upload">
            <h2>Attach Images {previewUrls.length}/10</h2>
            <div className="amount-image-border">
              <div className="amount-add-image">
                {previewUrls.length < 10 && (
                  <>
                    <button
                      className="amount-upload-btn"
                      onClick={() =>
                        document.getElementById("fileInput").click()
                      }
                    >
                      <AddIcon className="amount-upload-icon" />
                    </button>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/*"
                      className="amount-image-input"
                      onChange={handleFileChange}
                      multiple
                      style={{ display: "none" }}
                    />
                  </>
                )}
              </div>
              <div className="amount-image-preview">
                {previewUrls.map((url, index) => (
                  <div key={index} className="amount-thumbnail">
                    <img src={url} alt={`Uploaded ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="amount-description">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Write here"
              value={formData.description}
              onChange={handleChange}
            />
            <div className="amount-char-count">
              {formData.description.length}/500
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="amount-buttons">
            <button
              className="amount-back"
              onClick={() => setActiveComponent("FundraiserDetails")}
            >
              Back
            </button>
            <button
              className="amount-continue"
              onClick={() => setActiveComponent("Review")}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmountDetails;
