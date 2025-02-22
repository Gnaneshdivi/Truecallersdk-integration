import React from "react";
import { useNavigate } from "react-router-dom";

const Success: React.FC = () => {
  const navigate = useNavigate();

  // Extract token and user details from URL
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const profileName = params.get("profileName") || "User";
  const phoneNumber = params.get("phoneNumber");

  const handleLogout = () => {
    // Clear authentication by redirecting to the login page
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome to Rewardsy!</h2>

      <p style={{ fontSize: "18px" }}>
        Hello <strong>{profileName}</strong>! 🎉
      </p>

      {phoneNumber && <p>Your registered phone number: {phoneNumber}</p>}

      <p>Your authentication was successful.</p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#ff4d4d",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Success;
