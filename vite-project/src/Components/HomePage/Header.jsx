import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./Header.css";
import Badge from "@mui/material/Badge";
import { useGetUserNotificationsQuery } from "../Redux/apiSlice";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function Header({ userData, setActiveComponent, activeComponent }) {
  const { data: notifications, isLoading } = useGetUserNotificationsQuery();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="header-container">
      <div className="header-logo">
        <span>{activeComponent}</span>
      </div>

      <div className="header-right">
        {/* User Profile */}
        <div className="profile">
          <Avatar className="profile-img" src={userData?.profileImage || ""} />
          <span className="profile-name">{userData?.firstName || "User"}</span>

          <Button
            className="profile-btn"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            disableRipple
            disableFocusRipple
            sx={{
              outline: "none",
              boxShadow: "none",
              width: "20px",
              padding: "0px !important",
              margin: "0px !important",
              marginLeft: "10px !important",
              minWidth: "unset",
              "&:focus": { outline: "none", boxShadow: "none" },
            }}
          >
            <KeyboardArrowDownIcon className="profile-arrow" />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                setActiveComponent("Profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                setActiveComponent("MyCampaign");
              }}
            >
              My campaign
            </MenuItem>
          </Menu>
        </div>

        {/* Notifications */}
        <div className="notification">
          <Badge
            badgeContent={isLoading ? "..." : notifications?.data.length || 0}
            color="primary"
          >
            <NotificationsIcon color="action" className="notification-icon" />
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default Header;
