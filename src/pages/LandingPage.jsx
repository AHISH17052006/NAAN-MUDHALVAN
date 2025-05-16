import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";


const LandingPage = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="container">
      <img src={logo} alt="Essencecore Logo" className="logo" />
      <button className="btn" onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
