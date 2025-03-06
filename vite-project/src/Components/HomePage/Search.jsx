import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./Search.css";
import { useGetallCampaignsQuery } from "../Redux/apiSlice";
import searchErr from "../../assets/searchErr.png";
import SearchCampaignItem from "./SearchCampaignItem"; // Import the component
import { useEffect } from "react";

const Search = () => {
  const [images, setImages] = useState({});

  const { data, error, isLoading } = useGetallCampaignsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null); // New state for selected campaign

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const filteredDonations = data?.data?.filter((donation) =>
    donation?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <SearchCampaignItem
        campaign={selectedCampaign}
        goBack={() => setSelectedCampaign(null)}
        images={images}
      />
    );
  }

  return (
    <div className="search-container">
      {/* Search Bar */}
      <div className="search-search-bar">
        <FaSearch className="search-search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Show Error Image if Search is Empty */}
      {searchTerm.trim() === "" ? (
        <div className="search-error">
          <img src={searchErr} alt="No search results" />
        </div>
      ) : (
        <div className="search-donation-list">
          {filteredDonations?.length > 0 ? (
            filteredDonations.map((donation) => (
              <div
                key={donation._id}
                className="search-donation-card"
                onClick={() => setSelectedCampaign(donation)}
              >
                <img
                  src={
                    donation.images.length
                      ? images[donation._id]
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE3CETL_OertJKScoHfblxs6CBrKGVCmVESw&s"
                  }
                  alt="Donation"
                  className="search-donation-image"
                />
                <div className="search-donation-content">
                  <h3 className="search-donation-title">{donation.title}</h3>

                  {/* Progress Bar */}
                  <div className="search-progress-bar">
                    <div
                      className="search-progress"
                      style={{
                        width: `${Math.round(
                          (donation.raisedAmount / donation.amount) * 100
                        )}%`,
                      }}
                    >
                      {donation.amount > 0
                        ? `${Math.round(
                            (donation.raisedAmount / donation.amount) * 100
                          )}%`
                        : "0%"}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="search-donation-details">
                    <div>
                      <p>Duration Date</p>
                      <p className="search-bold">
                        {donation.duration?.length === 2 &&
                        donation.duration[0] &&
                        donation.duration[1]
                          ? `${new Date(
                              donation.duration[0]
                            ).toLocaleDateString("en-CA")} - 
   ${new Date(donation.duration[1]).toLocaleDateString("en-CA")}`
                          : "N/A"}
                      </p>
                    </div>
                    <div className="search-right-align">
                      <p>{donation.location || "Unknown"}</p>
                      <p className="search-bold">
                        {donation.city || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
