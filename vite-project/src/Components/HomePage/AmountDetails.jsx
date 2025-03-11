import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AmountDetails.css";
import AddIcon from "@mui/icons-material/Add";

const AmountDetails = ({ setActiveComponent, formData, setFormData }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: formData.amount || "",
      startDate: formData.duration[0] || "",
      endDate: formData.duration[1] || "",
      description: formData.description || "",
      images: formData.images || [],
    },
  });

  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  const onSubmit = (data) => {
    if (new Date(data.startDate) > new Date(data.endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    setFormData({
      ...formData,
      amount: data.amount,
      duration: [data.startDate, data.endDate],
      description: data.description,
      images: data.images,
    });

    setActiveComponent("Review");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }

    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setValue("images", [...formData.images, ...files]);
    setPreviewUrls((prev) => [...prev, ...newImageUrls]);
  };

  return (
    <div className="amount-container">
      <div className="amount-header">
        <h2>Amount Details</h2>
      </div>

      <div className="amount-content">
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

        <form
          className="amount-form-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="amount-input-group">
            <input
              type="number"
              placeholder="Amount"
              {...register("amount", {
                required: "Please enter a valid amount.",
                min: { value: 1, message: "Amount must be greater than 0." },
              })}
            />
            {errors.amount && <p className="error">{errors.amount.message}</p>}

            <input
              type="date"
              {...register("startDate", {
                required: "Start date is required.",
              })}
            />
            <input
              type="date"
              {...register("endDate", { required: "End date is required." })}
            />
            {watchStartDate &&
              watchEndDate &&
              watchStartDate > watchEndDate && (
                <p className="error">Start date cannot be after end date.</p>
              )}
          </div>

          <div className="amount-image-upload">
            <h2>Attach Images {previewUrls.length}/4</h2>
            <div className="amount-image-border">
              <div className="amount-add-image">
                {previewUrls.length < 4 && (
                  <>
                    <button
                      className="amount-upload-btn"
                      type="button"
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

          <div className="amount-description">
            <label>Description</label>
            <textarea
              placeholder="Write here"
              {...register("description", {
                required: "Description is required.",
                maxLength: {
                  value: 500,
                  message: "Description cannot exceed 500 characters.",
                },
              })}
            />
            {errors.description && (
              <p className="error">{errors.description.message}</p>
            )}
            <div className="amount-char-count">
              {watch("description")?.length || 0}/500
            </div>
          </div>

          <div className="amount-buttons">
            <button
              type="button"
              className="amount-back"
              onClick={() => setActiveComponent("Create Campaign")}
            >
              Back
            </button>
            <button type="submit" className="amount-continue">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AmountDetails;
