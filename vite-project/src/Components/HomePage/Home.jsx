import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Home.css";
import Campaign from "./Campaign";
import Category from "./Category";
import Topfundraiser from "./Topfundraiser";
import FundraiserDetails from "./FundraiserDetails";
import AmountDetails from "./AmountDetails";
import Review from "./Review";
import PaymentDetails from "./PaymentDetails";
import Search from "./Search";
import MyCampaign from "./MyCampaign";
import EditProfile from "./EditProfile.jsx";
import Profile from "./Profile.jsx";
import { useUserProfileQuery } from "../Redux/apiSlice";
import ChangePassword from "./ChangePassword";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Home() {
  const { data } = useUserProfileQuery();
  const [activeComponent, setActiveComponent] = useState("Home");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    amount: "",
    duration: [],
    description: "",
    images: [],
  });

  //  Loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [activeComponent]);

  return (
    <div className="home-container">
      <Sidebar setActiveComponent={setActiveComponent} userData={data?.data} />

      <div className="main-content">
        <Header userData={data?.data} setActiveComponent={setActiveComponent} />

        <div className="content-area">
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              {activeComponent === "Home" && (
                <>
                  <Campaign setActiveComponent={setActiveComponent} />
                  <Category />
                  <Topfundraiser />
                </>
              )}
              {activeComponent === "PaymentDetails" && <PaymentDetails />}
              {activeComponent === "search" && <Search />}
              {activeComponent === "myCampaign" && <MyCampaign />}
              {activeComponent === "profile" && (
                <Profile
                  setActiveComponent={setActiveComponent}
                  userData={data?.data}
                />
              )}
              {activeComponent === "editProfile" && (
                <EditProfile
                  setActiveComponent={setActiveComponent}
                  userData={data?.data}
                />
              )}
              {activeComponent === "FundraiserDetails" && (
                <FundraiserDetails
                  setActiveComponent={setActiveComponent}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {activeComponent === "AmountDetails" && (
                <AmountDetails
                  setActiveComponent={setActiveComponent}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {activeComponent === "Review" && (
                <Review
                  formData={formData}
                  setFormData={setFormData}
                  setActiveComponent={setActiveComponent}
                />
              )}
              {activeComponent === "changePassword" && <ChangePassword />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
