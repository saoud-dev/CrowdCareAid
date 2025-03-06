import React, { useEffect, useState } from "react";
import "./Topfundraiser.css";
import { useGetallCampaignsQuery } from "../Redux/apiSlice";
import SearchCampaignItem from "./SearchCampaignItem"; // Import the component

function Topfundraiser() {
  const [images, setImages] = useState({});
  const { data, error, isLoading } = useGetallCampaignsQuery();
  const [selectedCampaign, setSelectedCampaign] = useState(null);

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching campaigns!</p>;

  if (selectedCampaign) {
    return (
      <SearchCampaignItem
        campaign={selectedCampaign}
        goBack={() => setSelectedCampaign(null)}
        images={images}
      />
    );
  }

  return (
    <div className="fund-container">
      <div className="fund-name">
        <h3>Top Fundraiser</h3>
      </div>

      <div className="card-container">
        {data?.data?.map((fund, index) => (
          <div key={index} className="card">
            <img
              src={
                fund.images.length
                  ? images[fund._id]
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&s"
              }
              alt=""
            />
            ;
            <div className="card-body">
              <h5 className="card-title">{fund.title}</h5>

              <span className="card-progress-percentage">
                {((fund.raisedAmount / fund.amount) * 100).toFixed(0)}%
              </span>

              <div className="card-progress-bar-container">
                <div
                  className="card-progress-bar"
                  style={{
                    width: `${(fund.raisedAmount / fund.amount) * 100}%`,
                  }}
                ></div>
              </div>

              <div className="card-flex">
                <span>
                  Raised: <strong>${fund.raisedAmount}</strong>
                </span>
                <span>
                  Target: <strong>${fund.amount}</strong>
                </span>
              </div>

              <div className="card-details">
                <span className="category">{fund.category?.name}</span>
                <span className="location">{fund.location}</span>
              </div>

              {/* View Button - Click pe campaign set ho */}
              <button
                className="btn"
                onClick={() => {
                  setSelectedCampaign(fund);
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topfundraiser;
