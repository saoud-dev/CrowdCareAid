import React, { useState } from "react";
import { useEffect } from "react";
import "./MyCampaign.css";
import { FaSearch } from "react-icons/fa";
import { useGetAuthUserCampaignQuery } from "../Redux/apiSlice";
import MyCampaignSelect from "./MyCampaignSelect";

const MyCampaign = () => {
  const [images, setImages] = useState({});
  const [activeTab, setActiveTab] = useState("completed");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const { data, isLoading, error } = useGetAuthUserCampaignQuery();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (data?.data) {
      data.data.forEach((fund, index) => {
        fetch(
          `https://dev.api.crowdcareaid.com/api/getImage?key=${fund.images[0]}`,
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

  if (selectedCampaign) {
    return (
      <MyCampaignSelect
        donation={selectedCampaign}
        onBack={() => setSelectedCampaign(null)}
        images={images}
      />
    );
  }

  return (
    <div className="myCampaign-container">
      {/* Search Bar */}
      <div className="myCampaign-search-bar">
        <FaSearch className="myCampaign-search-icon" />
        <input type="text" placeholder="Search" />
      </div>

      {/* Tabs */}
      <div className="myCampaign-tabs">
        <button
          className={activeTab === "completed" ? "tab active" : "tab"}
          onClick={() => setActiveTab("completed")}
        >
          Active
        </button>
        <button
          className={activeTab === "pending" ? "tab active" : "tab"}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
      </div>

      {/* Handling API Data */}
      {isLoading && <p>Loading campaigns...</p>}
      {error && <p>Error fetching campaigns.</p>}

      {/* Donation Cards */}
      {data?.data
        ?.filter((campaign) => campaign.status === activeTab) // Filter campaigns
        .map((campaign) => (
          <div
            key={campaign.id}
            className="myCampaign-donation-card"
            onClick={() => setSelectedCampaign(campaign)}
          >
            <img
              src={
                campaign.images.length
                  ? images[campaign._id]
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&s"
              }
              alt={campaign.title}
              className="myCampaign-donation-image"
            />

            <div className="myCampaign-donation-content">
              <h3>{campaign.title}</h3>
              <div className="myCampaign-progress-bar">
                <div
                  className="myCampaign-progress"
                  style={{
                    width: `${Math.round(
                      (campaign.raisedAmount / campaign.amount) * 100
                    )}%`,
                  }}
                ></div>
                <span className="myCampaign-progress-text">
                  {Math.round((campaign.raisedAmount / campaign.amount) * 100)}%
                </span>
              </div>

              <div className="myCampaign-details">
                <span>Duration Date</span>
                <span>Location</span>
              </div>
              <div className="myCampaign-details bold">
                <span>
                  {campaign.duration[0]} - {campaign.duration[1]}
                </span>
                <span>{campaign.location}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyCampaign;
