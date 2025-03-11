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

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("loggedin") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function AuthRoute({ children }) {
  const isLoggedIn = localStorage.getItem("loggedin") === "true";
  return isLoggedIn ? <Navigate to="/home" /> : children;
}

function App() {
  return (
    <div className="app-container">
      <Router>
        <Routes>
          {/* Prevent logged-in users from accessing login/signup */}
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="/forget"
            element={
              <AuthRoute>
                <Forget />
              </AuthRoute>
            }
          />
          <Route
            path="/otp"
            element={
              <AuthRoute>
                <Otp />
              </AuthRoute>
            }
          />
          <Route
            path="/forgetOtp"
            element={
              <AuthRoute>
                <ForgetOtp />
              </AuthRoute>
            }
          />
          <Route
            path="/changepassword"
            element={
              <AuthRoute>
                <ChangePassword />
              </AuthRoute>
            }
          />

          {/* Protected Route for Home */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
