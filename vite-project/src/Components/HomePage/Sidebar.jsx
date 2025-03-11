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
        setActiveComponent("Create Campaign");
        break;
      case "PaymentDetails":
        setActiveComponent("Donation History");
        break;
      case "search":
        setActiveComponent("Search");
        break;
      case "MyCampaign":
        setActiveComponent("MyCampaign");
        break;
      case "profile":
        setActiveComponent("Profile");
        break;
      case "changePassword":
        setActiveComponent("ChangePassword");
        break;
      case "Home":
        setActiveComponent("Crowd Care");
        break;
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="menu">
        <button
          className={`home-menu ${activeMenu === "Home" ? "active" : ""}`}
          onClick={() => handleMenuClick("Home")}
        >
          <HomeIcon className="icon" />
          Home
        </button>

        <button
          className={`home-menu ${
            activeMenu === "Create Campaign" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("Create Campaign")}
        >
          <AddToPhotosIcon className="icon" />
          Create Campaign
        </button>

        <button
          className={`home-menu ${
            activeMenu === "PaymentDetails" ? "active" : ""
          }`}
          onClick={() => handleMenuClick("PaymentDetails")}
        >
          <HistoryIcon className="icon" />
          Donation History
        </button>

        <button
          className={`home-menu ${activeMenu === "search" ? "active" : ""}`}
          onClick={() => handleMenuClick("search")}
        >
          <SearchSharpIcon className="icon" />
          Search
        </button>

        <button
          className={`home-menu ${activeMenu === "myCampaign" ? "active" : ""}`}
          onClick={() => handleMenuClick("MyCampaign")}
        >
          <VolunteerActivismIcon className="icon" />
          My Campaign
        </button>

        <button
          className={`home-menu ${activeMenu === "Setting" ? "active" : ""}`}
          onClick={() => handleMenuClick("Setting")}
        >
          <SettingsIcon className="icon" />
          Setting
        </button>

        {showDropdown && (
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              onClick={() => handleMenuClick("profile")}
            >
              My Profile
            </button>

            <button
              className="dropdown-item"
              onClick={() => handleMenuClick("changePassword")}
            >
              Change Password
            </button>

            <button
              className="dropdown-item"
              onClick={() => setShowLogoutModal(true)}
            >
              Logout
            </button>

            <button
              className="dropdown-item"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
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
