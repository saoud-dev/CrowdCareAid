import React from "react";
import "./EditProfile.css";

function Profile({ setActiveComponent, userData }) {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userData.profileImage}
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h2>{userData.firstName || "Jane Cooper"}</h2>
          <p>{userData.email || "example@example.com"}</p>
        </div>
        <button
          className="edit-button"
          onClick={() => setActiveComponent("editProfile")}
        >
          Edit ✎
        </button>
      </div>

      <div className="profile-details">
        <div className="detail-group">
          <label>First Name</label>
          <input type="text" value={userData.firstName} disabled />
        </div>
        <div className="detail-group">
          <label>Last Name</label>
          <input type="text" value={userData.lastName} disabled />
        </div>
        <div className="detail-group">
          <label>Date of Birth</label>
          <input type="text" value={userData.dob} disabled />
        </div>
        <div className="detail-group">
          <label>Phone</label>
          <input type="text" value={userData.phone} disabled />
        </div>
        <div className="detail-group full-width">
          <label>About Me</label>
          <textarea value={userData.aboutMe} disabled></textarea>
        </div>
        <div className="detail-group">
          <label>Location</label>
          <input type="text" value={userData.address} disabled />
        </div>
        <div className="detail-group">
          <label>Gender</label>
          <input type="text" value={userData.gender} disabled />
        </div>
      </div>
    </div>
  );
}

export default Profile;
