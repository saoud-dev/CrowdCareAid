import React, { useState } from "react";
import logo from "../../assets/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import HistoryIcon from "@mui/icons-material/History";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import SettingsIcon from "@mui/icons-material/Settings";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import Logout from "./Logout.jsx";
import "./Sidebar.css";
import DeleteAcount from "./DeleteAcount.jsx";

function Sidebar({ setActiveComponent, userData }) {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);

    if (menu === "Setting") {
      setShowDropdown(!showDropdown);
    }

    switch (menu) {
      case "Create Campaign":
        setActiveComponent("FundraiserDetails");
        break;
      case "PaymentDetails":
        setActiveComponent("PaymentDetails");
        break;
      case "search":
        setActiveComponent("search");
        break;
      case "myCampaign":
        setActiveComponent("myCampaign");
        break;
      case "profile":
        setActiveComponent("profile");
        break;
      case "changePassword":
        setActiveComponent("changePassword");
        break;
      case "Home":
        setActiveComponent("Home");
        break;
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="menu">
        <div
          className={`home-menu ${activeMenu === "Home" ? "active" : ""}`}
          onClick={() => handleMenuClick("Home")}
        >
          <HomeIcon className="icon" />
          <span>Home</span>
        </div>

        <div
          className={`home-menu ${
            activeMenu === "Create Campaign" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Create Campaign")}
        >
          <AddToPhotosIcon className="icon" />
          <span>Create Campaign</span>
        </div>

        <div
          className={`home-menu ${
            activeMenu === "PaymentDetails" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("PaymentDetails")}
        >
          <HistoryIcon className="icon" />
          <span>Donation History</span>
        </div>

        <div
          className={`home-menu ${activeMenu === "search" ? "active" : ""}`}
          onClick={() => handleMenuClick("search")}
        >
          <SearchSharpIcon className="icon" />
          <span>Search</span>
        </div>

        <div
          className={`home-menu ${activeMenu === "myCampaign" ? "active" : ""}`}
          onClick={() => handleMenuClick("myCampaign")}
        >
          <VolunteerActivismIcon className="icon" />
          <span>My Campaign</span>
        </div>

        <div
          className={`home-menu ${activeMenu === "Setting" ? "active" : ""}`}
          onClick={() => handleMenuClick("Setting")}
        >
          <SettingsIcon className="icon" />
          <span>Setting</span>
        </div>

        {showDropdown && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleMenuClick("profile")}
            >
              My Profile
            </div>

            <div
              className="dropdown-item"
              onClick={() => handleMenuClick("changePassword")}
            >
              Change Password
            </div>

            <div
              className="dropdown-item"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </div>

            <div
              className="dropdown-item"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Acount
            </div>
          </div>
        )}
      </div>

      {showLogoutModal && (
        <Logout onClose={() => setShowLogoutModal(false)} userData={userData} />
      )}
      {showDeleteModal && (
        <DeleteAcount
          onClose={() => setShowDeleteModal(false)}
          userData={userData}
        />
      )}
    </div>
  );
}

export default Sidebar;
