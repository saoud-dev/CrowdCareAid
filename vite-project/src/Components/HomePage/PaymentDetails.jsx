import React, { useState } from "react";
import { useEffect } from "react";
import "./PaymentDetails.css";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useGetAuthUserCampaignQuery } from "../Redux/apiSlice";

const PaymentDetails = () => {
  const [images, setImages] = useState({});
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { data, error, isLoading } = useGetAuthUserCampaignQuery();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (data?.data) {
      data.data.forEach((fund, index) => {
        fetch(
          `https://dev.api.crowdcareaid.com/api/getImage?key=${fund.images}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Pass token
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((imgdata) => {
            setImages((prevImages) => ({
              ...prevImages,
              [fund._id]: imgdata.data,
            }));
          });
      });
    }
  }, [data]);

  if (isLoading) return <p>Loading payment details...</p>;
  if (error) return <p>Error fetching data!</p>;
  console.log(data);

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Details</h2>

      {/* Tabs Section */}
      <div className="payment-tabs">
        <button className="payment-active">Fundraiser Details</button>
        <button>Donation Details</button>
      </div>

      {/* Search Bar */}
      <div className="payment-search-bar">
        <input type="text" placeholder="Search" />
        <FaFilter className="payment-filter-icon" />
      </div>

      {/* Mapping Over Campaign Data */}
      {data?.data?.map((campaign, index) => (
        <div key={campaign.id} className="payment-card">
          {expandedIndex === index && (
            <>
              <div className="payment-title-flex">
                <h2>{campaign.title || "Fund for children education"}</h2>
                <ArrowDownwardIcon className="payment-title-icon" />
              </div>

              <p className="payment-description">
                {campaign.description || "No description available."}
              </p>

              <div className="payment-thumbnails">
                <img
                  src={
                    campaign.images.length
                      ? images[campaign._id]
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&s"
                  }
                  alt="Campaign"
                  className="thumbnail-image"
                />
              </div>
            </>
          )}

          {/* Payment Header */}
          <div className="payment-header">
            <p className="payment-amount">
              Amount Target <strong>${campaign.amount || 1000}</strong>
            </p>
            <p className="payment-fundraiser">
              Fundraiser <strong>${campaign.fundraiserAmount || 0}</strong>
            </p>
          </div>

          {/* Progress Bar */}
          <div className="payment-progress-bar">
            <div
              className="payment-progress"
              style={{
                width: `${
                  (campaign.raisedAmount / campaign.amount) * 100 || 0
                }%`,
              }}
            ></div>
            <span className="payment-percentage">
              {(campaign.raisedAmount / campaign.amount) * 100}%
            </span>
          </div>

          {/* Duration & Location */}
          <div className="payment-info">
            <div>
              <p className="info-title">Duration Date</p>
              <p className="info-ans">
                {campaign.duration[0] || "N/A"} -{" "}
                {campaign.duration[1] || "N/A"}
              </p>
            </div>
            <div className="info-location">
              <p className="info-title">Location</p>
              <p className="info-ans">{campaign.location || "Unknown"}</p>
            </div>
          </div>

          {/* Expand Button */}
          <button
            className="payment-toggle-btn"
            onClick={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          >
            {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PaymentDetails;
