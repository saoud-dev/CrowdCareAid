import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Forget from "./Components/Forget/Forget";
import Otp from "./Components/OTP/Otp";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import Home from "./Components/HomePage/Home";
import ForgetOtp from "./Components/OTP/ForgetOtp";
import FundraiserDetails from "./Components/HomePage/FundraiserDetails";
import MyCampaign from "./Components/HomePage/MyCampaign";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />

          {/* Other Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgetOtp" element={<ForgetOtp />} />

          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />

          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/fundraiserDetails" element={<FundraiserDetails />} />
          <Route path="/mycampaign" element={<MyCampaign />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
