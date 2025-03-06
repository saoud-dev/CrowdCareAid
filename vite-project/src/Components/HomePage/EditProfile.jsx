import React, { useState, useEffect } from "react";
import "./EditProfile.css";
import { useEditProfileMutation } from "../Redux/apiSlice";
import EditIcon from "@mui/icons-material/Edit";

function EditProfile({ setActiveComponent, userData }) {
  const [editProfile] = useEditProfileMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    aboutMe: "",
    address: "",
    gender: "Male",
    profileImage: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName,
        lastName: userData.lastName,
        dob: userData.dob,
        phone: userData.phone,
        aboutMe: userData.aboutMe,
        address: userData.address,
        gender: userData.gender,
        profileImage: userData.profileImage || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await editProfile({
        data: formData,
      }).unwrap();
      console.log(res);
      alert("Profile updated successfully!");
      setActiveComponent("profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={formData.profileImage}
          alt="Profile"
          className="profile-image"
        />
        <label className="edit-icon">
          <EditIcon style={{ color: "white", fontSize: "18px" }} />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <div className="profile-info">
          <h2>{formData.firstName || "Jane Cooper"}</h2>
          <p>{userData.email || "example@example.com"}</p>
        </div>
      </div>

      <div className="profile-details">
        <div className="detail-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
          />
        </div>
        <div className="detail-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="detail-group">
          <label>Date of Birth</label>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Date of Birth"
          />
        </div>
        <div className="detail-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
        </div>
        <div className="detail-group full-width">
          <label>About Me</label>
          <textarea
            name="aboutMe" // Change from "about" to "aboutMe"
            value={formData.aboutMe}
            onChange={handleChange}
            placeholder="Tell something about yourself"
          />
        </div>
        <div className="detail-group">
          <label>Location</label>
          <input
            type="text"
            name="address" // Change from "location" to "address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        </div>
        <div className="detail-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="profile-btn">
        <button onClick={() => setActiveComponent("profile")}>Back</button>
        <button onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
}

export default EditProfile;
