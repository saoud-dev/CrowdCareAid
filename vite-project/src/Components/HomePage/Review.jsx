import React from "react";
import "./Review.css";
import {
  useCreateCampaignMutation,
  useUploadImageMutation,
} from "../Redux/apiSlice";

const Review = ({ setActiveComponent, formData, setFormData }) => {
  const [createCampaign, { isLoading, isError, error }] =
    useCreateCampaignMutation();

  const [uploadImage] = useUploadImageMutation();

  const handleSubmit = async () => {
    try {
      console.log("Uploading images...");

      const uploadedImages = await Promise.all(
        formData.images.map(async (image, index) => {
          if (!image) {
            console.error(`Image at index ${index} is missing!`);
            return null;
          }

          const imageData = new FormData();
          imageData.append("image", image);

          try {
            const response = await uploadImage(imageData).unwrap();
            console.log("Uploaded Image" + response);

            if (response.data.length === 0) {
              console.log(
                "Image upload response format is incorrect!",
                response
              );
              return null;
            }

            return response.data[0];
          } catch (uploadError) {
            console.error(
              `Image upload failed at index ${index}:`,
              uploadError
            );
            return null;
          }
        })
      );

      const formattedData = {
        ...formData,
        images: uploadedImages.filter((url) => url !== null),
      };

      console.log("Final Payload:", formattedData);

      const campaignResponse = await createCampaign(formattedData).unwrap();
      console.log("Campaign Created Successfully:", campaignResponse);
      setActiveComponent("myCampaign");

      setFormData({
        title: "",
        category: "",
        location: "",
        amount: "",
        duration: [],
        description: "",
        images: [],
      });
    } catch (err) {
      console.error("Failed to create campaign:", err);
      if (err.data) {
        console.error("Error Details:", err.data);
      }
    }
  };

  return (
    <div className="review-container">
      <div className="review-header">
        <h2>Review</h2>
      </div>

      <div className="review-content">
        <div className="review-sidebar">
          <div className="review-step">
            <div className="review-step-circle completed">✔</div>
            <span>Fundraiser Details</span>
          </div>
          <div className="review-line"></div>
          <div className="review-step">
            <div className="review-step-circle completed">✔</div>
            <span>Amount Details</span>
          </div>
          <div className="review-line"></div>
          <div className="review-step">
            <div className="review-step-circle active">3</div>
            <span>Review</span>
          </div>
        </div>

        <div className="review-details">
          <div className="review-card">
            <h3>Fundraiser Details</h3>
            <div className="review-info">
              <div className="review-flex">
                <p>
                  <strong>Fundraiser Title</strong>
                </p>
                <p>
                  <strong>Choose Category</strong>
                </p>
                <p>
                  <strong>Location</strong>
                </p>
              </div>
              <div className="review-flex">
                <span>{formData.title}</span>
                <span>{formData.category}</span>
                <span>{formData.location}</span>
              </div>
            </div>
          </div>

          <div className="review-card">
            <h3>Amount Details</h3>
            <div className="review-info">
              <div className="review-flex">
                <p>
                  <strong>Amount</strong>
                </p>
                <p>
                  <strong>Duration</strong>
                </p>
                <p>
                  <strong>Attach Images</strong>
                </p>
              </div>
              <div className="review-flex">
                <span>{formData.amount}</span>
                <span>
                  {formData.duration[0]} ---- {formData.duration[1]}
                </span>
                <div className="review-image-preview">
                  {formData.images.length > 0 ? (
                    formData.images.map((image, index) => (
                      <div key={index} className="review-thumbnail">
                        <img src={URL.createObjectURL(image)} alt="Uploaded" />
                      </div>
                    ))
                  ) : (
                    <p>No images uploaded</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="review-card">
            <h3>Description</h3>
            <div className="review-info">
              <span className="review-description">{formData.description}</span>
            </div>
          </div>

          <div className="review-buttons">
            <button
              className="review-back"
              onClick={() => setActiveComponent("AmountDetails")}
            >
              Back
            </button>
            <button
              className="review-create"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>

          {isError && (
            <p className="error-message">
              Error: {error?.data?.message || "Something went wrong"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
