import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Success from "./Success";

const BACKEND_URL = "https://dcfe-2406-7400-94-2eff-746b-4e1d-3fd8-8f.ngrok-free.app"; // Change this

const Login: React.FC = () => {
  const [authResponse, setAuthResponse] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("profileName");
    const phoneNumber = params.get("phoneNumber");

    if (token) {
      navigate(`/success?token=${token}&profileName=${name}&phoneNumber=${phoneNumber}`);
    }
  }, []);
  const handleLogin = async () => {
    setLoading(true);
  
    // Construct returnUrl dynamically based on frontend URL
    const returnUrl = `${window.location.origin}/success`;
  
    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnUrl }), // Send returnUrl to backend
      });
  
      const data = await response.json();
      if (data.whatsappUrl && data.userId) {
        setUserId(data.userId);
        window.open(data.whatsappUrl, "_blank");
        startPolling(data.userId);
      } else {
        alert("Error initiating login. Please try again.");
      }
    } catch (error) {
      console.error("Error starting authentication:", error);
      alert("Something went wrong. Please try again.");
    }
  
    setLoading(false);
  };
  

  const startPolling = (userId: string) => {
    setPolling(true);

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/status?userId=${userId}`);
        const data = await response.json();

        if (data.authenticated) {
          clearInterval(interval);
          setPolling(false);
          navigate(`/success?token=${data.token}&profileName=${data.profileName}&phoneNumber=${data.phoneNumber}`);
        }
      } catch (error) {
        console.error("Error polling authentication:", error);
      }
    }, 3000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login with WhatsApp</h2>

      {!authResponse ? (
        <>
          <button
            onClick={handleLogin}
            disabled={loading || polling}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: loading ? "#aaa" : "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: loading || polling ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating WhatsApp Link..." : "Login with WhatsApp"}
          </button>

          {polling && <p>Waiting for authentication...</p>}
        </>
      ) : (
        <div style={{ marginTop: "20px", padding: "10px", backgroundColor: "#f3f3f3", borderRadius: "5px" }}>
          <h4>{authResponse}</h4>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
};

export default App;
